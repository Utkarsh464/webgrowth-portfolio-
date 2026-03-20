/* ============================================================
   WebGrowth.in v2 — Project data & localStorage
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
  },
];

const KEY = 'wg_v2_projects';

export const loadProjects = () => {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  localStorage.setItem(KEY, JSON.stringify(SEED));
  return SEED;
};

export const saveProjects = (projects) => {
  try { localStorage.setItem(KEY, JSON.stringify(projects)); } catch (_) {}
};

export const generateId = () =>
  'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
