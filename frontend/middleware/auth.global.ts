export default defineNuxtRouteMiddleware((to) => {
  // Empêche l'exécution côté serveur (SSR)
  if (import.meta.server) return;

  const token = useCookie("auth_token");
  const publicRoutes = ["/login", "/register"];

  // Ignore les appels API et les routes publiques
  if (to.path.startsWith("/api") || publicRoutes.includes(to.path)) return;

  // Redirige si le token est manquant
  if (!token.value) {
    return navigateTo("/login");
  }
});