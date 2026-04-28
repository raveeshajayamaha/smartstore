<script setup lang="ts">
import { search } from "../store/search"
</script>

<template>
  <nav class="navbar">
    <!-- Logo -->
    <div class="logo">
      <div class="logo-icon">🌿</div>
      <div class="logo-text">
        <span class="brand-name">TeaHaven</span>
        <span class="brand-sub">Pure Herbal Experience</span>
      </div>
    </div>


    <!-- Nav Links -->
<div class="nav-links">
  <a href="#" class="nav-link">🏠 Home</a>
  <a href="#shop-section" class="nav-link">📦 Shop</a>
</div>

    <!-- Search + Cart -->
    <div class="nav-right">
      <div class="search-box">
        <span class="search-icon">🔍</span>
       <input v-model="search" type="text" placeholder="Search teas..." class="search-input" />
      </div>
      <a href="#cart-section" class="cart-btn">🛒 Cart</a>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-icon {
  width: 42px;
  height: 42px;
  background: #27ae60;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-weight: 700;
  font-size: 18px;
  color: #1a5c38;
  line-height: 1.2;
}

.brand-sub {
  font-size: 11px;
  color: #27ae60;
}

.nav-links {
  display: flex;
  gap: 32px;
}

.nav-link {
  text-decoration: none;
  color: #374151;
  font-size: 15px;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #27ae60;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-box {
  display: flex;
  align-items: center;
  background: #f3f4f6;
  border-radius: 999px;
  padding: 8px 14px;
  gap: 8px;
}

.search-icon {
  font-size: 14px;
  color: #9ca3af;
}

.search-input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  color: #374151;
  width: 160px;
}

.search-input::placeholder {
  color: #9ca3af;
}

.cart-btn {
  background: #27ae60;
  color: white;
  padding: 10px 20px;
  border-radius: 999px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: background 0.2s;
}

.cart-btn:hover {
  background: #219a52;
}
</style>