<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

useSeoMeta({
  title: 'Forgot password',
})
</script>

<template>
  <!-- Start of Main -->
  <main class="main forgot-page">
    <BasePageHeader text="My Account" />
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
        <AuthFormForgot />
      </div>
    </div>
    <!-- End of Page Content -->
  </main>
  <!-- End of Main -->
</template>

<style scoped lang="scss">
.forgot-page {
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

  & .breadcrumb-nav {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;

    & .breadcrumb {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      border-bottom: 1px solid #eeeeee;
      color: #333;
      font-size: 1.3rem;
      line-height: 1.5;
      padding: 1.5rem 0.2rem 1.6rem;

      & li:not(:last-child)::after {
        content: ">";
        position: relative;
        display: inline-block;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        font-size: 1rem;
        font-weight: 500;
        font-family: "wolmart";
      }

      & li:last-child {
        color: #333333;
      }
    }
  }
}
</style>
