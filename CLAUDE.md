# PacePack — Claude Code Context

## What This App Is
PacePack is a social running iOS app. Users form "packs" (groups), set collective mileage goals, and every run synced from Apple Health counts toward the group total. Core features: live leaderboard, push notifications, a Spotify Wrapped-style goal recap, and a badge system.

Full product spec is in the original conversation. Build in phases, review between each.

## Repository
- GitHub: `fmolinart/pacepack`
- Active branch: `claude/build-pacepack-app-Fv9ho`
- Always develop and push to this branch

## Git Push Setup
The git remote requires a token each session (it expires). Set it with:
```bash
git remote set-url origin https://fmolinart:YOUR_GITHUB_PAT@github.com/fmolinart/pacepack.git
```
Then push normally: `git push`

## Tech Stack
- **Framework**: Expo SDK 55 (React Native 0.81.5, React 19.1.0)
- **Language**: TypeScript (strict)
- **Navigation**: `@react-navigation/native` + `@react-navigation/native-stack` + `@react-navigation/bottom-tabs`
  - Use `createNativeStackNavigator` NOT `createStackNavigator` — the stack package pulls in reanimated which breaks Expo Go
- **Backend**: Supabase (auth, Postgres, realtime) — client at `src/lib/supabase.ts`
- **Database schema**: `supabase/schema.sql` — run in Supabase SQL editor to init
- **Animations**: React Native's built-in `Animated` API only for now — do NOT add `react-native-reanimated/plugin` to babel.config.js until Phase 7 (it breaks Expo Go)
- **Entry point**: `index.ts` → `App.tsx` (classic, NOT Expo Router)

## Running Locally (User's Mac)
```bash
cd pacepack
npx expo start --clear
```
Scan QR with Expo Go (SDK 55) on iPhone. Both Mac and phone must be on same Wi-Fi.

If packages get out of sync: `npx expo install --fix` then `npx expo start --clear`

## Design System (`src/theme/`)

### Colors (`colors.ts`)
```
background:      #0A0A0A   (near-black)
surface:         #141414
surfaceElevated: #1E1E1E
border:          #2A2A2A
lime:            #C8FF00   (PRIMARY ACCENT — neon lime green)
limeSubtle:      rgba(200,255,0,0.12)
textPrimary:     #FFFFFF
textSecondary:   #A0A0A0
textMuted:       #555555
success:         #22C55E
warning:         #F59E0B
error:           #EF4444
```

### Typography (`typography.ts`)
- Headings: Barlow Condensed (Bold, Black, Medium) — uppercase, condensed
- Body: Inter (Regular, SemiBold, Bold)
- Scale: `displayXL`, `displayL`, `displayM`, `h1`, `h2`, `h3`, `label`, `bodyLarge`, `body`, `bodySmall`, `caption`, `stat`
- Import via: `import { TextStyles } from '../../theme'`

### Spacing (`spacing.ts`)
`xs:4, sm:8, md:12, base:16, lg:20, xl:24, xxl:32, xxxl:40, section:48`

### Radius (`spacing.ts`)
`sm:6, md:10, lg:16, xl:24, full:9999`

## Shared UI Components (`src/components/ui/`)
All exported from `index.ts`:

- **Button** — variants: `primary`(lime bg), `secondary`, `ghost`, `danger` | sizes: `sm`, `md`, `lg` | props: `loading`, `disabled`
- **Card** — variants: default, `elevated`, `accent`(lime border)
- **Avatar** — shows image URI or deterministic-color initials fallback | prop: `size`
- **ProgressBar** — animated spring fill, lime→green at 100% | props: `current`, `target`, `showLabel`, `height`
- **BadgeChip** — status pill | variants: `lime`, `success`, `warning`, `error`, `neutral`
- **Divider** — horizontal or vertical rule

## Navigation Structure

### Tab Navigator (`src/navigation/TabNavigator.tsx`)
5 tabs: Home, Goals, Friends, Badges, Profile
- Lime active state, near-black tab bar
- Tab icons are emoji (will be replaced with proper icons in a later phase)

### Root Navigator (`src/navigation/RootNavigator.tsx`)
`createNativeStackNavigator` with screens:
- `Tabs` → TabNavigator
- `KitchenSink` → dev component showcase (accessible from Profile → Dev Tools)

`RootStackParamList` is exported for typed navigation.

## Current Screens

