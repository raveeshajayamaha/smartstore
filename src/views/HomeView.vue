<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import api from "../services/api"
import ProductCard from "../components/ProductCard.vue";
import type { Product } from "../types/product"
import { useCart } from "../store/cart"

const { cart, removeFromCart, increaseQty, decreaseQty, total } = useCart()

const products = ref<Product[]>([])
const search = ref("")
const category = ref("")


onMounted(async () => {
  const res = await api.get("/products")
  products.value = res.data.products
})

const filteredProducts = computed(() => {
  return products.value.filter(p =>
    (
      p.title.toLowerCase().includes(search.value.toLowerCase()) ||
      p.category.toLowerCase().includes(search.value.toLowerCase())
    ) &&
    (category.value === "" || p.category === category.value)
  )
})

const categories = computed(() => {
  return [...new Set(products.value.map(p => p.category))]
}) 
</script>

<template>
  <div class="p-6">
    
    <h1 class="text-3xl font-bold mb-6">🛍️ SmartStore</h1>

    <!-- 🔍 Search -->
    <input
      v-model="search"
      placeholder="Search products..."
      class="border p-3 mb-4 w-full rounded-lg"
    />

    <!-- 🎯 Filter -->
    <select v-model="category" class="border p-3 mb-6 rounded-lg">
      <option value="">All</option>

      <option 
        v-for="cat in categories" 
        :key="cat" 
        :value="cat"
      >
        {{ cat.charAt(0).toUpperCase() + cat.slice(1) }}
      </option>
    </select>

    <!-- 🛒 Products -->
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard
        v-for="p in filteredProducts"
        :key="p.id"
        :product="p"
      />
    </div>
    <!-- 🛒 CART SECTION -->
<<div id="cart-section" class="mt-10 p-4 border rounded-lg bg-gray-100">
  <h2 class="text-2xl font-bold mb-4">🛒 Cart</h2>

  <div v-if="cart.length === 0">
    Cart is empty
  </div>

  <div
    v-for="item in cart"
    :key="item.id"
    class="flex justify-between items-center mb-2 border p-2 rounded"
  >
    <div>
      {{ item.title }} - ${{ item.price }}

      <div class="flex items-center mt-1">
        
        <!-- ➖ decrease -->
        <button
          @click="decreaseQty(item.id)"
          class="px-2 bg-gray-300"
        >
          -
        </button>

        <!-- quantity -->
        <span class="mx-2">{{ item.quantity }}</span>

        <!-- ➕ increase -->
        <button
          @click="increaseQty(item.id)"
          class="px-2 bg-gray-300"
        >
          +
        </button>

      </div>
    </div>

    <!-- ❌ remove -->
    <button
      @click="removeFromCart(item.id)"
      class="bg-red-500 text-white px-2 py-1 rounded"
    >
      Remove
    </button>
  </div>

  <div v-if="cart.length > 0" class="mt-4 font-bold">
    Total: ${{ total }}
  </div>
</div>

  </div>
</template>