<template>
  <nav class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 flex justify-between items-center shadow-lg">
    
    <!-- Logo / Title -->
    <h1 class="font-extrabold text-2xl tracking-wide">
      🛍️ SmartStore
    </h1>

    <!-- Links -->
    <div class="space-x-6 text-lg">
      <router-link 
        to="/" 
        class="hover:text-yellow-300 transition duration-300"
      >
        Home
      </router-link>

     <a 
  href="#cart-section" 
  class="hover:text-yellow-300 transition duration-300 cursor-pointer"
>
  Cart 🛒
</a>
    </div>

  </nav>
</template>