### Home (`src/screens/home/HomeScreen.tsx`)
**Static mockup** — hardcoded data. Shows:
- Greeting header with user avatar
- Summary strip (active goals / total miles / pack members)
- Two goal cards with progress bars, avatar stacks, activity snippets

### Goals (`src/screens/goals/GoalsScreen.tsx`)
Segmented control: Active / Upcoming / Past. Active tab renders `ActiveGoalScreen`.

### ActiveGoalScreen (`src/screens/goals/ActiveGoalScreen.tsx`)
**Static mockup** — hardcoded data. Shows:
- Goal header with BadgeChip status and date range
- Progress card: animated miles counter (Animated.Value), progress bar, pct complete
- Leaderboard: ranked rows with staggered animated bars, current user highlighted in limeSubtle
- Recent activity feed

### Friends (`src/screens/friends/FriendsScreen.tsx`)
Placeholder empty state.

### Badges (`src/screens/badges/BadgesScreen.tsx`)
Placeholder empty state.

### Profile (`src/screens/profile/ProfileScreen.tsx`)
Static mockup — avatar, stats row, settings list, Dev Tools link to KitchenSink.

### KitchenSink (`src/screens/dev/KitchenSinkScreen.tsx`)
Full design system showcase — typography, colors, buttons, cards, avatars, progress bars, badge chips.

## Database (`supabase/schema.sql`)
Tables: `users`, `goals`, `goal_members`, `runs`, `run_goal_contributions`, `friendships`, `badges`
- All tables have RLS enabled with policies
- TypeScript types at `src/types/database.ts`
- Supabase client at `src/lib/supabase.ts` — reads from `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` env vars
- Realtime enabled on `goal_members`, `runs`, `run_goal_contributions`

## Build Phases
- [x] **Phase 1** — Foundation: Expo setup, design system, navigation shell, Supabase schema
- [x] **Phase 1b** — Static mockups: Home feed, Active Goal leaderboard, Kitchen Sink
- [ ] **Phase 2** — Onboarding: Welcome → Sign Up → Profile Photo → HealthKit → Notifications → Contacts → Home
- [ ] **Phase 3** — Goals: Create goal form, goal list/feed, active goal screen with real data
- [ ] **Phase 4** — HealthKit sync: background sync, run deduplication, goal contribution logic
- [ ] **Phase 5** — Social: Friends tab, contacts picker, SMS invite, deep links
- [ ] **Phase 6** — Notifications: Expo Push setup, all trigger types
- [ ] **Phase 7** — Goal completion: celebration animation + Wrapped-style recap story cards
- [ ] **Phase 8** — Badges: award logic, badge grid screen
- [ ] **Phase 9** — Profile: run history, goal history, Strava connect, settings

## Phase 2 Spec (Next Up)
Onboarding flow — screens in order:
1. **Welcome** — App name "PACEPACK", tagline, "Get Started" CTA
2. **Sign Up** — First name, last name, email, password fields → Supabase `signUp`
3. **Profile Photo** — Optional avatar upload (skip available) → Supabase Storage
4. **HealthKit Connect** — Full-screen prompt, "Connect Apple Health" CTA. Copy: "PacePack reads your runs from Apple Health. Every mile you log — from Apple Watch, Nike Run Club, Garmin, or any app — counts automatically." Required to continue.
5. **Push Notifications** — Request permission via Expo Notifications
6. **Contacts** — "Find your friends on PacePack" prompt, request contacts permission
7. **Home** — Land on main tab navigator after onboarding complete

Auth state gates: if Supabase session exists → skip onboarding → go to tabs. Store onboarding completion in AsyncStorage.

Packages needed for Phase 2:
- `expo-image-picker` — profile photo
- `expo-notifications` — push permission  
- `expo-contacts` — contacts permission
- `react-native-health` or `expo-health` — HealthKit (iOS only)

## Key Decisions & Gotchas
- Do NOT use `@react-navigation/stack` — it imports reanimated and breaks Expo Go
- Do NOT add `react-native-reanimated/plugin` to babel.config.js until Phase 7
- `newArchEnabled: false` in app.json — required for Expo Go compatibility
- `GestureHandlerRootView` wrapper removed from App.tsx — add back in Phase 7 when gestures are needed
- All screens use `SafeAreaView` from `react-native-safe-area-context` with `edges={['top']}`
- Tab bar height: iOS 84px (with 24px bottom padding), Android 64px
- Font families defined in `src/theme/typography.ts` — currently falling back to system fonts; add actual font files + expo-font loading in Phase 2 onboarding screen
