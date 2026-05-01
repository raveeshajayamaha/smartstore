<script setup lang="ts">
import type { Product } from "../types/product"
import { useCart } from "../store/cart"
import { showToast } from "../store/toast"

const { product } = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  (e: 'view', product: Product): void
}>()

const { addToCart } = useCart()

const handleImgError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.src = 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&fit=crop'
}

const handleAddToCart = () => {
  addToCart(product)
  showToast(`${product.title} added to cart!`)
}
</script>

<template>
  <div class="product-card">
    <div class="card-image-wrapper">
      <span class="category-badge">{{ product.category }}</span>
      <img
        :src="product.thumbnail"
        class="card-image"
        @error="handleImgError"
      />
    </div>

    <div class="card-body">
      <h2 class="card-title">{{ product.title }}</h2>
      <div class="card-footer">
        <span class="card-price">${{ product.price }}</span>
        <div class="card-actions">
          <button @click="emit('view', product)" class="view-btn">👁 View</button>
          <button @click="handleAddToCart" class="add-btn">🛒 Add</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

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

.card-actions {
  display: flex;
  gap: 8px;
}

.view-btn {
  background: white ;
  color: #27ae60;
  border: 1.5px solid #27ae60 ;
  padding: 8px 16px ;
  border-radius: 999px ;
  font-size: 13px ;
  font-weight: 600 ;
  cursor: pointer;
  transition: all 0.2s;
  width: auto ;
  height: auto ;
  display: inline-block ;
}

.view-btn:hover {
  background: #f0faf4;
}

.add-btn {
  background: #27ae60;
  color: white;
  border: none ;
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  width: auto;
  height: auto;
  display: inline-block;
}

.add-btn:hover {
  background: #219a52;
}

/* ===== DARK MODE ===== */
.dark .product-card {
  background: #1f2937;
  border-color: #374151;
}

.dark .card-title {
  color: #f9fafb ;
}

.dark .view-btn {
  background: #1f2937;
  color: #27ae60 ;
}

.dark .card-price {
  color: #4ade80;
}

/* ===== MOBILE ===== */
@media (max-width: 768px) {
  .card-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .card-actions {
    display: flex;
    gap: 6px;
    width: 100%;
  }

  .view-btn {
    padding: 8px 16px ;
    font-size: 12px;
    flex: 1;
    text-align: center;
  }

  .add-btn {
    padding: 8px 16px ;
    font-size: 12px;
    flex: 1;
    text-align: center;
  }

  .card-title {
    font-size: 13px;
  }

  .card-price {
    font-size: 14px;
  }
}
</style>


