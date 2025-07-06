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
});

function handleSubmit(event: Event) {
  event.preventDefault();

  console.log("Form submitted with credentials:", credentials.value);

  // Handle form submission logic here, if needed
  const { email, password } = credentials.value;

  if (email && password) {
    // Example: Send credentials to the server for authentication
    fetch(`${runtimeConfig.public.apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
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
          <div class="title">
            <h2>Welcome Back !</h2>
            <p class="subtitle">Connecte-toi et retrouve tes calendriers</p>
          </div>
          <AppFormInput id="email" v-model="credentials.email" label="Addresse e-mail" name="email" type="text"
            placeholder="john.doe@email.com" required />
          <AppFormInput id="password" v-model="credentials.password" label="Mot de passe" name="password"
            type="password" placeholder="***********" required />

          <AppButton id="login-button" label="Se connecter" name="login" type="submit" value="Login"
            class="form-input" />
        </form>
      </template>

      <template #footer>
        <p>
          Tu n'as pas de compte ? <NuxtLink to="/auth/register">Créées-en un !</NuxtLink>
        </p>
      </template>
    </NuxtLayout>
  </div>
</template>

<style lang="scss">
// .auth-container {
//   justify-content: start !important;
//   background-image: url("@/assets/images/grdnt_or.webp") !important;
// }</style>
