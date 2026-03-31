import { ref, computed } from "vue"
import type { Product } from "../types/product"

const cart = ref<Product[]>([])

export function useCart() {
  const addToCart = (product: Product) => {
    cart.value.push(product)
  }

  const removeFromCart = (id: number) => {
    cart.value = cart.value.filter(item => item.id !== id)
  }

  const total = computed(() => {
    return cart.value.reduce((sum, item) => sum + item.price, 0)
  })

  return {
    cart,
    addToCart,
    removeFromCart,
    total
  }
}