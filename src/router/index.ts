import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CartView from "../views/CartView.vue"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    
    path: "/cart",
   name: "cart",
   component: CartView
}
  
  // You can add more routes here later (e.g., /product/:id)
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// THIS IS THE MISSING LINE:
export default router