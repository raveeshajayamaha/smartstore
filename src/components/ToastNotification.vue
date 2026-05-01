<script setup lang="ts">
import { toastMessage, toastVisible } from "../store/toast"
</script>

<template>
  <div v-if="toastVisible" class="toast">
    ✅ {{ toastMessage }}
  </div>
</template>

<style>
.toast {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: #27ae60;
  color: white;
  padding: 14px 24px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  z-index: 9999;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>