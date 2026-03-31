<script setup lang="ts">
import { useCart } from "../store/cart"

const { cart, removeFromCart, total } = useCart()
</script>

<template>
  <h1 class="text-2xl font-bold mb-4">Cart</h1>

  <div v-if="cart.length === 0">Cart is empty</div>

  <div v-for="item in cart" :key="item.id" class="border p-2 mb-2">
    <div>
    {{ item.title }} - ${{ item.price }}
  </div>

   <button
      @click="removeFromCart(item.id)"
      class="bg-red-500 text-white px-2 py-1 rounded"
    >
      Remove
    </button>
  </div>

  <div v-if="cart.length > 0" class="mt-4 font-bold text-lg">
    Total: ${{ total }}
    </div>
</template>