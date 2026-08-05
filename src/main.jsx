// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

// צבעי antd נגזרים מהלוגו של "מתוקיה של בני" — ראו mainColor ב-tailwind.config.js.
// הערכים כאן הם mainColor.DEFAULT/dark ולא mainColor.brand (#0d9e6d): על הטוקנים
// האלה יושב טקסט — כפתור primary עם תווית לבנה, קישורים, הודעות הצלחה — וירוק
// הלוגו נותן 3.4:1 בלבד מול לבן. הגוון הכהה יותר עובר WCAG AA.
// ה-direction לא נקבע כאן: הוא נגזר משפת המשתמש דרך document.documentElement.dir.
const antdTheme = {
  token: {
    colorPrimary: "#097954",
    colorLink: "#097954",
    colorLinkHover: "#055a3d",
    colorSuccess: "#097954",
    fontFamily: "'Assistant', sans-serif",
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
    <ConfigProvider theme={antdTheme}>
      {/* basename נגזר מה-base של Vite (VITE_APP_BASE_PATH), כדי שהראוטר
          יתאים לתת-התיקייה שממנה האפליקציה מוגשת. בלי זה, ניווט ל-"/items"
          מתוך /sweet-likut/ היה קופץ לשורש הדומיין. */}
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </ConfigProvider>
);