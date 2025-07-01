FROM node:20-alpine AS builder

WORKDIR /app

# Installer les dépendances
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copier les sources et builder
COPY . .
RUN yarn build

# Étape finale
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000

# Utiliser le serveur Nuxt en mode preview
CMD ["yarn", "preview"]