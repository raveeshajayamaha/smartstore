import { ref } from "vue"

export const isLoggedIn = ref(false)
export const username = ref("")
export const token = ref("")

export const login = async (user: string, pass: string): Promise<boolean> => {
  try {
    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user, password: pass })
    })
    const data = await res.json()
    if (data.token) {
      token.value = data.token
      username.value = data.username
      isLoggedIn.value = true
      localStorage.setItem("token", data.token)
      localStorage.setItem("username", data.username)
      return true
    }
    return false
  } catch {
    return false
  }
}

export const logout = () => {
  token.value = ""
  username.value = ""
  isLoggedIn.value = false
  localStorage.removeItem("token")
  localStorage.removeItem("username")
}

export const initAuth = () => {
  const savedToken = localStorage.getItem("token")
  const savedUsername = localStorage.getItem("username")
  if (savedToken && savedUsername) {
    token.value = savedToken
    username.value = savedUsername
    isLoggedIn.value = true
  }
}