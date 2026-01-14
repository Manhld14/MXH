import { defineStore } from 'pinia'

export const useUserStore = defineStore("user", {
  // State: dữ liệu toàn cục
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null
  }),

  // Actions: hàm để thay đổi state
  actions: {
    setUser(user) {
      this.user = user
      localStorage.setItem("user", JSON.stringify(user))
    },
    logout() {
      this.user = null
      localStorage.removeItem("user")
    }
  },

  // Getters: các thuộc tính tính toán từ state (tuỳ chọn)
  getters: {
    isLoggedIn: (state) => !!state.user
  }
})
    