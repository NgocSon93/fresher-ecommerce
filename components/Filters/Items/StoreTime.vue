<script setup lang="ts">
</script>

<template>
  <div class="widget-store-time">
    <ul class="filter-items">
      <li><label>Sunday</label></li>
      <li><label>Monday</label></li>
      <li><label>Tuesday</label></li>
      <li><label>Wednesday</label></li>
      <li><label>Thursday</label></li>
      <li><label>Friday</label></li>
      <li><label>Saturday</label></li>
    </ul>
  </div>
  <!-- End of Widget -->
</template>

<style scoped lang="scss">
.widget-store-time {
  & .filter-items {
    & li {
      padding: 1rem 0;

      & label {
        font-size: 1.4rem;

        &::after {
          content: "-";
          display: inline-block;
          margin-left: 0.4rem;
        }
      }
    }
  }
}
</style>
