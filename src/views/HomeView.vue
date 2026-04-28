
<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import api from "../services/api"
import ProductCard from "../components/ProductCard.vue"
import ProductModal from "../components/ProductModal.vue"
import type { Product } from "../types/product"
import { useCart } from "../store/cart"
import { search } from "../store/search"

const { cart, removeFromCart, increaseQty, decreaseQty, total } = useCart()

const products = ref<Product[]>([])
const category = ref("")
const selectedProduct = ref<Product | null>(null)


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

const categoryIcons: Record<string, string> = {
  cinnamon: "🌿",
  cardamom: "🍃",
  herbal: "🌱",
  detox: "✨",
}

const categoryColors: Record<string, string> = {
  cinnamon: "#FFF3E8",
  cardamom: "#E8F5EE",
  herbal: "#E8F5EE",
  detox: "#EEF0FB",
}

onMounted(async () => {
  await api.get("/products?limit=1")

products.value = [
    { id: 1,  title: "Cinnamon Spice Tea",    price: 18.99, category: "cinnamon", thumbnail: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&fit=crop" },
    { id: 2,  title: "Cardamom Green Tea",    price: 22.99, category: "cardamom", thumbnail: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=400&fit=crop" },
    { id: 3,  title: "Ginger Root Tea",       price: 16.99, category: "herbal",   thumbnail: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&fit=crop" },
    { id: 4,  title: "Mixed Herbal Blend",    price: 19.99, category: "herbal",   thumbnail: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&fit=crop" },
    { id: 5,  title: "Detox Herbal Tea",      price: 24.99, category: "detox",    thumbnail: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=400&fit=crop" },
    { id: 6, title: "Turmeric Wellness Tea", price: 21.99, category: "herbal", thumbnail: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&fit=crop" },
    { id: 7,  title: "Chai Masala Tea",       price: 20.99, category: "cinnamon", thumbnail: "https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?w=400" },
    { id: 8,  title: "Mint & Lemon Detox",    price: 17.99, category: "detox",    thumbnail: "https://images.unsplash.com/photo-1523920290228-4f321a939b4c?w=400&fit=crop" },
    { id: 9,  title: "Cardamom Rose Tea",     price: 23.99, category: "cardamom", thumbnail: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=400&fit=crop" },
    { id: 10, title: "Peppermint Detox",      price: 15.99, category: "detox",    thumbnail: "https://images.pexels.com/photos/906150/pexels-photo-906150.jpeg?auto=compress&w=400" },
] as Product[]
})
</script>

<template>
  <div>

   
    <section class="hero">
      <div class="hero-content">
        <span class="hero-badge">🌿 Premium Herbal Collection</span>
        <h1 class="hero-title">Pure Herbal Tea<br />Experience</h1>
        <p class="hero-sub">
          Discover the finest selection of organic herbal and spice-based teas.<br />
          Handcrafted blends for your wellness and delight.
        </p>
        <a href="#shop-section" class="hero-btn">Shop Now</a>
      </div>
    </section>

    <!-- ===== SHOP BY CATEGORY ===== -->
    <section class="category-section">
      <h2 class="section-title">Shop by Category</h2>
      <p class="section-sub">Explore our carefully curated collection of herbal and spice teas</p>

      <div class="category-grid">
        <div
          v-for="cat in categories"
          :key="cat"
          class="category-card"
          :style="{ background: categoryColors[cat.toLowerCase()] || '#F0F4F0' }"
          @click="category = cat"
        >
          <span class="category-icon">{{ categoryIcons[cat.toLowerCase()] || '🍵' }}</span>
          <span class="category-name">{{ cat.charAt(0).toUpperCase() + cat.slice(1) }}</span>
        </div>
      </div>
    </section>

    <!-- ===== PRODUCTS SECTION ===== -->
    <section id="shop-section" class="shop-section">

      <!-- Filter bar -->
      <div class="filter-bar">
        <select v-model="category" class="filter-select">
          <option value="">All Categories</option>
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat.charAt(0).toUpperCase() + cat.slice(1) }}
          </option>
        </select>
      </div>

   <div class="product-grid">
  <ProductCard
    v-for="p in filteredProducts"
    :key="p.id"
    :product="p"
    @view="selectedProduct = p"
  />
</div>

<!-- Modal -->
<ProductModal
  :product="selectedProduct"
  @close="selectedProduct = null"
/>
    </section>

    <!-- ===== CART SECTION ===== -->
    <section id="cart-section" class="cart-section">
      <h2 class="cart-title">🛒 Your Cart</h2>

      <div v-if="cart.length === 0" class="cart-empty">
        Your cart is empty
      </div>

      <div
        v-for="item in cart"
        :key="item.id"
        class="cart-item"
      >
        <div class="cart-item-info">
          <span class="cart-item-name">{{ item.title }}</span>
          <span class="cart-item-price">${{ item.price }}</span>
        </div>

        <div class="cart-item-controls">
          <button @click="decreaseQty(item.id)" class="qty-btn">-</button>
          <span class="qty-value">{{ item.quantity }}</span>
          <button @click="increaseQty(item.id)" class="qty-btn">+</button>
          <button @click="removeFromCart(item.id)" class="remove-btn">Remove</button>
        </div>
      </div>

      <div v-if="cart.length > 0" class="cart-total">
        Total: ${{ total }}
      </div>
    </section>

  </div>
</template>

<style scoped>

/* ===== HERO ===== */
.hero {
  background: linear-gradient(135deg, #2ecc71, #1a8a4a);
  min-height: 420px;
  display: flex;
  align-items: center;
  padding: 60px 48px;
}

.hero-content {
  max-width: 560px;
}

.hero-badge {
  display: inline-block;
  background: rgba(255,255,255,0.2);
  color: white;
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 13px;
  margin-bottom: 20px;
}

.hero-title {
  font-size: 52px;
  font-weight: 700;
  color: white;
  line-height: 1.15;
  margin-bottom: 16px;
  font-family: Georgia, serif;
}

.hero-sub {
  color: rgba(255,255,255,0.88);
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 32px;
}

.hero-btn {
  display: inline-block;
  background: white;
  color: #1a5c38;
  padding: 14px 32px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 15px;
  text-decoration: none;
  transition: background 0.2s;
}

.hero-btn:hover {
  background: #f0faf4;
}

/* ===== CATEGORY SECTION ===== */
.category-section {
  background: linear-gradient(180deg, #f0faf4, #ffffff);
  padding: 56px 48px;
  text-align: center;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 8px;
  font-family: Georgia, serif;
}

.section-sub {
  color: #6b7280;
  font-size: 15px;
  margin-bottom: 36px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.category-card {
  border-radius: 16px;
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
}

.category-icon {
  font-size: 32px;
}

.category-name {
  font-weight: 600;
  font-size: 15px;
  color: #1a1a2e;
}

/* ===== SHOP SECTION ===== */
.shop-section {
  padding: 40px 48px;
  background: #ffffff;
}

.filter-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 28px;
}

.filter-select {
  padding: 10px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  color: #374151;
  background: white;
  outline: none;
  cursor: pointer;
}

.filter-select:focus {
  border-color: #27ae60;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

/* ===== CART SECTION ===== */
.cart-section {
  margin: 40px 48px;
  padding: 28px;
  background: #f9fafb;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
}

.cart-title {
  font-size: 22px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 20px;
}

.cart-empty {
  color: #9ca3af;
  font-size: 15px;
  text-align: center;
  padding: 24px 0;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid #e5e7eb;
}

.cart-item-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cart-item-name {
  font-size: 15px;
  font-weight: 500;
  color: #1a1a2e;
}

.cart-item-price {
  font-size: 14px;
  color: #27ae60;
  font-weight: 600;
}

.cart-item-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.qty-btn {
  width: 30px;
  height: 30px;
  background: #e5e7eb;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  font-weight: 600;
}

.qty-btn:hover {
  background: #d1d5db;
}

.qty-value {
  font-size: 15px;
  font-weight: 600;
  min-width: 20px;
  text-align: center;
}

.remove-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  margin-left: 8px;
}

.remove-btn:hover {
  background: #dc2626;
}

.cart-total {
  margin-top: 20px;
  font-size: 18px;
  font-weight: 700;
  color: #1a1a2e;
  text-align: right;
}

@media (max-width: 768px) {
  .hero { padding: 40px 20px; }
  .hero-title { font-size: 36px; }
  .category-grid { grid-template-columns: repeat(2, 1fr); }
  .product-grid { grid-template-columns: repeat(2, 1fr); }
  .shop-section, .cart-section { padding: 20px; margin: 20px; }
}
</style>