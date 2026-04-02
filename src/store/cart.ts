import { ref, computed } from "vue"
import type { Product } from "../types/product"

type CartItem = Product & {
  quantity: number
}

const cart = ref<CartItem[]>([])

export function useCart() {

  const addToCart = (product: Product) => {
    const existing = cart.value.find(item => item.id === product.id)

    if (existing) {
      existing.quantity++
    } else {
      cart.value.push({ ...product, quantity: 1 })
    }
  }

  const increaseQty = (id: number) => {
    const item = cart.value.find(p => p.id === id)
    if (item) item.quantity++
  }

  const decreaseQty = (id: number) => {
    const item = cart.value.find(p => p.id === id)

    if (item) {
      item.quantity--
      if (item.quantity <= 0) {
        cart.value = cart.value.filter(p => p.id !== id)
      }
    }
  }

  const removeFromCart = (id: number) => {
    cart.value = cart.value.filter(item => item.id !== id)
  }

  const total = computed(() => {
    return cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  })

  return {
    cart,
    addToCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    total
  }
}