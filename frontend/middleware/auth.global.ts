export default defineNuxtRouteMiddleware((to, from) => {
  console.log("[middleware] Auth middleware triggered", { to, from });
  const token = useCookie("auth_token");
  const publicRoutes = ["/auth/login", "/auth/register"];

  // ⛔ Ignore les routes publiques
  if (publicRoutes.includes(to.path)) return;

  // ✅ Vérifie strictement la présence du token
  if (!token.value || token.value === "undefined" || token.value === "") {
    return navigateTo("/auth/login");
  }
});
