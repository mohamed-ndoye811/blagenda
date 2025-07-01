# Étape 1 — build Nuxt
FROM node:20-alpine AS builder

WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

# Étape 2 — image finale légère
FROM node:20-alpine

WORKDIR /app
RUN npm install -g serve

COPY --from=builder /app/.output/public ./public

ENV PORT=3000
EXPOSE 3000

CMD ["serve", "public", "-l", "3000"]