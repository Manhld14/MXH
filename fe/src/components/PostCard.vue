<template>
  <div class="card mb-3 post-card">
    <div class="card-body">
      <div class="d-flex align-items-center mb-2">
        <img :src="`https://localhost:7130${post.user.avatarUrl}`" class="rounded-circle me-2" width="48" height="48" />
        <div>
          <strong>{{ post.user.fullName }}</strong>
          <div class="text-muted small">{{ timeAgo(post.createdAt) }}</div>
        </div>

        <div class="ms-auto">
          <div class="dropdown">
            <button class="btn btn-sm btn-light" data-bs-toggle="dropdown" aria-expanded="false">⋯</button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="#" @click.prevent="$emit('edit', post)">Chỉnh sửa</a></li>
              <li><a class="dropdown-item text-danger" href="#" @click.prevent="$emit('delete', post.postId)">Xóa</a></li>
              <li><a class="dropdown-item" href="#" @click.prevent="$emit('report', post.id)">Báo cáo</a></li>
            </ul>
          </div>
        </div>
      </div>

      <p class="mb-2">{{ post.content }}</p>
      <img v-for="(img, index) in post.images" :key="index" :src="`https://localhost:7130${img.imageUrl}`" class="img-fluid rounded mb-2 w-100" />

      <div class="d-flex justify-content-between align-items-center post-actions">
        <div class="d-flex align-items-center">
          <div class="like-bubble d-flex align-items-center me-3">
            <svg xmlns="http://www.w3.org/2000/svg" 
     viewBox="0 0 512 512" 
     width="16" 
     height="16" 
     :class="{  'text-primary': isLiked }" 
     class="me-1">
    <path 
        fill="currentColor" 
        d="M270.6 16C297.9 16 320 38.1 320 65.4l0 4.2c0 6.8-1.3 13.6-3.8 19.9L288 160 448 160c26.5 0 48 21.5 48 48 0 19.7-11.9 36.6-28.9 44 17 7.4 28.9 24.3 28.9 44 0 23.4-16.8 42.9-39 47.1 4.4 7.3 7 15.8 7 24.9 0 22.2-15 40.8-35.4 46.3 2.2 5.5 3.4 11.5 3.4 17.7 0 26.5-21.5 48-48 48l-87.9 0c-36.3 0-71.6-12.4-99.9-35.1L184 435.2c-15.2-12.1-24-30.5-24-50l0-186.6c0-14.9 3.5-29.6 10.1-42.9L226.3 43.3C234.7 26.6 251.8 16 270.6 16zM80 160c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-48 0c-17.7 0-32-14.3-32-32L0 192c0-17.7 14.3-32 32-32l48 0z" />
