export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("auth_token")
  const publicRoutes = ["/auth/login", "/auth/register"]

  // ⛔ Ignore les routes publiques
  if (publicRoutes.includes(to.path)) return

  // ⛔ Ignore les routes API (si jamais appelées via navigateTo)
  if (to.path.startsWith("/api")) return

  // ✅ Vérifie strictement la présence du token
  if (!token.value || token.value === "undefined" || token.value === "") {
    console.warn("[middleware] Redirection vers /auth/login depuis", to.path)
    return navigateTo("/auth/login")
  }
})