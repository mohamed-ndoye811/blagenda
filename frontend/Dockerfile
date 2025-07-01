# Étape 1 : Build de l'application
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers nécessaires pour optimiser le cache Docker
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copier uniquement le code source utile
COPY . .

# Build statique
RUN yarn build && yarn generate

# Étape 2 : Image finale avec serveur statique ultra léger
FROM node:20-alpine

WORKDIR /app

# Installer un serveur statique minimal
RUN yarn global add serve

# Copier uniquement le site statique
COPY --from=builder /app/.output/public ./public

EXPOSE 3000

CMD ["serve", "-s", "public", "-l", "3000"]