# Étape 1 — Build Nuxt avec Yarn + Alpine + dépendances natives
FROM node:20-alpine AS builder

# Ajout des outils requis pour compilation (sharp, etc.)
RUN apk add --no-cache \
  git \
  python3 \
  make \
  g++ \
  libc6-compat

WORKDIR /app

# Installer les deps Node
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# Étape 2 — Runtime léger
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app ./

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
