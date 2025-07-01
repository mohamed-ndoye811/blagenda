# Étape 1 : Build de l'application
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json yarn.lock ./

# Installer les dépendances
RUN yarn install --frozen-lockfile

# Copier le reste du code
COPY . .

# Construire l'app
RUN yarn build

# Étape 2 : Image finale
FROM node:20-alpine

WORKDIR /app

# Copier uniquement l'app construite + le nécessaire
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/package.json ./

# Réinstaller uniquement les deps nécessaires au preview
RUN yarn install --production --frozen-lockfile

EXPOSE 3000

# Démarrer Nuxt en mode preview
CMD ["node", ".output/server/index.mjs"]