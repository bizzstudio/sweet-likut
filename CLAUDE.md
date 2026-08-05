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

One hue (160°), one lightness ramp:

| token | hex | contrast vs white | role |
| --- | --- | --- | --- |
| `mainColor.superLight` | `#edfaf6` | — | tinted backgrounds |
| `mainColor.light` | `#15c188` | 2.3 | gradients / accents — **never** behind text |
| `mainColor.brand` | `#0d9e6d` | 3.4 | the exact logo fill: marks, borders, icons |
| `mainColor.DEFAULT` | `#097954` | 5.4 | action color — anything with white text on it |
| `mainColor.dark` | `#055a3d` | 8.3 | hover / pressed |
| `mainColor.superDark` | `#006300` | 7.5 | the logo's outline stroke |

`brand` and `DEFAULT` are **not** interchangeable. `brand` is the literal logo green, and at
3.4:1 it clears WCAG 1.4.11 for icons and borders but fails 1.4.3 for text. Every surface that
carries white text (`bg-mainColor`, the login button, the antd `colorPrimary`) uses `DEFAULT`.

Logo assets live in `public/logo/`; the square icons come from `sweet-store/public/logo`
(the single source of truth — see `sweet-backend/lib/email-sender/brand.js` for
name/address/phone). `logo-likut.svg` is likut-specific: the wordmark plus "מערכת ליקוט",
with the full Assistant-Bold woff2 inlined as a data URI so it renders identically everywhere
without a webfont request. Keep `public/` free of unreferenced images — everything in it ships
verbatim.

## `.env`

Every `VITE_*` value is **inlined into the client bundle at build time** and is readable by
anyone who opens devtools. `VITE_SWEET_WHATSAPP_API_KEY` is therefore not a secret; treat the
WhatsApp service as publicly reachable and enforce authorization on its side.

`.dockerignore` excludes `.env`, so each variable must also be declared as an `ARG`/`ENV` pair
in the `Dockerfile` — a missing one silently builds to `undefined` (e.g. a POST to
`undefined/send-order-ready`). See `.env.example` for the full list.

`VITE_APP_BASE_PATH` sets Vite's `base`; `BrowserRouter` reads it back via
`import.meta.env.BASE_URL`. If it is not `/`, the server needs a matching rewrite rule —
`public/.htaccess` covers Apache, and `nginx.conf` (used by the Docker image) assumes `/`.
