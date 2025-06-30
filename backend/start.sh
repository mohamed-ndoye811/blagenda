echo "▶️ Appliquer les migrations Prisma..."
npx prisma migrate deploy

echo "🚀 Lancement de l'application NestJS"
exec node dist/main
