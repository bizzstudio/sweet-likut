// vite.config.js
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // נטען מה-.env שיושב על השרת — לא נצרב בקוד.
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  // הנתיב שממנו האפליקציה מוגשת:
  //   "/"              — דומיין ייעודי (likut.example.com)
  //   "/sweet-likut/"  — תת-תיקייה (srv2.bizzstudio.co.il/sweet-likut/)
  // מנורמל כך שתמיד יתחיל ויסתיים ב-"/", גם אם נכתב ב-.env בלי.
  const rawBase = env.VITE_APP_BASE_PATH || '/';
  const base = `/${rawBase.replace(/^\/+|\/+$/g, '')}/`.replace(/^\/\/$/, '/');

  return {
    plugins: [react()],

    base,

    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    },

    server: {
      historyApiFallback: true, // Ensures fallback to index.html for SPA routing
    },

    define: {
      // אין להזריק את process.env המלא — זה מכניס את כל משתני הסביבה של מכונת
      // הבנייה (כולל סודות של ה-shell) למפת ה-define. בבנייה הנוכחית esbuild
      // מקפל את הביטוי ושום ערך לא שורד, אבל די בתלות אחת שעושה
      // `{...process.env}` כדי שכולם ייצרבו ל-bundle.
      // הקוד משתמש ב-import.meta.env בלבד; אובייקט ריק שומר על תאימות.
      'process.env': {},
    },
  };
});
