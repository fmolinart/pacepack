-- PacePack Database Schema
-- Run this in your Supabase SQL editor to initialize the database

-- ─────────────────────────────────────────
-- Extensions
-- ─────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─────────────────────────────────────────
-- Users
-- ─────────────────────────────────────────
create table if not exists public.users (
  id                        uuid primary key references auth.users(id) on delete cascade,
  name                      text not null,
  email                     text not null unique,
  avatar_url                text,
  healthkit_last_synced_at  timestamptz,
  strava_access_token       text,
  strava_refresh_token      text,
  strava_athlete_id         text,
  expo_push_token           text,
  created_at                timestamptz not null default now()
);

alter table public.users enable row level security;

create policy "Users can view their own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.users for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.users for insert
  with check (auth.uid() = id);

-- Friends can view each other's profiles
create policy "Friends can view each other"
  on public.users for select
  using (
    exists (
      select 1 from public.friendships
      where status = 'accepted'
        and (
          (user_id_1 = auth.uid() and user_id_2 = id)
          or (user_id_2 = auth.uid() and user_id_1 = id)
        )
    )
  );

-- ─────────────────────────────────────────
-- Goals
-- ─────────────────────────────────────────
create type goal_status as enum ('upcoming', 'active', 'completed', 'failed');

create table if not exists public.goals (
  id            uuid primary key default uuid_generate_v4(),
  title         text not null,
  target_miles  numeric(8, 2) not null check (target_miles > 0),
  start_date    date not null,
  end_date      date not null check (end_date >= start_date),
  created_by    uuid not null references public.users(id) on delete cascade,
  status        goal_status not null default 'upcoming',
  created_at    timestamptz not null default now()
);

alter table public.goals enable row level security;

create policy "Goal members can view goals"
  on public.goals for select
  using (
    exists (
      select 1 from public.goal_members
      where goal_id = id and user_id = auth.uid()
    )
  );

create policy "Authenticated users can create goals"
  on public.goals for insert
  with check (auth.uid() = created_by);

create policy "Goal creator can update goal"
  on public.goals for update
  using (auth.uid() = created_by);

-- ─────────────────────────────────────────
-- Goal Members
-- ─────────────────────────────────────────
create table if not exists public.goal_members (
  id                uuid primary key default uuid_generate_v4(),
  goal_id           uuid not null references public.goals(id) on delete cascade,
  user_id           uuid not null references public.users(id) on delete cascade,
  miles_contributed numeric(8, 2) not null default 0,
  joined_at         timestamptz not null default now(),
  unique (goal_id, user_id)
);

alter table public.goal_members enable row level security;

create policy "Goal members can view membership"
  on public.goal_members for select
  using (
    user_id = auth.uid()
    or exists (
      select 1 from public.goal_members gm2
      where gm2.goal_id = goal_id and gm2.user_id = auth.uid()
    )
  );

create policy "Users can join goals"
  on public.goal_members for insert
  with check (auth.uid() = user_id);

create policy "System can update miles"
  on public.goal_members for update
  using (auth.uid() = user_id);

-- ─────────────────────────────────────────
-- Runs
-- ─────────────────────────────────────────
create table if not exists public.runs (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid not null references public.users(id) on delete cascade,
  healthkit_uuid   text not null,
  source_name      text not null default 'Apple Watch',
  distance_miles   numeric(8, 3) not null check (distance_miles > 0),
  duration_seconds integer not null check (duration_seconds > 0),
  run_date         timestamptz not null,
  created_at       timestamptz not null default now(),
  unique (user_id, healthkit_uuid)
);

alter table public.runs enable row level security;

create policy "Users can view their own runs"
  on public.runs for select
  using (auth.uid() = user_id);

create policy "Users can insert their own runs"
  on public.runs for insert
  with check (auth.uid() = user_id);

-- ─────────────────────────────────────────
-- Run Goal Contributions
-- ─────────────────────────────────────────
create table if not exists public.run_goal_contributions (
  id                uuid primary key default uuid_generate_v4(),
  run_id            uuid not null references public.runs(id) on delete cascade,
  goal_id           uuid not null references public.goals(id) on delete cascade,
  miles_contributed numeric(8, 3) not null check (miles_contributed > 0),
  unique (run_id, goal_id)
);

alter table public.run_goal_contributions enable row level security;

create policy "Goal members can view contributions"
  on public.run_goal_contributions for select
  using (
    exists (
      select 1 from public.goal_members
      where goal_id = run_goal_contributions.goal_id and user_id = auth.uid()
    )
  );

