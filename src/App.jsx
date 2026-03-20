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

/* ── Protected wrapper — shows login if not authenticated ── */
function ProtectedAdmin() {
  const [authed, setAuthed] = useState(() => isAuthenticated());

  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />;
  }

  return <Admin onLogout={() => { clearAuthenticated(); setAuthed(false); }} />;
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
