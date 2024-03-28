<script setup>
useSeoMeta({
  title: 'Contact Us',
})
</script>

<template>
  <!-- Start of Main -->
  <main class="main">
    <BasePageHeader text="Contact Us" />
    <BasePageBreadcrumb
      :items="[
        { name: 'Home', route: '/' },
        { name: 'Contact Us' },
      ]"
      :is-border-bottom="true"
    />

    <!-- Start of Page Content -->
    <div class="page-content contact-us">
      <div class="container mt-10">
        <ContactUsInformation />
        <hr class="divider mb-10 pb-1">
        <section class="contact-section">
          <div class="row gutter-lg pb-3">
            <ContactUsQuestion />
            <ContactUsSendMessage />
          </div>
        </section>
      </div>
    </div>
    <div class="contact-footer" />
    <!-- End of Page Content -->
  </main>
  <!-- End of Main -->
</template>

<style scoped lang="scss">
.contact-footer {
  height: 20rem;
  --tw-bg-opacity: 1;
  background-color: rgb(231 229 228 / var(--tw-bg-opacity));
}
section {
    display: block;
}
</style>
