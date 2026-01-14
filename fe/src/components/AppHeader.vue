<template>
    <header class="sticky-top bg-white border-bottom shadow-sm ">

        <div class="container-fluid d-flex align-items-center py-2 row">
            <!-- LEFT: logo + search (grouped left) -->
            <div class="d-flex align-items-center start-0 col-3" style="min-width:260px; gap:0.75rem">
                <router-link to="/Home" class="d-flex align-items-center text-decoration-none me-1">
                    <img src="/public/503423082_122103532184892645_5120599699345861223_n.jpg" alt="logo"
                        class="me-2 rounded-circle" style="height:50px; width:50px; object-fit:cover" />
                </router-link>

                <form class="d-none d-sm-block">
                    <input class="form-control form-control-sm rounded-pill" style="width:260px" placeholder="Tìm kiếm"
                        v-model="query" @keyup.enter.prevent="onSearch" />
                </form>
            </div>

            <!-- CENTER: main nav icons (visible md+) -->
            <div class="d-none d-md-flex align-items-center justify-content-center flex-grow-1 fb-center-nav col-6">
                <button class="btn btn-link nav-icon" :class="{ 'active': isActive('/Home') }" @click="go('/Home')"
                    title="Trang chủ"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"
                        class="me-2 menu-icon_top" width="24" height="24">
                        <path
                            d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z" />
                    </svg></button>
                <button class="btn btn-link nav-icon" :class="{ 'active': isActive('/friends') }"
                    @click="go('/friends')" title="Bạn bè"><svg data-v-f72b96ce="" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" class="x14rh7hd x1lliihq x1tzjh5l x1k90msu x2h7rmj x1qfuztq me-2 menu-icon" style="--x-color: var(--secondary-icon);"><path data-v-f72b96ce="" d="M12.496 5a4 4 0 1 1 8 0 4 4 0 0 1-8 0zm4-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-9 2.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm-2 4a2 2 0 1 1 4 0 2 2 0 0 1-4 0zM5.5 15a5 5 0 0 0-5 5 3 3 0 0 0 3 3h8.006a3 3 0 0 0 3-3 5 5 0 0 0-5-5H5.5zm-3 5a3 3 0 0 1 3-3h4.006a3 3 0 0 1 3 3 1 1 0 0 1-1 1H3.5a1 1 0 0 1-1-1zm12-9.5a5.04 5.04 0 0 0-.37.014 1 1 0 0 0 .146 1.994c.074-.005.149-.008.224-.008h4.006a3 3 0 0 1 3 3 1 1 0 0 1-1 1h-3.398a1 1 0 1 0 0 2h3.398a3 3 0 0 0 3-3 5 5 0 0 0-5-5H14.5z"></path></svg></button>
                <button class="btn btn-link nav-icon" :class="{ 'active': isActive('/watch') }" @click="go('/watch')"
                    title="Watch"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 640 640"
                        class="me-2 menu-icon_top ">
                        <path
                            d="M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64zM216 176L160 176C151.2 176 144 183.2 144 192L144 240L496 240L496 192C496 183.2 488.8 176 480 176L216 176zM144 288L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 288L144 288z" />
                    </svg></button>
                <button class="btn btn-link nav-icon" :class="{ 'active': isActive('/marketplace') }"
                    @click="go('/marketplace')" title="Marketplace"><svg class="me-2 menu-icon_top"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="24" height="24">
                        <path
                            d="M160 144C151.2 144 144 151.2 144 160L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 237.3C496 233.1 494.3 229 491.3 226L416 150.6L416 240C416 257.7 401.7 272 384 272L224 272C206.3 272 192 257.7 192 240L192 144L160 144zM240 144L240 224L368 224L368 144L240 144zM96 160C96 124.7 124.7 96 160 96L402.7 96C419.7 96 436 102.7 448 114.7L525.3 192C537.3 204 544 220.3 544 237.3L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 160zM256 384C256 348.7 284.7 320 320 320C355.3 320 384 348.7 384 384C384 419.3 355.3 448 320 448C284.7 448 256 419.3 256 384z" />
                    </svg></button>
                <button class="btn btn-link nav-icon" :class="{ 'active': isActive('/groups') }" @click="go('/groups')"
                    title="Nhóm"><svg data-v-f72b96ce="" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" class="x14rh7hd x1lliihq x1tzjh5l x1k90msu x2h7rmj x1qfuztq me-2 menu-icon" style="--x-color: var(--secondary-icon);"><path data-v-f72b96ce="" d="M.5 12c0 6.351 5.149 11.5 11.5 11.5S23.5 18.351 23.5 12 18.351.5 12 .5.5 5.649.5 12zm2 0c0-.682.072-1.348.209-1.99a2 2 0 0 1 0 3.98A9.539 9.539 0 0 1 2.5 12zm.84-3.912A9.502 9.502 0 0 1 12 2.5a9.502 9.502 0 0 1 8.66 5.588 4.001 4.001 0 0 0 0 7.824 9.514 9.514 0 0 1-1.755 2.613A5.002 5.002 0 0 0 14 14.5h-4a5.002 5.002 0 0 0-4.905 4.025 9.515 9.515 0 0 1-1.755-2.613 4.001 4.001 0 0 0 0-7.824zM12 5a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm-2 4a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm11.291 1.01a9.538 9.538 0 0 1 0 3.98 2 2 0 0 1 0-3.98zM16.99 20.087A9.455 9.455 0 0 1 12 21.5c-1.83 0-3.54-.517-4.99-1.414a1.004 1.004 0 0 1-.01-.148V19.5a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v.438a1 1 0 0 1-.01.148z"></path></svg></button>
            </div>

            <!-- RIGHT: all other items aligned right -->
            <div class="ms-auto d-flex align-items-center right-actions col-3" style="gap:.5rem">
            

                <button class="btn btn-light rounded-circle position-relative" title="Thông báo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 448 512"><path d="M224 0c-13.3 0-24 10.7-24 24l0 9.7C118.6 45.3 56 115.4 56 200l0 14.5c0 37.7-10 74.7-29 107.3L5.1 359.2C1.8 365 0 371.5 0 378.2 0 399.1 16.9 416 37.8 416l372.4 0c20.9 0 37.8-16.9 37.8-37.8 0-6.7-1.8-13.3-5.1-19L421 321.7c-19-32.6-29-69.6-29-107.3l0-14.5c0-84.6-62.6-154.7-144-166.3l0-9.7c0-13.3-10.7-24-24-24zM392.4 368l-336.9 0 12.9-22.1C91.7 306 104 260.6 104 214.5l0-14.5c0-66.3 53.7-120 120-120s120 53.7 120 120l0 14.5c0 46.2 12.3 91.5 35.5 131.4L392.4 368zM156.1 464c9.9 28 36.6 48 67.9 48s58-20 67.9-48l-135.8 0z"/></svg>   
                    <span v-if="0"
                        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">0</span>
                </button>

                <div class="dropdown">
                    <button class="btn btn-light dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <img :src="avatarUrl" class="rounded-circle me-2"
                            style="width:36px;height:36px;object-fit:cover" />
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li>
                            <router-link class="dropdown-item" :to="{ name: 'profile' }">Xem hồ sơ</router-link>
                        </li>
                        <li>
                            <hr class="dropdown-divider" />
                        </li>
                        <li><a class="dropdown-item" href="#" @click.prevent="logout">Đăng xuất</a></li>
                    </ul>
                </div>
            </div>
        </div>

    </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const avatarUrl = computed(() => userStore.user?.avatarUrl ? `https://localhost:7130${userStore.user.avatarUrl}` : 'https://i.pravatar.cc/40')



