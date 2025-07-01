# -------- STAGE 1 : Build --------
FROM node:20-slim AS build

# Préparation
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copie du code et build
COPY . .
RUN yarn build

# -------- STAGE 2 : Production --------
FROM node:20-slim

# Serveur statique
RUN yarn global add serve

WORKDIR /app
COPY --from=build /app/.output/public ./public

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]