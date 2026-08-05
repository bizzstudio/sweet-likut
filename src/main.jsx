// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

// צבעי antd נגזרים מהלוגו של "מתוקיה של בני" — ראו mainColor ב-tailwind.config.js.
// ה-direction לא נקבע כאן: הוא נגזר משפת המשתמש דרך document.documentElement.dir.
const antdTheme = {
  token: {
    colorPrimary: "#0d9e6d",
    colorLink: "#0d9e6d",
    colorLinkHover: "#15c188",
    colorSuccess: "#0d9e6d",
    fontFamily: "'Assistant', sans-serif",
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
    <ConfigProvider theme={antdTheme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
);