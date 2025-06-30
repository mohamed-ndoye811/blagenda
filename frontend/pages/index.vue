<script setup lang="ts">
const authCookie = useCookie('auth_token');

function logOut() {
  // Clear the auth token cookie
  authCookie.value = null;
  refreshCookie('auth_token');

  // Redirect to the login page
  window.location.href = '/login';
}
</script>

<template>
  <div class="container">
    <h1>Bienvenue sur blagenda</h1>
    <button @click="logOut">Se déconnecter</button>
  </div>
</template>
