import { useState, useCallback } from 'react';
import { loadProjects, saveProjects, generateId } from '../data/projects';

export function useProjects() {
  const [projects, setProjects] = useState(() => loadProjects());

  const persist = useCallback((updated) => {
    setProjects(updated);
    saveProjects(updated);
  }, []);

  const addProject = useCallback((data) => {
    const p = { ...data, id: generateId(), featured: false };
    const updated = [p, ...projects];
    persist(updated);
    return p;
  }, [projects, persist]);

  const updateProject = useCallback((id, data) => {
    persist(projects.map(p => p.id === id ? { ...p, ...data } : p));
  }, [projects, persist]);

  const deleteProject = useCallback((id) => {
    persist(projects.filter(p => p.id !== id));
  }, [projects, persist]);

  const toggleFeatured = useCallback((id) => {
    persist(projects.map(p => p.id === id ? { ...p, featured: !p.featured } : p));
  }, [projects, persist]);

  const duplicateProject = useCallback((id) => {
    const orig = projects.find(p => p.id === id);
    if (!orig) return;
    const copy = { ...orig, id: generateId(), title: orig.title + ' (Copy)', featured: false };
    const idx  = projects.findIndex(p => p.id === id);
    const arr  = [...projects];
    arr.splice(idx + 1, 0, copy);
    persist(arr);
  }, [projects, persist]);

  return { projects, addProject, updateProject, deleteProject, toggleFeatured, duplicateProject };
}
