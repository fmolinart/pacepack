export type GoalStatus = 'upcoming' | 'active' | 'completed' | 'failed';
export type FriendshipStatus = 'pending' | 'accepted';
export type BadgeType =
  | 'first_goal_completed'
  | 'goals_3'
  | 'goals_5'
  | 'goals_10'
  | 'goal_named'
  | 'miles_10'
  | 'miles_25'
  | 'miles_50'
  | 'miles_100'
  | 'miles_250'
  | 'miles_500'
  | 'first_run_synced'
  | 'first_goal_created'
  | 'pack_leader'
  | 'recruiter';

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          avatar_url: string | null;
          healthkit_last_synced_at: string | null;
          strava_access_token: string | null;
          strava_refresh_token: string | null;
          strava_athlete_id: string | null;
          expo_push_token: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'created_at'> & {
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['users']['Row']>;
      };

      goals: {
        Row: {
          id: string;
          title: string;
          target_miles: number;
          start_date: string;
          end_date: string;
          created_by: string;
          status: GoalStatus;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['goals']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['goals']['Row']>;
      };

      goal_members: {
        Row: {
          id: string;
          goal_id: string;
          user_id: string;
          miles_contributed: number;
          joined_at: string;
        };
        Insert: Omit<Database['public']['Tables']['goal_members']['Row'], 'id' | 'joined_at'> & {
          id?: string;
          joined_at?: string;
          miles_contributed?: number;
        };
        Update: Partial<Database['public']['Tables']['goal_members']['Row']>;
      };

      runs: {
        Row: {
          id: string;
          user_id: string;
          healthkit_uuid: string;
          source_name: string;
          distance_miles: number;
          duration_seconds: number;
          run_date: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['runs']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['runs']['Row']>;
      };

      run_goal_contributions: {
        Row: {
          id: string;
          run_id: string;
          goal_id: string;
          miles_contributed: number;
        };
        Insert: Omit<Database['public']['Tables']['run_goal_contributions']['Row'], 'id'> & {
          id?: string;
        };
        Update: Partial<Database['public']['Tables']['run_goal_contributions']['Row']>;
      };

      friendships: {
        Row: {
          id: string;
          user_id_1: string;
          user_id_2: string;
          status: FriendshipStatus;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['friendships']['Row'], 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['friendships']['Row']>;
      };

      badges: {
        Row: {
          id: string;
          user_id: string;
          badge_type: BadgeType;
          earned_at: string;
          goal_id: string | null;
        };
        Insert: Omit<Database['public']['Tables']['badges']['Row'], 'id' | 'earned_at'> & {
          id?: string;
          earned_at?: string;
        };
        Update: Partial<Database['public']['Tables']['badges']['Row']>;
      };
    };
  };
}
