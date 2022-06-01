<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div
        class="col-2 vh-100 d-flex flex-column align-items-center bg- gray-200 divider-right"
      >
        <RouterLink to="/" class="btn btn-secondary w-75 my- 2"
          >Home</RouterLink
        >

        <RouterLink to="/about" class="btn btn-secondary w-75 my- 2"
          >About</RouterLink
        >
      </div>
      <div class="col-10">
        <RouterView />
      </div>
    </div>
  </div>
</template>
