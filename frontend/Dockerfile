# Étape 1 — Build Nuxt SSR
FROM node:20-alpine AS builder

WORKDIR /app

# Copie des fichiers de dépendances
COPY package.json yarn.lock ./

# Installation des dépendances
RUN yarn install --frozen-lockfile

# Copie du code source
COPY . .

# Build Nuxt SSR
RUN yarn build

# Étape 2 — Image finale
FROM node:20-alpine

WORKDIR /app

# Copie du code généré (.output)
COPY --from=builder /app/.output ./

# Exposition du port (doit correspondre à ton service/pod)
EXPOSE 3000

# Lancement du serveur Nuxt SSR
CMD ["node", "server/index.mjs"]