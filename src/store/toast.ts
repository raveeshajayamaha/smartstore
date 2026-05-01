import { ref } from "vue"

export const toastMessage = ref("")
export const toastVisible = ref(false)

export const showToast = (message: string) => {
  toastMessage.value = message
  toastVisible.value = true
  setTimeout(() => {
    toastVisible.value = false
  }, 2500)
}