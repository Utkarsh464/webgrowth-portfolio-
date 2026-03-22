import { useState, useCallback, useEffect } from 'react';
import { SEED, generateId, getSupabase, isSupabaseConfigured } from '../data/projects';

/* ── localStorage fallback (used when Supabase not configured) ── */
const LS_KEY = 'wg_v2_projects';
const lsLoad = () => { try { const r = localStorage.getItem(LS_KEY); if (r) return JSON.parse(r); } catch (_) {} return SEED; };
const lsSave = (p) => { try { localStorage.setItem(LS_KEY, JSON.stringify(p)); } catch (_) {} };

export function useProjects() {
  const [projects,  setProjects]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [usingCloud, setUsingCloud] = useState(false);

  // ── Load on mount ──────────────────────────────────────────
  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setProjects(lsLoad());
      setLoading(false);
      return;
    }

    const sb = getSupabase();
    if (!sb) { setProjects(lsLoad()); setLoading(false); return; }

    setUsingCloud(true);
    sb.from('projects')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (error || !data) {
          // Supabase error → fall back to localStorage
          setProjects(lsLoad());
        } else if (data.length === 0) {
          // First time: seed the database
          seedDatabase(sb).then(seeded => setProjects(seeded));
        } else {
          setProjects(data);
        }
        setLoading(false);
      });
  }, []);

  // ── Seed database on first use ─────────────────────────────
  const seedDatabase = async (sb) => {
    const { data } = await sb.from('projects').insert(SEED).select();
    return data || SEED;
  };

  // ── Persist helper ─────────────────────────────────────────
  const persist = useCallback((updated) => {
    setProjects(updated);
    if (!usingCloud) lsSave(updated);
  }, [usingCloud]);

  // ── CRUD ───────────────────────────────────────────────────
  const addProject = useCallback(async (data) => {
    const p = { ...data, id: generateId(), featured: false, sort_order: projects.length };
    if (usingCloud) {
      const sb = getSupabase();
      if (sb) {
        const { data: saved } = await sb.from('projects').insert(p).select().single();
        if (saved) { persist([saved, ...projects]); return; }
      }
    }
    persist([p, ...projects]);
  }, [projects, persist, usingCloud]);

  const updateProject = useCallback(async (id, data) => {
    const updated = projects.map(p => p.id === id ? { ...p, ...data } : p);
    if (usingCloud) {
      const sb = getSupabase();
      if (sb) await sb.from('projects').update(data).eq('id', id);
    }
    persist(updated);
  }, [projects, persist, usingCloud]);

  const deleteProject = useCallback(async (id) => {
    const updated = projects.filter(p => p.id !== id);
    if (usingCloud) {
      const sb = getSupabase();
      if (sb) await sb.from('projects').delete().eq('id', id);
    }
    persist(updated);
  }, [projects, persist, usingCloud]);

  const toggleFeatured = useCallback(async (id) => {
    const project = projects.find(p => p.id === id);
    if (!project) return;
    const newVal = !project.featured;
    const updated = projects.map(p => p.id === id ? { ...p, featured: newVal } : p);
    if (usingCloud) {
      const sb = getSupabase();
      if (sb) await sb.from('projects').update({ featured: newVal }).eq('id', id);
    }
    persist(updated);
  }, [projects, persist, usingCloud]);

  const duplicateProject = useCallback(async (id) => {
    const orig = projects.find(p => p.id === id);
    if (!orig) return;
    const copy = { ...orig, id: generateId(), title: orig.title + ' (Copy)', featured: false };
    if (usingCloud) {
      const sb = getSupabase();
      if (sb) await sb.from('projects').insert(copy);
    }
    const idx = projects.findIndex(p => p.id === id);
    const arr = [...projects];
    arr.splice(idx + 1, 0, copy);
    persist(arr);
  }, [projects, persist, usingCloud]);

  return {
    projects,
    loading,
    usingCloud,
    addProject,
    updateProject,
    deleteProject,
    toggleFeatured,
    duplicateProject,
  };
}
