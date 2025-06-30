<!-- error.vue -->
<template>
  <div>
    <h1 v-if="error.statusCode !== 401">Une erreur est survenue</h1>
    <p v-else>Redirection vers la page de connexion...</p>
  </div>
</template>

<script setup>
defineProps(['error'])

if (error.statusCode === 401) {
  if (import.meta.client) {
    navigateTo('/login')
  }
}
</script>