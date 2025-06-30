// server/middleware/auth.ts
export default defineEventHandler((event) => {
  const protectedPaths = ['/', '/dashboard', '/mon-compte']
  const token = getCookie(event, 'auth_token')
  const path = getRequestURL(event).pathname

  // Laisse passer les routes publiques et les appels API
  if (path.startsWith('/api') || protectedPaths.includes(path)) return

  // Redirection si token manquant
  if (!token) {
    return sendRedirect(event, '/login')
  }
})