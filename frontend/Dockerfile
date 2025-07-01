# Étape 1 — Build de l'app Nuxt
FROM node:20-alpine AS builder

WORKDIR /app

# Copie les fichiers de dépendances
COPY package.json yarn.lock ./

# Installation des dépendances
RUN yarn install --frozen-lockfile

# Copie du reste des fichiers
COPY . .

# Build statique (SSG)
RUN yarn build
RUN yarn generate


# Étape 2 — Image finale légère avec Serve
FROM node:20-alpine

# Installation de 'serve'
RUN yarn global add serve

WORKDIR /app

# Copie des fichiers statiques générés
COPY --from=builder /app/.output/public ./public

# Exposition du port (optionnel mais recommandé)
EXPOSE 3000

# Démarrage avec Serve sur le port 3000
CMD ["serve", "public", "-l", "3000"]