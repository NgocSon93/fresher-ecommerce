<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

useSeoMeta({
  title: 'Register',
})

const isLogin = ref(false)

function onLoginSucess() {
  useRouter().push('/')
}
</script>

<template>
  <!-- Start of Main -->
  <main class="main register-page">
    <BasePageHeader text="Account" />
    <BasePageBreadcrumb
      :items="[
        { id: 1, name: 'Home', route: '/' },
        { id: 2, name: 'My account', route: '' },
      ]"
      :is-border-bottom="true"
    />

    <!-- Start of Page Content -->
    <div class="page-content">
      <div class="container">
        <div class="register-popup">
          <AuthFormLogin v-model:is-login="isLogin" @on-login-sucess="onLoginSucess" />
        </div>
      </div>
    </div>
    <!-- End of Page Content -->
  </main>
  <!-- End of Main -->
</template>

<style scoped lang="scss">
.register-page {
  & .page-header {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    height: 18rem;
    background-color: #eee;
    text-align: center;
    text-transform: capitalize;

    & .page-title {
      font-size: 3.4rem;
      font-weight: 700;
      letter-spacing: -0.025em;
      line-height: 1.1;
      margin-bottom: 0.2rem;
    }
  }

  & .register-popup {
    margin: 4.2rem auto 5rem;
    max-width: 50rem;
    padding: 3.3rem 5rem 2.6rem;
    -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
}
</style>
