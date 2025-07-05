<script setup lang="ts">
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip, CustomEase);

definePageMeta({
  layout: false,
});

const runtimeConfig = useRuntimeConfig();
const authToken = useCookie("auth_token", {
  maxAge: runtimeConfig.public.auth.timeout, // 7 days
  secure: true,
  sameSite: "lax",
});

const credentials = ref({
  email: "",
  password: "",
  username: "",
  confirm_password: "",
});

function handleSubmit(event: Event) {
  event.preventDefault();
  // Handle form submission logic here, if needed
  const { email, password } = credentials.value;

  if (email && password) {
    // Example: Send credentials to the server for authentication
    fetch(`${runtimeConfig.public.apiUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...credentials.value }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code == "login_success") {
          authToken.value = data.auth_token;
          refreshCookie("auth_token");

          // Redirect to the home page or another page after successful login
          window.location.href = "/";
        } else {
          // Handle login error, e.g., show an error message
          // alert('Login failed: ' + data.message);
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        // alert('An error occurred while logging in.');
      });
  } else {
    // alert('Please enter both email and password.');
  }
}
</script>

<template>
  <div>
    <NuxtLayout name="auth">
      <template #form>
        <form @submit="handleSubmit">
          <div class="title" @click="testFlip">
            <h2>Rejoins-nous !</h2>
            <p class="subtitle">
              Créée ton compte et reprends tes plannings en main !
            </p>
          </div>
          <AppFormInput
            id="username"
            v-model="credentials.username"
            label="Nom d'utilisateur"
            name="username"
            type="text"
            placeholder="Blagenda"
            required
          />

          <AppFormInput
            id="email"
            v-model="credentials.email"
            label="Adresse e-mail"
            name="email"
            type="email"
            placeholder="b8A7o@example.com"
            required
          />

          <AppFormInput
            id="password"
            v-model="credentials.password"
            label="Mot de passe"
            name="password"
            type="password"
            placeholder="Mot de passe"
            required
          />

          <AppFormInput
            id="confirm-password"
            v-model="credentials.confirm_password"
            label="Confirmation mot de passe"
            name="confirm_password"
            type="password"
            placeholder="Mot de passe"
            required
          />
          <div>
            <button type="submit">Créer le compte</button>
          </div>
        </form>
      </template>

      <template #footer>
        <p>
          Vous avez déjà un compte ?
          <NuxtLink to="/auth/login">Connectez-vous !</NuxtLink>
        </p>
      </template>
    </NuxtLayout>
  </div>
</template>

<style lang="scss">
// .auth-container {
//   justify-content: end !important;
//   background-image: url("@/assets/images/grdnt_blue.webp") !important;
// }
</style>
