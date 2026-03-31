<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import api from "../services/api"
import ProductCard from "../components/ProductCard.vue";
import type { Product } from "../types/product"

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

  </div>
</template>