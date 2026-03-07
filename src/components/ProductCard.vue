<script setup lang="ts">
import type { Product } from "../types/product"

defineProps<{
  product: Product
}>()
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

    <router-link
      :to="'/product/' + product.id"
      class="text-blue-500"
    >
      View
    </router-link>
  </div>
</template>