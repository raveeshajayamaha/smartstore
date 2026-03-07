<script setup lang="ts">
import { ref, onMounted } from "vue"
import api from "../services/api"
import ProductCard from "../components/ProductCard.vue";
import type { Product } from "../types/product"

const products = ref<Product[]>([]);

onMounted(async () => {
  const res = await api.get("/products")
  products.value = res.data.products
})
</script>

<template>
 <div> <h1 class="text-3xl font-bold mb-6">SmartStore</h1>

  <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <ProductCard
      v-for="p in products"
      :key="p.id"
      :product="p"
    />
  </div>
</div>
</template>