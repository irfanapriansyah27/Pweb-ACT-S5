# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Environment variables

All API calls use a base URL defined through Vite's environment system. Create a
`.env` file in `pweb-proyek/` with the following variable:

```bash
VITE_API_BASE_URL=http://localhost/project1/axios
```

Adjust the value to match your backend location.