function go(path) {
    router.push(path)
}

function isActive(path) {
    return route.path === path
}

function logout() {
    try {
        if (typeof userStore.logout === 'function') userStore.logout()
    } catch (err) {
        // log error but don't block navigation
        console.error('Logout error:', err)
    }
    router.push({ name: 'login' })
}
</script>

<style scoped>
.fb-center-nav {
    gap: 1.6rem
}

.nav-icon {
    width: 100px;
    font-size: 1.35rem;
    color: #6c757d;
}

.nav-icon.active {
    color: #1877f2;
}

.nav-icon:hover {
    color: #1877f2;

}


header {
    z-index: 1030
}

@media (max-width: 768px) {
    .fb-center-nav {
        display: none
    }
}

.right-actions {
    align-items: center;
    justify-content: flex-end
}

.nav-icons {
    gap: .75rem
}

/* Hover & interaction styles for icons and action buttons */
.nav-icon {
    padding: .45rem .55rem;
    border-radius: .6rem;
    cursor: pointer;
    transition: color .15s ease, background-color .15s ease, transform .12s ease;
}

.nav-icon:hover {
    color: #1877f2;
    background-color: #f0f2f5;
    transform: translateY(-2px);
}

.nav-icon.active {
    color: #1877f2;
    background-color: rgba(24, 119, 242, 0.08);
}

.right-actions .btn.rounded-circle {
    transition: background-color .12s ease, transform .12s ease;
    cursor: pointer;
}

.right-actions .btn.rounded-circle:hover {
    background-color: #f0f2f5;
    transform: translateY(-2px);
}

.right-actions .dropdown .btn:hover {
    background-color: #f0f2f5;
}

.right-actions a:hover {
    text-decoration: none;
}

menu-icon_top {
    width: 24px;
    height: 24px;
}
</style>
