export default defineNuxtRouteMiddleware((to) => {
    const user = useCookie('auth_token') // ou `useState('user')` si tu stockes l’utilisateur

    // Redirige si le token n'existe pas
    if (!user.value && !['/login', '/register'].includes(to.path)) {
        return navigateTo('/login')
    }
})
