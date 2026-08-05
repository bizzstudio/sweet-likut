# sweet-likut — אפליקציית ליקוט (React + Vite SPA), מוגש ע"י nginx
# ---- שלב בנייה ----
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci || npm install

COPY . .

# משתני VITE_ נצרבים לתוך ה-bundle בזמן הבנייה — .dockerignore מוציא את .env,
# ולכן כל משתנה שהאפליקציה קוראת חייב להגיע כ-build arg. משתנה שלא יועבר יגיע
# ל-bundle כ-undefined (למשל POST ל-"undefined/send-order-ready").
ARG VITE_MAIN_SERVER_URL
ENV VITE_MAIN_SERVER_URL=$VITE_MAIN_SERVER_URL

ARG VITE_SWEET_WHATSAPP_SERVER_URL
ENV VITE_SWEET_WHATSAPP_SERVER_URL=$VITE_SWEET_WHATSAPP_SERVER_URL

# אזהרה: הערך הזה גלוי לכל מי שפותח את ה-bundle בדפדפן. ראו README.
ARG VITE_SWEET_WHATSAPP_API_KEY
ENV VITE_SWEET_WHATSAPP_API_KEY=$VITE_SWEET_WHATSAPP_API_KEY

# ריק או "/" = דומיין ייעודי; "/sweet-likut/" = הגשה מתת-תיקייה.
ARG VITE_APP_BASE_PATH
ENV VITE_APP_BASE_PATH=$VITE_APP_BASE_PATH

RUN npm run build

# ---- שלב הגשה ----
FROM nginx:alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
