export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('auth_token')

  const publicRoutes = ['/login', '/register']

  // Si déjà sur une route publique, ne rien faire
  if (publicRoutes.includes(to.path)) return

  // Si pas de token → redirige
  if (!token.value || token.value === '') {
    return navigateTo('/login')
  }
})