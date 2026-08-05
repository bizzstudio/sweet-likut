# sweet-likut — המתוקים של בני | מערכת ליקוט

אפליקציית הליקוט (picking & fulfillment) של המלקטים במחסן. React 18 + Vite + Ant Design, עברית / RTL.
צד לקוח של `sweet-backend`.

## הפעלה

```bash
npm install
npm run dev      # vite  (ברירת מחדל :5173)
npm run build    # בנייה לפרודקשן
npm run lint     # eslint --max-warnings 0
```

## משתני סביבה (`.env`)

| משתנה | תיאור |
| --- | --- |
| `VITE_MAIN_SERVER_URL` | כתובת הבסיס של `sweet-backend` (כולל הסגמנט `/api`) |
| `VITE_SWEET_WHATSAPP_SERVER_URL` | כתובת שירות הוואטסאפ (`sweet-whatsapp`) |
| `VITE_SWEET_WHATSAPP_API_KEY` | מפתח API לשירות הוואטסאפ |

## Docker

```bash
docker build --build-arg VITE_MAIN_SERVER_URL=<url> -t sweet-likut .
docker run -p 8080:80 sweet-likut
```
