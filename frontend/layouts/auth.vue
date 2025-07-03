<template>
  <div class="auth-container">
    <div class="wrapper">
      <img
        src="~/assets/images/branding/full_logo_dark.svg"
        alt=""
        class="logo"
      />
      <slot name="form" />
      <div class="footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  //   font-family: Arial, sans-serif;
}

.auth-container {
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100vw;
  padding: 40px;
  background: no-repeat center center;
  background-size: cover;

  .wrapper {
    height: 100%;
    width: 40%;
    background-color: $clr-primary;
    border-radius: 10px;
    padding: 64px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    min-width: 560px;

    .logo {
      position: absolute;
      top: 24px;
      left: 50%;
      transform: translateX(-50%);
    }
    
    .footer {
        position: absolute;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
    }

    form {
        width: 100%;

      .title {
        margin-bottom: 40px;
      }

    }
  }
}
</style>
