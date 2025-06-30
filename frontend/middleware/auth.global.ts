export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return; // évite l'exécution en SSR (doublon)

  const token = useCookie("auth_token");
  const publicRoutes = ["/login", "/register"];

  if (to.path.startsWith("/api") || publicRoutes.includes(to.path)) return;

  if (!token.value) return navigateTo("/login");
});
