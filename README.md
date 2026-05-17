# VYRALINK AI

VYRALINK AI is a futuristic one-page SaaS application for intelligent traffic routing, YouTube transcript extraction, referral flows, and creator analytics.

## Stack

- React + Vite
- TailwindCSS
- Framer Motion
- Supabase Auth + Database
- Apify YouTube Transcript Scraper
- React Router
- Lucide React Icons
- Shadcn-style local UI primitives
- Zustand
- Vercel serverless API route

## Local Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Add these values to `.env`:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
VITE_APIFY_TOKEN=your-local-apify-token
```

For production, prefer `APIFY_TOKEN` in Vercel instead of `VITE_APIFY_TOKEN`. Any `VITE_` variable is included in the browser bundle by Vite, so the serverless `/api/transcript` function is the secure production path for the Apify token.

During local development, `vite.config.js` provides a small `/api/transcript` middleware so the same UI works without deploying first. Restart `npm run dev` after changing `.env` values.

## Supabase Tables

Run this SQL in the Supabase SQL editor:

```sql
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz default now()
);

create table if not exists public.transcripts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  youtube_url text not null,
  transcript text not null,
  created_at timestamptz default now()
);

create table if not exists public.links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  original_url text not null,
  smart_url text not null,
  clicks integer default 0,
  created_at timestamptz default now()
);

alter table public.users enable row level security;
alter table public.transcripts enable row level security;
alter table public.links enable row level security;

create policy "Users can read own profile"
on public.users for select
using (auth.uid() = id);

create policy "Users can insert own profile"
on public.users for insert
with check (auth.uid() = id);

create policy "Users can read own transcripts"
on public.transcripts for select
using (auth.uid() = user_id);

create policy "Users can create own transcripts"
on public.transcripts for insert
with check (auth.uid() = user_id);

create policy "Users can read own links"
on public.links for select
using (auth.uid() = user_id);

create policy "Users can create own links"
on public.links for insert
with check (auth.uid() = user_id);

create policy "Users can update own links"
on public.links for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
```

Optional profile sync trigger:

```sql
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();
```

## Apify Setup

The app calls `/api/transcript`, which starts the Apify actor and polls for the result. Set:

```bash
APIFY_TOKEN=your-production-apify-token
APIFY_YOUTUBE_TRANSCRIPT_ACTOR=owner~actor-name
```

If your actor expects a different input shape, update `api/transcript.js` and `src/services/apifyService.js`.

## Vercel Deployment

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Set Framework Preset to `Vite`.
4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `APIFY_TOKEN`
   - `APIFY_YOUTUBE_TRANSCRIPT_ACTOR`
5. Keep Build Command as `npm run build`.
6. Keep Output Directory as `dist`.
7. Deploy.
8. Add a production domain in Vercel Project Settings.

`vercel.json` includes SPA rewrites, static asset caching, and security headers.

## Performance Notes

- Page components are lazy loaded with `React.lazy` and `Suspense`.
- Vite manual chunks split React, Framer Motion, Supabase, and chart code.
- CSS is code-split for production.
- Heavy visuals use CSS gradients and motion transforms instead of large image payloads.
- The app is mobile-first and avoids layout-shifting fixed-size controls.

## Security Notes

- Supabase anon keys are safe for client use when RLS is enabled.
- Keep Apify production tokens in `APIFY_TOKEN` on Vercel.
- Use Supabase RLS policies before storing user data.
- Do not place service-role Supabase keys in the frontend.
