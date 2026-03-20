# WebGrowth.in v2 — Premium Portfolio + Admin System

A premium, animated portfolio website with full admin panel for **WebGrowth.in**.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

| Route    | URL                           | Description                          |
|----------|-------------------------------|--------------------------------------|
| Portfolio| `http://localhost:3000/`      | Public-facing portfolio site         |
| Admin    | `http://localhost:3000/admin` | Admin dashboard (no login required)  |

---

## 📁 Project Structure

```
webgrowth-v2/
├── index.html
├── package.json            React 18, React Router, Lucide
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
│
└── src/
    ├── main.jsx            Entry point
    ├── App.jsx             Router: / and /admin
    │
    ├── styles/
    │   └── globals.css     All base styles, animations, utilities
    │
    ├── data/
    │   └── projects.js     Seed data (4 projects) + localStorage helpers
    │
    ├── hooks/
    │   ├── useProjects.js      CRUD state: add/edit/delete/feature/duplicate
    │   └── useScrollReveal.js  IntersectionObserver scroll reveal
    │
    ├── components/
    │   ├── Navbar.jsx          Transparent-to-frosted nav, mobile menu
    │   ├── StackedCards.jsx    THE MAIN FEATURE — sticky scroll stack animation
    │   └── ProjectForm.jsx     Add/Edit form with image preview, tech tags, color picker
    │
    └── pages/
        ├── Home.jsx     Hero · Portfolio · Services · CTA · Footer
        ├── Admin.jsx    Sidebar · Overview · Projects table · Add/Edit panels
        └── NotFound.jsx Custom 404
```

---

## 🎨 Design

- **Theme:** Minimal editorial — warm cream (`#f8f6f1`) + jet black (`#0a0908`) + gold (`#c8922a`)
- **Fonts:** Cormorant Garamond (display) · DM Sans (body) · JetBrains Mono (tech tags)
- **Portfolio cards:** Full-viewport sticky scroll cards — each card stacks on the previous as you scroll

---

## 🃏 Stacked Card Animation

The main feature: as you scroll down the portfolio section, each project card is **sticky** and the next card slides up underneath it, creating a layered deck effect.

- Desktop: full sticky-stack with parallax image
- Mobile: simple scrolling list

---

## 🛠 Admin Features

| Feature          | How                                          |
|------------------|----------------------------------------------|
| Add project      | Admin → Add Project (sidebar or top button)  |
| Edit project     | Admin → Projects → pencil icon → slide panel |
| Delete project   | Admin → Projects → trash icon → confirm      |
| Feature toggle   | Admin → Projects → star icon                 |
| Duplicate        | Admin → Projects → copy icon                 |
| Card color theme | Colour picker in the form (6 dark themes)    |
| Tech stack tags  | Type + Enter or click Add                    |

---

## 💾 Data

Projects stored in **localStorage** (`wg_v2_projects`). No backend needed.

```js
{
  id:          "p1abc",
  title:       "Restaurant & Café Website",
  subtitle:    "Modern ordering web app",
  description: "What it does...",
  tech:        ["Next.js", "React", "Tailwind"],
  category:    "Website",
  image:       "https://images.unsplash.com/...?w=1200&q=85",
  link:        "https://your-demo.vercel.app",
  color:       "#0a0908",   // card background
  accent:      "#f5dfa0",   // card highlight colour
  featured:    false,
}
```

---

## 🔗 Links

- Instagram: [@webgrowth.in](https://www.instagram.com/webgrowth.in)
- Spice Heaven demo: [spice-heaven-seven.vercel.app](https://spice-heaven-seven.vercel.app/)

---

*WebGrowth.in v2 — Built with React + Vite + Tailwind CSS*
