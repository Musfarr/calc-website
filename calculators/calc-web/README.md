# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## SEO prerendering (Vite)

This project uses a prerender step to generate static HTML (including `<title>`, `<meta>`, and canonical tags) so they appear in **View Source** and SEO tools.

### How it works
- `vite build` creates the SPA bundle in `dist/`.
- `npm run prerender` launches a headless browser and saves rendered HTML for:
  - `/blog/`
  - `/blog/:slug/` (slugs are fetched from WordPress at build time)

### Build
```bash
npm install
npm run build
```

### Important: new blog posts
Prerendering is a **build-time snapshot**.
- If new posts are published in WordPress after deploy, they will **not** appear in `Ctrl+U` until a new build runs.
- The app will still **fetch and show the latest posts client-side**, but SEO tools that only read the server HTML won’t see new meta tags until rebuild.

**Recommendation:** trigger a Vercel build on new WordPress posts (webhook) so new slugs are prerendered and indexed quickly.
