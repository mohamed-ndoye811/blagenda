import { RuntimeConfig } from '@nuxt/schema';
<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const authToken = useCookie('auth_token', {
  maxAge: runtimeConfig.public.auth.timeout, // 7 days
  secure: true,
  sameSite: 'lax',
});

const credentials = ref({
  email: '',
  password: ''
});

function handleSubmit(event: Event) {
  event.preventDefault();
  
  // Handle form submission logic here, if needed
  const { email, password } = credentials.value;

  if (email && password) {
    // Example: Send credentials to the server for authentication
    fetch(`${runtimeConfig.public.apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.code == "login_success") {
        authToken.value = data.auth_token;
        refreshCookie("auth_token");

        // Redirect to the home page or another page after successful login
        window.location.href = '/';
      } else {
        // Handle login error, e.g., show an error message
        // alert('Login failed: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Error during login:', error);
      // alert('An error occurred while logging in.');
    });
  } else {
    // alert('Please enter both email and password.');
  }
}
</script>

<template>
  <form @submit="handleSubmit">
    <h2>Login</h2>
    <div>
      <label for="email">email:</label>
      <input id="email" v-model="credentials.email" type="text" name="email" required>
    </div>
    <div>
      <label for="password">Password:</label>
      <input id="password" v-model="credentials.password" type="password" name="password" required>
    </div>
    <div>
      <button type="submit">Login</button>
    </div>
    <div>
      <p>Don't have an account? <a href="/register">Register here</a></p>
    </div>
  </form>
</template>
