# Connect to Supabase (5 minutes, free forever)

## Step 1 — Create a Supabase project
1. Go to https://supabase.com → Sign in with GitHub
2. Click "New project", give it a name, choose a region near India

## Step 2 — Create the projects table
Go to **SQL Editor** and run this:

```sql
create table projects (
  id          text primary key,
  title       text,
  subtitle    text,
  description text,
  tech        text[],
  category    text,
  image       text,
  link        text,
  featured    boolean default false,
  color       text,
  accent      text,
  sort_order  integer default 0,
  created_at  timestamptz default now()
);
alter table projects enable row level security;
create policy "Public read"  on projects for select using (true);
create policy "Anyone write" on projects for all    using (true);
```

## Step 3 — Get your credentials
Go to **Settings → API** and copy:
- Project URL  (looks like: https://abcxyz.supabase.co)
- anon public key (long string starting with eyJ...)

## Step 4 — Create .env file
In your project root (`E:\projects\webgrowth-v2\`), create a file named `.env`:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

## Step 5 — Restart dev server
```
Ctrl+C
npm run dev
```

That's it! Projects you add in admin now appear everywhere instantly.
