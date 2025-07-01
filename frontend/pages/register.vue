<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const authToken = useCookie('auth_token', {
  maxAge: runtimeConfig.public.auth.timeout, // 7 days
  secure: true,
  sameSite: 'lax',
});

const credentials = ref({
  email: '',
  password: '',
  username: '',
  confirm_password: '',
  firstname: '',
  lastname: ''
});

function handleSubmit(event: Event) {
  event.preventDefault();
  // Handle form submission logic here, if needed
  const { email, password } = credentials.value;

  if (email && password) {
    // Example: Send credentials to the server for authentication
    fetch(`${runtimeConfig.public.apiUrl}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...credentials.value })
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
    <h2>Register</h2>
    <div>
      <label for="firstname">First Name:</label>
      <input id="firstname" v-model="credentials.firstname" type="text" name="firstname" required>
    </div>
    <div>
      <label for="lastname">Last Name:</label>
      <input id="lastname" v-model="credentials.lastname" type="text" name="lastname" required>
    </div>
    <div>
      <label for="username">Username:</label>
      <input id="username" v-model="credentials.username" type="text" name="username" required>
    </div>
    <div>
      <label for="email">Email:</label>
      <input id="email" v-model="credentials.email" type="email" name="email" required>
    </div>
    <div>
      <label for="password">Password:</label>
      <input id="password" v-model="credentials.password" type="password" name="password" required>
    </div>
    <div>
      <label for="confirm-password">Confirm Password:</label>
      <input id="confirm-password" v-model="credentials.confirm_password" type="password" name="confirm-password" required>
    </div>
    <div>
      <button type="submit">Create account</button>
    </div>
    <div>
      <p>Already have an account? <a href="/login">Login here</a></p>
    </div>
  </form>
</template>
