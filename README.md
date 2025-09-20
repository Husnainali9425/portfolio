# Personal Portfolio Website

A clean, responsive, and accessible **personal portfolio website** built with **HTML**, **CSS**, and **vanilla JavaScript**.  
Showcase your skills, projects, and contact info in a one-page design.  

---

## ✨ Features

- Responsive design (desktop → mobile)  
- Smooth scrolling navigation with mobile-friendly menu  
- Projects grid with modal popups (title, description, image, live link)  
- About section with quick info and avatar  
- Skills grid with styled badges  
- Contact form with two options:  
  - **Formspree integration** (AJAX submit)  
  - **`mailto:` fallback** if no Formspree ID set  
- Copy-to-clipboard email button  
- Accessible keyboard support:  
  - Tab/Enter/Space to open project cards  
  - Esc / ✕ / backdrop click to close modal  
  - Visible focus states for navigation  

---

## 📂 File Structure

portfolio/
├─ index.html       # main HTML
├─ styles.css       # styling (responsive, dark mode theme)
├─ script.js        # interactivity (nav, modal, form, copy email)
├─ assets/          # your images (avatar, project screenshots)
│   ├─ avatar.jpg
│   ├─ project-1.jpg
│   └─ project-2.jpg
└─ README.md

---

## 🚀 Installation & Run Locally

1. Clone or download this repo:
   ```bash
   git clone https://github.com/<your-username>/portfolio.git
   cd portfolio

2. Open `index.html` directly in a browser
   (works for most features but some browsers block form submissions via `file://`).

3. Recommended: run a static server

   **Python 3**

   ```bash
   python3 -m http.server 5500
   # open http://localhost:5500
   ```

   **Node (serve)**

   ```bash
   npm install -g serve
   serve .
   ```

---

## 🛠 Usage

* **Navigation**: Click nav links (or use keyboard Tab → Enter). Mobile users tap ☰ to open menu.
* **Projects**: Click or press Enter on a project card → modal opens with details. Close via ✕, backdrop, or Esc.
* **Contact**: Fill out form and send.

  * If `FORM_SPPREE_ID` is set in `script.js`, the form POSTs to Formspree.
  * Otherwise, fallback opens your email app (`mailto:`).
* **Copy Email**: Click “Copy email” → email address is copied to clipboard.

---

## ⚙️ Configuration

* **Update your info**:

  * Replace `"Your Name"`, avatar, and email in `index.html`.
  * Add/replace project cards (update `data-title`, `data-desc`, `data-image`, `data-live`).
  * Update colors in `styles.css` (`:root` variables).

---

## 📦 Deployment

### Vercel (recommended)

1. Push project to GitHub
2. Import repo in [Vercel](https://vercel.com) → New Project → Deploy
3. Or use CLI:

   ```bash
   npm install -g vercel
   vercel
   vercel --prod
   ```

### GitHub Pages

1. Push repo to GitHub
2. Settings → Pages → Deploy from branch → `main` → `/ (root)`

---

## 🔒 Accessibility Checklist

* Semantic HTML (header, main, section, footer, nav)
* Modal: `role="dialog"`, focus management, Esc to close
* High-contrast text vs background
* Keyboard navigable (links, buttons, cards)

---

## 🤝 Contributing

Feel free to fork and improve!

---

## 📄 License

MIT License © \[Your Name]
You can freely use, modify, and distribute this project.


