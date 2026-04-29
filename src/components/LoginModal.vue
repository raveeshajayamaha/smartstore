<script setup lang="ts">
import { ref } from "vue"
import { login } from "../store/auth"

const emit = defineEmits<{ (e: "close"): void }>()

const username = ref("")
const password = ref("")
const error = ref("")
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  error.value = ""
  const success = await login(username.value, password.value)
  loading.value = false
  if (success) {
    emit("close")
  } else {
    error.value = "Invalid username or password"
  }
}
</script>

<template>
  <div class="overlay" @click.self="emit('close')">
    <div class="modal">
      <button class="close-btn" @click="emit('close')">✕</button>
      <h2 class="modal-title">🌿 Welcome Back</h2>
      <p class="modal-sub">Login to your TeaHaven account</p>

      <div class="form-group">
        <label>Username</label>
        <input v-model="username" type="text" placeholder="Try: emilys" class="input" />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" placeholder="Try: emilyspass" class="input" />
      </div>

      <p v-if="error" class="error">{{ error }}</p>

      <button @click="handleLogin" class="login-btn" :disabled="loading">
        {{ loading ? "Logging in..." : "Login" }}
      </button>

      <p class="hint">Use username: <b>emilys</b> password: <b>emilyspass</b></p>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal {
  background: white;
  border-radius: 20px;
  padding: 36px;
  width: 400px;
  max-width: 90vw;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 16px;
  background: #f3f4f6;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 14px;
  cursor: pointer;
}

.modal-title {
  font-size: 22px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 6px;
}

.modal-sub {
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
}

.input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
}

.input:focus {
  border-color: #27ae60;
}

.error {
  color: #ef4444;
  font-size: 13px;
  margin-bottom: 12px;
}

.login-btn {
  width: 100%;
  background: #27ae60;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin-bottom: 16px;
}

.login-btn:hover { background: #219a52; }
.login-btn:disabled { background: #9ca3af; cursor: not-allowed; }

.hint {
  font-size: 12px;
  color: #9ca3af;
  text-align: center;
}
</style>