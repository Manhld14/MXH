<template>
    <div class="register-page d-flex align-items-center min-vh-100">
        <div class="container">
            <div class="row justify-content-center">
                <!-- left promotional column -->
                <div class="col-lg-6 d-none d-lg-flex align-items-center">
                    <div class="promo text-primary">
                        <h1 class="display-4 fw-bold">Kết nối với bạn bè và thế giới xung quanh bạn.</h1>
                        <p class="lead mt-3 text-black fw-normal " >Xem ảnh và cập nhật từ bạn bè. Chia sẻ những điều mới trong cuộc sống.</p>
                        <div class="mock-phone mt-4">
                            <div class="phone-screen"></div>
                        </div>
                    </div>
                </div>

                <!-- right sign-up card -->
                <div class="col-lg-5 col-md-8">
                    <div class="card shadow-sm">
                        <div class="card-body p-4">
                            <div class="d-flex align-items-center mb-3">
                                <div
                                    class="logo bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3">
                                    <span class="fs-4 fw-bold">f</span>
                                </div>
                                <div>
                                    <h4 class="mb-0">Tạo tài khoản mới</h4>
                                    <small class="text-muted">Nhanh chóng và dễ dàng.</small>
                                </div>
                            </div>

                            <div v-if="message.text"
                                :class="['alert mt-2', message.type === 'error' ? 'alert-danger' : 'alert-success']"
                                role="alert">
                                {{ message.text }}
                            </div>

                            <form @submit.prevent="submit">
                                <div class="row g-2">
                                    <div class="col-md-6">
                                        <input v-model.trim="form.lastName" type="text" class="form-control"
                                            placeholder="Họ" />
                                    </div>
                                    <div class="col-md-6">
                                        <input v-model.trim="form.firstName" type="text" class="form-control"
                                            placeholder="Tên" />
                                    </div>
                                </div>

                                <div class="mt-2">
                                    <input v-model.trim="form.email" type="email" class="form-control"
                                        placeholder="Số điện thoại hoặc email" />
                                </div>

                                <div class="mt-2">
                                    <div class="input-group">
                                        <input :type="showPassword ? 'text' : 'password'" v-model="form.password"
                                            class="form-control" placeholder="Mật khẩu mới" />
                                        <button class="btn btn-outline-secondary" type="button"
                                            @click="showPassword = !showPassword">{{ showPassword ? 'Ẩn' : 'Hiện'
                                            }}</button>
                                    </div>
                                    <div class="form-text small mt-1">Sử dụng ít nhất 6 ký tự.</div>
                                </div>

                                <label class="form-label mt-3 mb-1">Ngày sinh</label>
                                <div class="d-flex gap-2">
                                    <select class="form-select" v-model.number="form.birthDay">
                                        <option :value="0" disabled>Ngày</option>
                                        <option v-for="d in daysInMonth" :key="d" :value="d">{{ d }}</option>
                                    </select>

                                    <select class="form-select" v-model.number="form.birthMonth">
                                        <option :value="0" disabled>Tháng</option>
                                        <option v-for="(m, idx) in months" :key="m" :value="idx + 1">{{ m }}</option>
                                    </select>

                                    <select class="form-select" v-model.number="form.birthYear">
                                        <option :value="0" disabled>Năm</option>
                                        <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
                                    </select>
                                </div>

                                <label class="form-label mt-3 mb-1">Giới tính</label>
                                <div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="female" value="Nữ"
                                            v-model="form.gender" />
                                        <label class="form-check-label" for="female">Nữ</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="male" value="Nam"
                                            v-model="form.gender" />
                                        <label class="form-check-label" for="male">Nam</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" id="custom" value="Tùy chỉnh"
                                            v-model="form.gender" />
                                        <label class="form-check-label" for="custom">Tùy chỉnh</label>
                                    </div>
                                </div>

                                <div class="form-text mt-3 small text-muted">Bằng cách nhấn Đăng ký, bạn đồng ý với Điều
                                    khoản, Chính sách dữ liệu và Chính sách cookie của chúng tôi. Bạn có thể nhận thông
                                    báo SMS và có thể hủy nhận bất kỳ lúc nào.</div>
                                <div class="d-grid mt-3">
                                    <button :disabled="loading" class="btn btn-success btn-lg" 
                                        type="submit">Đăng ký
                                    </button>
                                </div>

                            </form>

                            <hr />
                            <div class="text-center small">Đã có tài khoản? <router-link :to="{ name: 'login' }">Đăng
                                    nhập</router-link></div>
                        </div>
                    </div>

                    <div class="text-center mt-3 small text-muted">Tạo Trang cho người nổi tiếng, ban nhạc hoặc doanh
                        nghiệp.</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, reactive, ref, computed } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import api from '@/Services/api';
import router from '@/router';

export default defineComponent({
    name: 'RegisterVue',
    setup() {
        const form = reactive({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            birthDay: 0,
            birthMonth: 0,
            birthYear: 0,
            gender: '',
        })

        const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']

        const currentYear = new Date().getFullYear()
        const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

        const daysInMonth = computed(() => {
            const y = form.birthYear || currentYear
            const m = form.birthMonth || 1
            return Array.from({ length: new Date(y, m, 0).getDate() }, (_, i) => i + 1)
        })

        const showPassword = ref(false)
        const loading = ref(false)
        const message = reactive({ text: '', type: '' })

        function validate() {
            if (!form.firstName || !form.lastName) {
                return 'Vui lòng nhập họ và tên.'
            }
            if (!form.email) return 'Vui lòng nhập số điện thoại hoặc email.'
            if (!/\S+@\S+\.\S+/.test(form.email) && !/^\d{6,}$/.test(form.email)) {
                return 'Vui lòng nhập email hoặc số điện thoại hợp lệ.'
            }
            if (!form.password || form.password.length < 6) return 'Mật khẩu phải có ít nhất 6 ký tự.'
            if (!form.birthDay || !form.birthMonth || !form.birthYear) return 'Vui lòng chọn ngày sinh.'
            if (!form.gender) return 'Vui lòng chọn giới tính.'
            return ''
        }


        async function submit() {
            message.text = ''
            const err = validate()
            if (err) {
                message.text = err
                message.type = 'error'
                return
            }
            loading.value = true
            //Gọi API
            try {
                const response = await api.post('/Users', {
                    fullName: `${form.lastName} ${form.firstName}`,
                    email: form.email,
                    passwordHash: form.password,
                    sex: form.gender,
                    birthday: `${form.birthYear}-${String(form.birthMonth).padStart(2, '0')}-${String(form.birthDay).padStart(2, '0')}`,
                    createdAt: new Date().toISOString()

                })
                console.log('Đăng ký thành công:', response.data)
                router.push({ name: 'login' })


            } catch (error) {
                console.error('Lỗi khi đăng ký:', error)
                if (error.response && error.response.data) {
                    console.error('Phản hồi lỗi chi tiết từ Server:', error.response.data);
                }
            }
        }

        return {
            form,
            months,
            daysInMonth,
            showPassword,
            loading,
            message,
            submit,
            years

        }
    }
})
</script>

<style scoped>
.register-page {
    background: linear-gradient(180deg, #e9ebee 0%, #f0f2f5 100%);
    padding: 40px 0;
}

.promo .mock-phone {
    width: 280px;
    height: 180px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
}

.logo {
    width: 48px;
    height: 48px;
    font-size: 1.25rem;
}

@media (max-width: 767.98px) {
    .promo {
        display: none;
    }
}
</style>