create policy "Users can insert their run contributions"
  on public.run_goal_contributions for insert
  with check (
    exists (
      select 1 from public.runs where id = run_id and user_id = auth.uid()
    )
  );

-- ─────────────────────────────────────────
-- Friendships
-- ─────────────────────────────────────────
create type friendship_status as enum ('pending', 'accepted');

create table if not exists public.friendships (
  id          uuid primary key default uuid_generate_v4(),
  user_id_1   uuid not null references public.users(id) on delete cascade,
  user_id_2   uuid not null references public.users(id) on delete cascade,
  status      friendship_status not null default 'pending',
  created_at  timestamptz not null default now(),
  check (user_id_1 <> user_id_2),
  unique (user_id_1, user_id_2)
);

alter table public.friendships enable row level security;

create policy "Users can view their own friendships"
  on public.friendships for select
  using (auth.uid() = user_id_1 or auth.uid() = user_id_2);

create policy "Users can create friend requests"
  on public.friendships for insert
  with check (auth.uid() = user_id_1);

create policy "Recipients can accept friend requests"
  on public.friendships for update
  using (auth.uid() = user_id_2);

-- ─────────────────────────────────────────
-- Badges
-- ─────────────────────────────────────────
create type badge_type as enum (
  'first_goal_completed',
  'goals_3',
  'goals_5',
  'goals_10',
  'goal_named',
  'miles_10',
  'miles_25',
  'miles_50',
  'miles_100',
  'miles_250',
  'miles_500',
  'first_run_synced',
  'first_goal_created',
  'pack_leader',
  'recruiter'
);

create table if not exists public.badges (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references public.users(id) on delete cascade,
  badge_type  badge_type not null,
  earned_at   timestamptz not null default now(),
  goal_id     uuid references public.goals(id) on delete set null,
  unique (user_id, badge_type, goal_id)
);

alter table public.badges enable row level security;

create policy "Users can view their own badges"
  on public.badges for select
  using (auth.uid() = user_id);

-- Goal members can see each other's badges for recap
create policy "Goal members can view pack badges"
  on public.badges for select
  using (
    goal_id is not null
    and exists (
      select 1 from public.goal_members
      where goal_id = badges.goal_id and user_id = auth.uid()
    )
  );

-- ─────────────────────────────────────────
-- Indexes for common queries
-- ─────────────────────────────────────────
create index if not exists idx_goal_members_goal_id on public.goal_members(goal_id);
create index if not exists idx_goal_members_user_id on public.goal_members(user_id);
create index if not exists idx_runs_user_id on public.runs(user_id);
create index if not exists idx_runs_run_date on public.runs(run_date);
create index if not exists idx_run_goal_contributions_goal_id on public.run_goal_contributions(goal_id);
create index if not exists idx_run_goal_contributions_run_id on public.run_goal_contributions(run_id);
create index if not exists idx_friendships_user_id_1 on public.friendships(user_id_1);
create index if not exists idx_friendships_user_id_2 on public.friendships(user_id_2);
create index if not exists idx_badges_user_id on public.badges(user_id);
create index if not exists idx_goals_status on public.goals(status);
create index if not exists idx_goals_end_date on public.goals(end_date);

-- ─────────────────────────────────────────
-- Function: update goal status automatically
-- ─────────────────────────────────────────
create or replace function public.update_goal_statuses()
returns void
language plpgsql
security definer
as $$
begin
  -- upcoming → active
  update public.goals
  set status = 'active'
  where status = 'upcoming'
    and start_date <= current_date;

  -- active → failed (past end date, not completed)
  update public.goals
  set status = 'failed'
  where status = 'active'
    and end_date < current_date;
end;
$$;

-- ─────────────────────────────────────────
-- Function: sync run contributions and check goal completion
-- ─────────────────────────────────────────
create or replace function public.recalculate_goal_member_miles(p_goal_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  update public.goal_members gm
  set miles_contributed = (
    select coalesce(sum(rgc.miles_contributed), 0)
    from public.run_goal_contributions rgc
    join public.runs r on r.id = rgc.run_id
    where rgc.goal_id = p_goal_id
      and r.user_id = gm.user_id
  )
  where gm.goal_id = p_goal_id;
end;
$$;

-- ─────────────────────────────────────────
-- Realtime: enable for live leaderboard
-- ─────────────────────────────────────────
alter publication supabase_realtime add table public.goal_members;
alter publication supabase_realtime add table public.runs;
alter publication supabase_realtime add table public.run_goal_contributions;
