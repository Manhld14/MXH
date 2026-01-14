<template>
    <div class="login-page d-flex align-items-center justify-content-center">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-10">
                    <div class="d-flex flex-column flex-lg-row align-items-stretch gap-4">
                        <!-- Promo (hidden on small screens) -->
                        <div class="promo d-none d-lg-flex p-5 flex-column justify-content-center">
                            <h1 class="brand mb-3 text-primary" style="font-size: 70px">My Website</h1>
                            <p class="lead text-dark fw-bold">
                                Kết nối với bạn bè và thế giới xung quanh bạn. Chia sẻ khoảnh khắc, hình ảnh và suy
                                nghĩ.
                            </p>
                        </div>

                        <!-- Login card -->
                        <div class="card login-card p-4 d-flex flex-column justify-content-center">
                            <form @submit.prevent="onSubmit" class="mb-3">
                                

                                <div class="mb-3">
                                    <input v-model="email" type="email" class="form-control form-control-lg"
                                        placeholder="Email hoặc số điện thoại" required />
                                </div>
                                <div class="mb-3">
                                    <input v-model="password" type="password" class="form-control form-control-lg"
                                        placeholder="Mật khẩu" required />
                                </div>
                                <div v-if="message.text" :class="message.type" class="text-danger">
                                    {{ message.text }}
                                </div>

                                <button type="submit" class="btn btn-success btn-lg w-100">
                                    Đăng nhập
                                </button>

                            </form>

                            <div class="text-center">
                                <a href="#" class="small text-decoration-none">Quên mật khẩu?</a>
                                <div class="my-3">
                                    <hr />
                                </div>
                                <router-link :to="{ name: 'register' }" class="btn btn-success btn-lg">
                                    Tạo tài khoản mới
                                </router-link>
                            </div>
                        </div>
                    </div>

                    <!-- Mobile header (visible on small screens) -->
                    <div class="text-center mt-4 d-lg-none">
                        <h2 class="mb-1" style="color: #1877f2; font-weight: 700">Facebook</h2>
                        <p class="small text-muted">Kết nối với bạn bè và thế giới xung quanh bạn.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import router from "@/router";
import api from "@/Services/api";
import { ref, reactive,  } from "vue";
import { useUserStore } from "@/stores/userStore";

const email = ref("");
const password = ref("");
const message = reactive({
    text: "",
    type: "" // "error" | "success"
})

async function onSubmit() {
    // Xử lý đăng nhập (ví dụ: gọi API)
    try {
        const userStore = useUserStore();
        const login = await api.post("/Users/login", {
            email: email.value,
            passwordHash: password.value,
        });
        userStore.setUser(login.data.user);

        // Chuyển hướng hoặc lưu trạng thái đăng nhập
        router.push({ name: "home"});
    } catch (error) {
        if (error.response) {
            message.text = error.response.data.message || "Lỗi từ server!"
            message.type = "error"
            return
        }

        // Trường hợp lỗi không có response (mất mạng, server chết)
        message.text = "Không thể kết nối đến server!"
        message.type = "error"
        console.error("Lỗi đăng nhập:", error);
        console.log(error.response.data);
    }
}
</script>

<style scoped>
.login-page {
    min-height: 100vh;
    background: #f0f2f5;
    padding: 40px 0;
}

/* Promo panel */
.promo {
    flex: 1 1 60%;
    border-radius: 8px;
    min-width: 0;
}

.brand {
    font-size: 48px;
    font-weight: 700;
    font-family: "Helvetica Neue", Arial, sans-serif;
    letter-spacing: -1px;
}

/* Login card */
.login-card {
    flex: 0 0 360px;
    max-width: 360px;
    border-radius: 10px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}

/* Buttons */
.btn-primary {
    background-color: #1877f2;
    border-color: #1877f2;
}

.btn-primary:hover {
    background-color: #165ecc;
    border-color: #165ecc;
}

/* Responsive tweaks */
@media (max-width: 991.98px) {
    .promo {
        display: none !important;
    }

    .login-card {
        max-width: 540px;
        width: 100%;
    }
}
</style>