</svg>
            <strong class="small">{{ post.likes || 0 }}</strong>
          </div>
        </div>



        <div class="text-muted small">{{ (post.comments || []).length }} bình luận · {{ post.shares || 0 }} chia sẻ
        </div>
      </div>
      <div class="d-flex gap-2 mx-auto row text-center">
        <div class="col"><button
            :class="['btn', 'btn-sm', 'action-btn', 'no-hover', isLiked ? 'btn-primary' : 'btn-light']"
            @click.prevent="$emit('like', post.postId)" aria-label="Like"
            class="w-100 d-flex align-items-center justify-content-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16"
              :class="{ 'text-white': isLiked }" class="me-1">
              <path v-if="isLiked == false" fill="currentColor"
                d="M171.5 38.8C192.3 4 236.5-10 274 7.6l7.2 3.8C316 32.3 330 76.5 312.4 114l0 0-14.1 30 109.7 0 7.4 .4c36.3 3.7 64.6 34.4 64.6 71.6 0 13.2-3.6 25.4-9.8 36 6.1 10.6 9.7 22.8 9.8 36 0 18.3-6.9 34.8-18 47.5 1.3 5.3 2 10.8 2 16.5 0 25.1-12.9 47-32.2 59.9-1.9 35.5-29.4 64.2-64.4 67.7l-7.4 .4-104.1 0c-18 0-35.9-3.4-52.6-9.9l-7.1-3-.7-.3-6.6-3.2-.7-.3-12.2-6.5c-12.3-6.5-23.3-14.7-32.9-24.1-4.1 26.9-27.3 47.4-55.3 47.4l-32 0c-30.9 0-56-25.1-56-56L0 200c0-30.9 25.1-56 56-56l32 0c10.8 0 20.9 3.1 29.5 8.5l50.1-106.5 .6-1.2 2.7-5 .6-.9zM56 192c-4.4 0-8 3.6-8 8l0 224c0 4.4 3.6 8 8 8l32 0c4.4 0 8-3.6 8-8l0-224c0-4.4-3.6-8-8-8l-32 0zM253.6 51c-14.8-6.9-32.3-1.6-40.7 12l-2.2 4-56.8 120.9c-3.5 7.5-5.5 15.5-6 23.7l-.1 4.2 0 112.9 .2 7.9c2.4 32.7 21.4 62.1 50.7 77.7l11.5 6.1 6.3 3.1c12.4 5.6 25.8 8.5 39.4 8.5l104.1 0 2.4-.1c12.1-1.2 21.6-11.5 21.6-23.9l-.2-2.6c-.1-.9-.2-1.7-.4-2.6-2.7-12.1 4.3-24.2 16-28 9.7-3.1 16.6-12.2 16.6-22.8 0-4.3-1.1-8.2-3.1-11.8-6.3-11.1-2.8-25.2 8-32 6.8-4.3 11.2-11.8 11.2-20.2 0-7.1-3.1-13.5-8.2-18-5.2-4.6-8.2-11.1-8.2-18s3-13.4 8.2-18c5.1-4.5 8.2-10.9 8.2-18l-.1-2.4c-1.1-11.3-10.1-20.3-21.4-21.4l-2.4-.1-147.5 0c-8.2 0-15.8-4.2-20.2-11.1-4.4-6.9-5-15.7-1.5-23.1L269 93.6c7-15 1.4-32.7-12.5-41L253.6 51z" />
              <path v-else fill="currentColor"
                d="M270.6 16C297.9 16 320 38.1 320 65.4l0 4.2c0 6.8-1.3 13.6-3.8 19.9L288 160 448 160c26.5 0 48 21.5 48 48 0 19.7-11.9 36.6-28.9 44 17 7.4 28.9 24.3 28.9 44 0 23.4-16.8 42.9-39 47.1 4.4 7.3 7 15.8 7 24.9 0 22.2-15 40.8-35.4 46.3 2.2 5.5 3.4 11.5 3.4 17.7 0 26.5-21.5 48-48 48l-87.9 0c-36.3 0-71.6-12.4-99.9-35.1L184 435.2c-15.2-12.1-24-30.5-24-50l0-186.6c0-14.9 3.5-29.6 10.1-42.9L226.3 43.3C234.7 26.6 251.8 16 270.6 16zM80 160c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-48 0c-17.7 0-32-14.3-32-32L0 192c0-17.7 14.3-32 32-32l48 0z" />
            </svg>
            <span class="d-none d-md-inline" :style="{ color: isLiked ? 'white' : '' }">Thích</span>
          </button></div>

        <div class="col "><button
            class="btn btn-light btn-sm action-btn w-100  d-flex align-items-center justify-content-center gap-1"
            @click.prevent="$emit('view', post.postId)" aria-label="Comment">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16" fill="currentColor"
              class="me-1">
              <path
                d="M51.9 384.9C19.3 344.6 0 294.4 0 240 0 107.5 114.6 0 256 0S512 107.5 512 240 397.4 480 256 480c-36.5 0-71.2-7.2-102.6-20L37 509.9c-3.7 1.6-7.5 2.1-11.5 2.1-14.1 0-25.5-11.4-25.5-25.5 0-4.3 1.1-8.5 3.1-12.2l48.8-89.4zm37.3-30.2c12.2 15.1 14.1 36.1 4.8 53.2l-18 33.1 58.5-25.1c11.8-5.1 25.2-5.2 37.1-.3 25.7 10.5 54.2 16.4 84.3 16.4 117.8 0 208-88.8 208-192S373.8 48 256 48 48 136.8 48 240c0 42.8 15.1 82.4 41.2 114.7z" />
            </svg>
            <span class="d-none d-md-inline">Bình luận</span>
          </button></div>

        <div class="col"><button class="btn btn-light btn-sm action-btn w-100" aria-label="Share">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16" fill="currentColor"
              class="me-1">
              <path
                d="M307.8 18.4c-12 5-19.8 16.6-19.8 29.6l0 80-112 0c-97.2 0-176 78.8-176 176 0 113.3 81.5 163.9 100.2 174.1 2.5 1.4 5.3 1.9 8.1 1.9 10.9 0 19.7-8.9 19.7-19.7 0-7.5-4.3-14.4-9.8-19.5-9.4-8.8-22.2-26.4-22.2-56.7 0-53 43-96 96-96l96 0 0 80c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-9.2-9.2-22.9-11.9-34.9-6.9z" />
            </svg>
            <span class="d-none d-md-inline">Chia sẻ</span>
          </button></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useTimeAgo } from '@/Services/useTimeAgo'

const { timeAgo } = useTimeAgo();
const props = defineProps({
  post: { type: Object, required: true }
})

defineEmits(['edit', 'delete', 'report', 'like', 'view'])

const userStore = useUserStore()
const user = userStore.user
const uid = user.id ?? user.userId ?? user.email ?? user.fullName ?? 'anon'

const isLiked = computed(() => (props.post.likedBy || []).includes(uid))
</script>

<style scoped>
.post-card {
  border-radius: .5rem
}

.post-card img {
  object-fit: cover
}

.post-actions .action-btn {
  display: inline-flex;
  align-items: center;
  gap: .35rem;
  border-radius: .5rem;
  transition: background-color .12s ease, transform .08s ease;
}

.post-actions .action-btn:hover {
  background-color: #f0f2f5;
  transform: translateY(-1px);
}

.post-actions .action-btn svg {
  opacity: 0.9
}

/* Prevent hover visual change for controls with .no-hover (like the Like button) */
.post-actions .action-btn.no-hover:hover {
  background-color: transparent;
  transform: none;
}

.post-actions .action-btn.no-hover.btn-primary:hover {
  background-color: #0d6efd !important;
  transform: none !important;
}
</style>
