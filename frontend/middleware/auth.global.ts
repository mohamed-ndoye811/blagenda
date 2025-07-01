export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return;

  const token = useCookie("auth_token")
  const publicRoutes = ["/login", "/register"]

  // Ignorer les routes publiques
  if (publicRoutes.includes(to.path)) return

  // ⚠️ Ajoute une vérification stricte
  if (!token.value || token.value === "undefined" || token.value === "") {
    return navigateTo("/login")
  }
})