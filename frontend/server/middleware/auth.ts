// server/middleware/auth.ts
export default defineEventHandler((event) => {
  const token = parseCookies(event).auth_token;

  if (!token && event.req.url && !event.req.url.startsWith('/api') && !['/login', '/register'].includes(event.req.url)) {
    return sendRedirect(event, '/login');
  }
});