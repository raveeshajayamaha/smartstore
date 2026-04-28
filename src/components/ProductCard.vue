<script setup lang="ts">
import type { Product } from "../types/product"
import { useCart } from "../store/cart"

const { product } = defineProps<{
  product: Product
}>()

const { addToCart } = useCart()

const handleImgError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.src = 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&fit=crop'
}
</script>

<template>
  <div class="product-card">

    <!-- Category Badge -->
    <div class="card-image-wrapper">
      <span class="category-badge">{{ product.category }}</span>
     <img 
  :src="product.thumbnail" 
  class="card-image"
  @error="handleImgError"
/>
    </div>

    <!-- Info -->
    <div class="card-body">
      <h2 class="card-title">{{ product.title }}</h2>

      <div class="card-footer">
        <span class="card-price">${{ product.price }}</span>
        <button @click="addToCart(product)" class="add-btn">
          🛒 Add
        </button>
      </div>
    </div>

  </div>
</template>

<style scoped>
.product-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.09);
}

.card-image-wrapper {
  position: relative;
}

.category-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #27ae60;
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  text-transform: capitalize;
  z-index: 1;
}

.card-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}

.card-body {
  padding: 14px 16px 16px;
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 12px;
  line-height: 1.4;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-price {
  font-size: 17px;
  font-weight: 700;
  color: #27ae60;
}

.add-btn {
  background: #27ae60;
  color: white;
  border: none;
  padding: 8px 18px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.add-btn:hover {
  background: #219a52;
}
</style>

