// tailwind.config.js
const defaultTheme = require("tailwindcss/defaultTheme");

const config = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            // הפלטה נגזרת מלוגו "מתוקיה של בני": מילוי #0d9e6d, קו מתאר #006300.
            // כל הגוונים על אותו גוון (hue 160) — סולם בהירות אחד.
            //
            // חשוב: `brand` הוא צבע הלוגו המדויק, והניגודיות שלו מול לבן היא 3.4:1 —
            // מספיק לאייקונים ולמסגרות (WCAG 1.4.11) אך *לא* לטקסט. לכן `DEFAULT`,
            // שהוא צבע הפעולה שעליו יושב טקסט לבן, הוא גוון כהה יותר של אותו ירוק
            // (5.4:1, עובר AA). אין להחליף ביניהם.
            colors: {
                mainColor: {
                    superLight: '#edfaf6', // רקעים מוצלים
                    light: '#15c188',      // הדגשות וגרדיאנטים (לא לטקסט)
                    brand: '#0d9e6d',      // מילוי הלוגו — סימנים, מסגרות, אייקונים
                    DEFAULT: '#097954',    // צבע פעולה — 5.4:1 מול לבן
                    dark: '#055a3d',       // hover / pressed — 8.3:1 מול לבן
                    superDark: '#006300',  // קו המתאר של הלוגו
                },
            },
            fontFamily: {
                sans: ["Assistant", "sans-serif"],
                serif: ["Inter", ...defaultTheme.fontFamily.sans],
            },
            boxShadow: {
                around: "0 4px 8px 4px rgba(0, 0, 0, 0.05)",
                bottom:
                    "0 5px 6px -7px rgba(0, 0, 0, 0.6), 0 2px 4px -5px rgba(0, 0, 0, 0.06)",
            },
            height: {
                28: "100px",
                sm: "350px",
                md: "400px",
                330: "330px",
                440: "440px",
                lg: "500px",
                xl: "600px",
            },
            width: {
                80: "80px",
                100: "100px",
                200: "200px",
                300: "300px",
                400: "400px",
            },
            padding: {
                2.5: "10px",
            },
            screens: {
                "2xl": "1440px",
                xl: "1280px",
                lg: "1024px",
                ipad: { min: "960px", max: "1023px" },
                md: "768px",
                sm: "640px",
                xs: "420px",
                'xss': "320px",
            },
            borderRadius: {
                '4xl': '30px',
            },
            inset: {
                "-1": "-1rem",
                "-2": "-2rem",
                "-3": "-3rem",
                "-4": "-4rem",
                "-5": "-5rem",
                "-6": "-6rem",
                "-7": "-7rem",
                "-8": "-8rem",
                "-9": "-9rem",
                "-10": "-10rem",
                1: "1rem",
                2: "2rem",
                3: "3rem",
                4: "4rem",
                5: "5rem",
                6: "6rem",
                7: "7rem",
                8: "8rem",
                9: "9rem",
                10: "10rem",
            },
        },
    },
    variants: {
        display: ["group-hover"],
    },
    plugins: [
        function ({ addBase, theme }) {
            addBase({
                ':root': {
                    /* Main Color */
                    '--main-color-super-light': theme('colors.mainColor.superLight'),
                    '--main-color-light': theme('colors.mainColor.light'),
                    '--main-color-brand': theme('colors.mainColor.brand'),
                    '--main-color': theme('colors.mainColor.DEFAULT'),
                    '--main-color-dark': theme('colors.mainColor.dark'),
                    '--main-color-super-dark': theme('colors.mainColor.superDark'),
                },
            });
        },
    ],
};

module.exports = {
    ...config,
};