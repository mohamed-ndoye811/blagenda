# Étape 1 — Build NestJS + Drizzle
FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache git

COPY package*.json ./
COPY database ./database
COPY tsconfig*.json ./

RUN npm install

COPY . .

RUN npm run build

# Étape 2 — Image finale minimale
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/database ./database
COPY --from=builder /app/start.sh .

RUN chmod +x start.sh

ENV NODE_ENV=production
EXPOSE 3333

CMD ["./start.sh"]