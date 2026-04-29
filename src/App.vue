<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="app-wrapper">
    <Navbar />
    <router-view />
  </div>
</template>

<style>
.app-wrapper {
  min-height: 100vh;
  background: #ffffff;
}

.dark .app-wrapper {
  background: #111827;
}
</style>
