/* ============================================================
   WebGrowth.in — Project data
   Source of truth: Supabase (syncs across all devices)
   Falls back to seed data until Supabase is configured.
   ============================================================

   SUPABASE SETUP (5 minutes, completely free):

   1. Go to https://supabase.com → New project
   2. Go to SQL Editor → run this:

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
      create policy "Public read" on projects for select using (true);
      create policy "Anyone write" on projects for all using (true);

   3. Go to Project Settings → API
      Copy: Project URL  →  paste as VITE_SUPABASE_URL below
      Copy: anon key    →  paste as VITE_SUPABASE_ANON_KEY below

   4. Create a .env file in your project root:
      VITE_SUPABASE_URL=https://xxxx.supabase.co
      VITE_SUPABASE_ANON_KEY=eyJhbGci...

   ============================================================ */

export const CATEGORIES = ['All', 'Website', 'Dashboard', 'E-commerce', 'Animation', 'Mobile'];

export const SEED = [
  {
    id: 'p1',
    title: 'Spice Heaven',
    subtitle: 'Restaurant Ordering App',
    description: 'A modern, minimal restaurant ordering web app with animated UI. Full menu, cart system, and seamless checkout experience built for speed and beauty.',
    tech: ['Next.js', 'React', 'Framer Motion', 'Tailwind CSS'],
    category: 'Website',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85',
    link: 'https://spice-heaven-seven.vercel.app/',
    featured: true,
    color: '#1a0f08',
    accent: '#e8a048',
    sort_order: 0,
  },
  {
    id: 'p2',
    title: 'Elite Fitness Studio',
    subtitle: 'Gym & Wellness Website',
    description: 'High-energy gym website with online membership sign-up, class schedules, trainer profiles, and conversion-focused CTAs that drive real results.',
    tech: ['React', 'Vite', 'Tailwind CSS'],
    category: 'Website',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=85',
    link: '#',
    featured: false,
    color: '#0a1a0f',
    accent: '#4ade80',
    sort_order: 1,
  },
  {
    id: 'p3',
    title: 'Business Growth Dashboard',
    subtitle: 'Analytics & Admin UI',
    description: 'Real-time KPI dashboard with revenue charts, booking trackers, and customer insights. Built to help local businesses make smarter, data-driven decisions.',
    tech: ['React', 'Recharts', 'Tailwind CSS'],
    category: 'Dashboard',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85',
    link: '#',
    featured: false,
    color: '#080d1a',
    accent: '#60a5fa',
    sort_order: 2,
  },
  {
    id: 'p4',
    title: 'The Grand Stay',
    subtitle: 'Hotel & Hospitality Website',
    description: 'Premium hotel website engineered to maximise direct bookings. Stunning room showcases, booking calendar, guest reviews — outperform OTA listings.',
    tech: ['Next.js', 'Tailwind CSS', 'Prisma'],
    category: 'Website',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=85',
    link: '#',
    featured: false,
    color: '#0f0d08',
    accent: '#fbbf24',
    sort_order: 3,
  },
];

export const generateId = () =>
  'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);

// ── Supabase client (lazy, only if env vars exist) ──────────
let _supabase = null;

export function getSupabase() {
  if (_supabase) return _supabase;
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key || url === 'YOUR_SUPABASE_URL') return null;

  // Use the CDN build — no npm package needed
  if (typeof window !== 'undefined' && window.__supabase) {
    _supabase = window.__supabase.createClient(url, key);
  }
  return _supabase;
}

export function isSupabaseConfigured() {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return !!(url && key && url !== 'YOUR_SUPABASE_URL' && url.includes('supabase'));
}
