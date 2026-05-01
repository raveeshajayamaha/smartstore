<script setup lang="ts">
import type { Product } from "../types/product"
import { useCart } from "../store/cart"
import { showToast } from "../store/toast"

defineProps<{
  product: Product | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { addToCart } = useCart()

const handleImgError = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.src = 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&fit=crop'
}
</script>

<template>
  <div v-if="product" class="modal-overlay" @click.self="emit('close')">
    <div class="modal-box">

   
      <button class="close-btn" @click="emit('close')">✕</button>

      <img
        :src="product.thumbnail"
        class="modal-image"
        @error="handleImgError"
      />

      <div class="modal-content">
        <span class="modal-badge">{{ product.category }}</span>
        <h2 class="modal-title">{{ product.title }}</h2>
        <p class="modal-desc">
          A premium blend crafted from the finest organic ingredients.
          This {{ product.category }} tea is perfect for your daily wellness routine,
          offering a rich aroma and smooth taste with every sip.
        </p>

        <div class="modal-footer">
          <span class="modal-price">${{ product.price }}</span>
         <button 
             @click="() => { addToCart(product!); showToast(product!.title + ' added to cart!'); emit('close') }" 
             class="modal-add-btn"
>
              🛒 Add to Cart
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-box {
  background: white;
  border-radius: 20px;
  width: 480px;
  max-width: 90vw;
  overflow: hidden;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 16px;
  background: rgba(0,0,0,0.3);
  color: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 14px;
  cursor: pointer;
  z-index: 10;
}

.close-btn:hover {
  background: rgba(0,0,0,0.5);
}

.modal-image {
  width: 100%;
  height: 240px;
  object-fit: cover;
}

.modal-content {
  padding: 24px;
}

.modal-badge {
  display: inline-block;
  background: #e8f5ee;
  color: #27ae60;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 999px;
  text-transform: capitalize;
  margin-bottom: 12px;
}

.modal-title {
  font-size: 22px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 12px;
}

.modal-desc {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.7;
  margin-bottom: 24px;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-price {
  font-size: 24px;
  font-weight: 700;
  color: #27ae60;
}

.modal-add-btn {
  background: #27ae60;
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.modal-add-btn:hover {
  background: #219a52;
}
</style>