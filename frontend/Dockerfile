FROM node:20-alpine AS builder

WORKDIR /app

# Copier package files d'abord pour tirer parti du cache Docker
COPY package.json yarn.lock ./

# Installer les dépendances
RUN yarn install --frozen-lockfile

# Copier le reste des fichiers
COPY . .

# Build Nuxt
RUN yarn build

# Image finale
FROM node:20-alpine

WORKDIR /app

# Installer un serveur statique (serve ou http-server)
RUN yarn global add serve

COPY --from=builder /app/.output/public ./public

EXPOSE 3000

CMD ["serve", "public", "-l", "3000"]