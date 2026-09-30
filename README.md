# THEKOLLI website

A self-contained static website for THEKOLLI, covering engineering, AI and automation, cloud, growth, products, launchpad, and the company path.

## Run locally

No build step or package installation is required.

1. Open `index.html` directly in a browser, or
2. Start the included development server:

```powershell
npm run dev
```

Or start Python directly from this folder if it is installed:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Build for production

```powershell
npm run build
```

This creates a clean `dist` folder containing the deployable `index.html`, `styles.css`, and `script.js` files. Upload the contents of `dist` to any static host such as Netlify, Vercel, GitHub Pages, or a standard web server.

## Files

- `index.html` - page structure and content
- `styles.css` - layout, responsive styles, and animations
- `script.js` - loader, interactions, canvas effects, orbit content, and contact form
- `thekolli.html` - original self-contained version kept for reference

## Contact form

The form uses a `mailto:` handoff to `thekolli.in@gmail.com`. Visitors need a configured desktop or web email application for the message composer to open. A backend email service can be connected later without changing the visual form.
