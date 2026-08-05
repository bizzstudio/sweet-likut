# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

This is **sweet-likut**, the "Likut" (ליקוט / picking & fulfillment) app used by warehouse pickers (*melaket*) to view and fulfill orders. React 18 + Vite + Ant Design. It is a small client of `sweet-backend`. See `../CLAUDE.md` for cross-app context. Hebrew-first / RTL.

## Commands

```
npm run dev      # vite  (default :5173)
npm run build    # vite build
npm run lint     # eslint . --ext js,jsx --max-warnings 0
```

ES modules (`"type": "module"`). Lint is strict (`--max-warnings 0`) — keep it clean.

## Architecture

Intentionally minimal. `react-router-dom` **v6** with just a few screens:

- `src/App.jsx` is the root: fetches orders from `${VITE_MAIN_SERVER_URL}/app/orders` (optionally `?getAll=true`) and routes to the screens below.
- Screens/components: `components/Login`, `components/Items` (order list), `components/Item` (single order picking view), `components/Header`, `components/PrivateRoute`.
- **Auth:** `token` and `melaketId` are stored in **localStorage** (not cookies). Requests send `Authorization: Bearer <token>`; a `401` clears both keys and redirects to `/login`. The backend authenticates pickers via the `isApp` middleware against the `Status` model.
- **Direction:** RTL is toggled from a stored `language` (`document.documentElement.dir`); a `languageContext` carries `{ language, setLanguage }`.
- `zustand` is available for state; `woocommerce-api` is a leftover dependency and is not part of the live flow.

## Branding

Brand is **מתוקיה של בני**. The palette is derived from the logo and lives in one place —
`mainColor` in `tailwind.config.js`, re-exported as `--main-color*` CSS vars and fed to antd
via the `ConfigProvider` token in `src/main.jsx`. Do not hardcode brand hex values in CSS.

| token | hex | role |
| --- | --- | --- |
| `mainColor.DEFAULT` | `#0d9e6d` | logo fill / primary |
| `mainColor.superDark` | `#006300` | logo outline stroke |
| `mainColor.dark` | `#0a7c56` | hover / pressed |
| `mainColor.light` | `#15c188` | accents |
| `mainColor.superLight` | `#eafaf3` | tinted backgrounds |

Logo assets live in `public/logo/` and are copied from `sweet-store/public/logo` (the single
source of truth — see `sweet-backend/lib/email-sender/brand.js` for name/address/phone).
`login-logo.svg` is likut-specific: the wordmark plus "מערכת ליקוט", with the full
Assistant-Bold woff2 inlined as a data URI so it renders identically everywhere.

## `.env`

Uses `VITE_MAIN_SERVER_URL` (the `sweet-backend` base URL, including the `/api` segment as consumed in `App.jsx`). Confirm the exact value in the local `.env` before changing API calls.
