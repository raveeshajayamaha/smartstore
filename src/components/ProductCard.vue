<script setup lang="ts">
import type { Product } from "../types/product"
import { useCart } from "../store/cart"


const { product } = defineProps<{
  product: Product
}>()


const { addToCart } = useCart()

const buyNow = () => {
  addToCart(product)
}
</script>

<template>
  <div class="border rounded p-4">
    <img :src="product.thumbnail" class="w-full h-40 object-cover" />

    <h2 class="font-bold mt-2">
      {{ product.title }}
    </h2>

    <p class="text-green-600">
      ${{ product.price }}
    </p>
    
<div class="mt-2 text-blue-600 text-sm font-medium cursor-pointer hover:underline">
  View
</div>

    <button
  @click="addToCart(product)"
  class="bg-green-500 text-white px-3 py-1 mt-2 rounded"
>
  Add to Cart
</button>

<button @click="buyNow">
  ⚡ Buy Now
</button>

  </div>
</template>