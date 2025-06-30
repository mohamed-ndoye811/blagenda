# Étape 1 — build des dépendances et Prisma
FROM node:20-alpine AS builder

WORKDIR /app
RUN apk add --no-cache git

COPY package*.json ./
COPY prisma ./prisma
RUN npm install
RUN npx prisma generate

COPY . .


# Étape 2 — image finale
FROM node:20-alpine

WORKDIR /app
COPY --from=builder /app ./
ENV NODE_ENV=production
EXPOSE 3001

CMD ["node", "dist/main"]
