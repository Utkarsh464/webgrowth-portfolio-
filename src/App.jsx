import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home       from './pages/Home';
import Admin      from './pages/Admin';
import NotFound   from './pages/NotFound';
import AdminLogin, { isAuthenticated, clearAuthenticated } from './components/AdminLogin';
import './styles/globals.css';

function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

function ProtectedAdmin() {
  // Re-check every render — never trust stale state
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Run auth check only on client, never skip it
    const ok = isAuthenticated();
    setAuthed(ok);
    setChecked(true);
  }, []);

  // Don't render anything until we've checked — prevents flash
  if (!checked) return null;

  if (!authed) {
    return (
      <AdminLogin
        onSuccess={() => {
          // Re-verify the session was actually saved before allowing access
          if (isAuthenticated()) setAuthed(true);
        }}
      />
    );
  }

  return (
    <Admin
      onLogout={() => {
        clearAuthenticated();
        setAuthed(false);
      }}
    />
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollReset />
      <Routes>
        <Route path="/"      element={<Home />} />
        <Route path="/admin" element={<ProtectedAdmin />} />
        <Route path="*"      element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
