export default defineNuxtRouteMiddleware((to, from) => {
  const publicRoutes = ['/login', '/register']

  // Ne jamais intercepter les appels API
  if (to.path.startsWith('/api')) return

  // Ne rien faire si déjà sur une route publique
  if (publicRoutes.includes(to.path)) return

  const token = useCookie('auth_token')

  // Si pas de token
  if (!token.value) {
    // Cas SSR (serveur)
    if (import.meta.server) {
      // Stoppe la requête avec un 401 explicite
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
      })
    }

    // Cas client : redirection douce
    return navigateTo('/login')
  }
})