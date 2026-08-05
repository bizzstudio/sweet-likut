# sweet-likut — אפליקציית ליקוט (React + Vite SPA), מוגש ע"י nginx
# ---- שלב בנייה ----
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci || npm install

COPY . .

# vite.config.js צורב את process.env לתוך ה-bundle — חובה build arg
ARG VITE_MAIN_SERVER_URL
ENV VITE_MAIN_SERVER_URL=$VITE_MAIN_SERVER_URL

RUN npm run build

# ---- שלב הגשה ----
FROM nginx:alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
