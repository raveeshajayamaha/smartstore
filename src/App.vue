<script setup>
import Navbar from './components/Navbar.vue'
import ToastNotification from './components/ToastNotification.vue'
</script>

<template>
  <div class="app-wrapper">
    <Navbar />
    <router-view />
    <ToastNotification />
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
