export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('auth_token')
  const publicRoutes = ['/login', '/register']

  // 🚫 Ignore les routes API
  if (to.path.startsWith('/api')) return

  // Éviter les redirections infinies
  if (publicRoutes.includes(to.path)) return

  if ((!token.value || token.value === '') && !publicRoutes.includes(to.path)) {
    // Utiliser throwError pour éviter les redirections 302 en production
    if (import.meta.server) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      })
    }
    return navigateTo('/login')
  }
})