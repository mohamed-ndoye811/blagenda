# ─────── BUILD STAGE ───────
FROM node:20-alpine AS builder

WORKDIR /app

# Copier package et lockfile
COPY package.json yarn.lock ./

# Installer les dépendances
RUN yarn install --frozen-lockfile

# Copier le reste des fichiers
COPY . .

# Générer le site statique
RUN yarn build && yarn generate

# ─────── FINAL STAGE (NGINX) ───────
FROM nginx:stable-alpine

# Supprime le site par défaut de NGINX
RUN rm -rf /usr/share/nginx/html/*

# Copie les fichiers générés
COPY --from=builder /app/.output/public /usr/share/nginx/html

# Utiliser notre propre conf NGINX
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]