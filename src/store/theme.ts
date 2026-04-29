import { ref } from "vue"

export const isDark = ref(false)

export const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add("dark")
    localStorage.setItem("theme", "dark")
  } else {
    document.documentElement.classList.remove("dark")
    localStorage.setItem("theme", "light")
  }
}

export const initTheme = () => {
  const saved = localStorage.getItem("theme")
  if (saved === "dark") {
    isDark.value = true
    document.documentElement.classList.add("dark")
  }
}