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

העתיקו מ־[.env.example](.env.example).

| משתנה | תיאור |
| --- | --- |
| `VITE_MAIN_SERVER_URL` | כתובת הבסיס של `sweet-backend` (כולל הסגמנט `/api`) |
| `VITE_SWEET_WHATSAPP_SERVER_URL` | כתובת שירות הוואטסאפ (`sweet-whatsapp`) |
| `VITE_SWEET_WHATSAPP_API_KEY` | מפתח API לשירות הוואטסאפ |
| `VITE_APP_BASE_PATH` | הנתיב שממנו האפליקציה מוגשת (`/` או `/sweet-likut/`) |

> ⚠️ כל משתנה `VITE_*` נצרב לתוך ה־bundle ונקרא בדפדפן של כל מלקט.
> `VITE_SWEET_WHATSAPP_API_KEY` **אינו סוד** — יש לאכוף הרשאות בצד שירות הוואטסאפ.

## מיתוג

הצבעים נגזרים מהלוגו ומוגדרים במקום אחד — `mainColor` ב־[tailwind.config.js](tailwind.config.js),
ומשם עוברים ל־CSS vars ול־antd דרך ה־`ConfigProvider` ב־[src/main.jsx](src/main.jsx).

| טוקן | hex | תפקיד |
| --- | --- | --- |
| `superLight` | `#edfaf6` | רקעים מוצלים |
| `light` | `#15c188` | גרדיאנטים והדגשות (לא מתחת לטקסט) |
| `brand` | `#0d9e6d` | צבע הלוגו המדויק — סימנים, מסגרות, אייקונים |
| `DEFAULT` | `#097954` | צבע פעולה — כל משטח שיושב עליו טקסט לבן |
| `dark` | `#055a3d` | hover / pressed |
| `superDark` | `#006300` | קו המתאר של הלוגו |

`brand` ו־`DEFAULT` אינם ניתנים להחלפה: `brand` הוא ירוק הלוגו (3.4:1 מול לבן — מספיק
לאייקונים ומסגרות, לא לטקסט), ו־`DEFAULT` הוא הגוון הכהה יותר שעובר WCAG AA (5.4:1).

## Docker

```bash
docker build \
  --build-arg VITE_MAIN_SERVER_URL=<url> \
  --build-arg VITE_SWEET_WHATSAPP_SERVER_URL=<url> \
  --build-arg VITE_SWEET_WHATSAPP_API_KEY=<key> \
  -t sweet-likut .
docker run -p 8080:80 sweet-likut
```

ה־image מגיש דרך nginx מהשורש (`/`). להגשה מתת־תיקייה יש להוסיף
`--build-arg VITE_APP_BASE_PATH=/sweet-likut/` ולהתאים את [nginx.conf](nginx.conf)
(או להשתמש ב־Apache עם [public/.htaccess](public/.htaccess) שכבר מוגדר לכך).
