# Étape 1 — Build des dépendances, Prisma et NestJS
FROM node:20-alpine AS builder

WORKDIR /app
RUN apk add --no-cache git

# Copie des fichiers nécessaires pour installer les dépendances
COPY package*.json ./
COPY prisma ./prisma
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Installation et génération Prisma
RUN npm install
RUN npx prisma generate

# Copie du code source NestJS
COPY . .

# Build NestJS pour créer le dossier dist/
RUN npm run build

# Étape 2 — Image finale
FROM node:20-alpine

WORKDIR /app

# Copie depuis le builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

# Configuration finale
ENV NODE_ENV=production
EXPOSE 3001

CMD ["node", "dist/main"]