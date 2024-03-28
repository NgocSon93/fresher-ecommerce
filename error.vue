<script setup>
const error = useError()
const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <!-- Start of Page Content -->
  <div class="page-content error-404 min-h-screen">
    <div class="container py-28">
      <div class="banner">
        <div class="banner-content text-center">
          <h2 class="banner-title">
            <span class="text-secondary">Oops!!!</span>
            Something Went Wrong Here
          </h2>
          <p class="text-light text-3xl">
            {{ error?.statusCode }} - {{ error?.message }}
          </p>
          <button class="btn btn-dark btn-rounded btn-icon-right" @click="handleError">
            Go Back Home <i class="w-icon-long-arrow-right" />
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- End of Page Content -->
</template>
