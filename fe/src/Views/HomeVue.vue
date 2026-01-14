<template>
  <AppHeader />
  <div class="home-page container-fluid m-0 py-4">
    <div class="row">
      <!-- Left sidebar (Facebook-like) -->
      <aside class="col-lg-3 d-none d-lg-block">
        <div class="position-sticky" style="top:20px">
          <div class="card mb-3">
            <div class="card-body p-2">
              <router-link :to="{ name: 'profile' }" class="d-flex align-items-center text-decoration-none text-dark">
                <img :src="`https://localhost:7130${user.avatarUrl}`" class="rounded-circle me-2 left-avatar"
                  alt="avatar" />
                <div>
                  <div class="fw-bold">{{ user.fullName }}</div>
                  <div class="small text-muted">Xem hồ sơ của bạn</div>
                </div>
              </router-link>
            </div>
          </div>

          <div class="card mb-3">
            <div class="card-body p-2">
              <h6 class="mb-2">Lối tắt</h6>
              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex align-items-center border-0">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"
                    class="x14rh7hd x1lliihq x1tzjh5l x1k90msu x2h7rmj x1qfuztq me-2 menu-icon"
                    style="--x-color:var(--secondary-icon)">
                    <path
                      d="M12.496 5a4 4 0 1 1 8 0 4 4 0 0 1-8 0zm4-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-9 2.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm-2 4a2 2 0 1 1 4 0 2 2 0 0 1-4 0zM5.5 15a5 5 0 0 0-5 5 3 3 0 0 0 3 3h8.006a3 3 0 0 0 3-3 5 5 0 0 0-5-5H5.5zm-3 5a3 3 0 0 1 3-3h4.006a3 3 0 0 1 3 3 1 1 0 0 1-1 1H3.5a1 1 0 0 1-1-1zm12-9.5a5.04 5.04 0 0 0-.37.014 1 1 0 0 0 .146 1.994c.074-.005.149-.008.224-.008h4.006a3 3 0 0 1 3 3 1 1 0 0 1-1 1h-3.398a1 1 0 1 0 0 2h3.398a3 3 0 0 0 3-3 5 5 0 0 0-5-5H14.5z">
                    </path>
                  </svg>
                  <a href="#" class="flex-grow-1 text-decoration-none text-dark  ">Bạn bè</a>
                  <small class="text-muted">12</small>
                </li>
                <li class="list-group-item d-flex align-items-center border-0">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"
                    class="x14rh7hd x1lliihq x1tzjh5l x1k90msu x2h7rmj x1qfuztq me-2 menu-icon"
                    style="--x-color:var(--secondary-icon)">
                    <path
                      d="M.5 12c0 6.351 5.149 11.5 11.5 11.5S23.5 18.351 23.5 12 18.351.5 12 .5.5 5.649.5 12zm2 0c0-.682.072-1.348.209-1.99a2 2 0 0 1 0 3.98A9.539 9.539 0 0 1 2.5 12zm.84-3.912A9.502 9.502 0 0 1 12 2.5a9.502 9.502 0 0 1 8.66 5.588 4.001 4.001 0 0 0 0 7.824 9.514 9.514 0 0 1-1.755 2.613A5.002 5.002 0 0 0 14 14.5h-4a5.002 5.002 0 0 0-4.905 4.025 9.515 9.515 0 0 1-1.755-2.613 4.001 4.001 0 0 0 0-7.824zM12 5a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm-2 4a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm11.291 1.01a9.538 9.538 0 0 1 0 3.98 2 2 0 0 1 0-3.98zM16.99 20.087A9.455 9.455 0 0 1 12 21.5c-1.83 0-3.54-.517-4.99-1.414a1.004 1.004 0 0 1-.01-.148V19.5a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v.438a1 1 0 0 1-.01.148z">
                    </path>
                  </svg>
                  <a href="#" class="flex-grow-1 text-decoration-none text-dark">Nhóm</a>
                </li>
                <li class="list-group-item d-flex align-items-center border-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 640 640"
                    class="me-2 menu-icon">
                    <path
                      d="M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64zM216 176L160 176C151.2 176 144 183.2 144 192L144 240L496 240L496 192C496 183.2 488.8 176 480 176L216 176zM144 288L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 288L144 288z" />
                  </svg>
                  <a href="#" class="flex-grow-1 text-decoration-none text-dark">Sự kiện</a>
                </li>
                <li class="list-group-item d-flex align-items-center border-0">
                  <svg class="me-2 menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path
                      d="M160 144C151.2 144 144 151.2 144 160L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 237.3C496 233.1 494.3 229 491.3 226L416 150.6L416 240C416 257.7 401.7 272 384 272L224 272C206.3 272 192 257.7 192 240L192 144L160 144zM240 144L240 224L368 224L368 144L240 144zM96 160C96 124.7 124.7 96 160 96L402.7 96C419.7 96 436 102.7 448 114.7L525.3 192C537.3 204 544 220.3 544 237.3L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 160zM256 384C256 348.7 284.7 320 320 320C355.3 320 384 348.7 384 384C384 419.3 355.3 448 320 448C284.7 448 256 419.3 256 384z" />
                  </svg>
                  <a href="#" class="flex-grow-1 text-decoration-none text-dark">Đã lưu</a>
                </li>
                <li class="list-group-item d-flex align-items-center border-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="me-2 menu-icon">
                    <path
                      d="M528 320C528 205.1 434.9 112 320 112C205.1 112 112 205.1 112 320C112 434.9 205.1 528 320 528C434.9 528 528 434.9 528 320zM64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320zM370.7 389.1L226.4 444.6C207 452.1 187.9 433 195.4 413.6L250.9 269.3C254.2 260.8 260.8 254.2 269.3 250.9L413.6 195.4C433 187.9 452.1 207 444.6 226.4L389.1 370.7C385.8 379.2 379.2 385.8 370.7 389.1zM352 320C352 302.3 337.7 288 320 288C302.3 288 288 302.3 288 320C288 337.7 302.3 352 320 352C337.7 352 352 337.7 352 320z" />
                  </svg>

                  <a href="#" class="flex-grow-1 text-decoration-none text-dark">Marketplace</a>
                </li>
                <li class="list-group-item text-center small">
                  <a href="#" class="text-decoration-none">Xem thêm</a>
                </li>
              </ul>
            </div>
          </div>

          <div class="card">
            <div class="card-body p-2">
              <h6 class="mb-2">Liên kết nhanh</h6>
              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex align-items-center border-0">
                  <svg class="me-2 menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path
                      d="M144 88C144 74.7 133.3 64 120 64C106.7 64 96 74.7 96 88L96 552C96 565.3 106.7 576 120 576C133.3 576 144 565.3 144 552L144 452L224.3 431.9C265.4 421.6 308.9 426.4 346.8 445.3C391 467.4 442.3 470.1 488.5 452.7L523.2 439.7C535.7 435 544 423.1 544 409.7L544 130C544 107 519.8 92 499.2 102.3L489.6 107.1C443.3 130.3 388.8 130.3 342.5 107.1C307.4 89.5 267.1 85.1 229 94.6L144 116L144 88zM144 165.5L240.6 141.3C267.6 134.6 296.1 137.7 321 150.1C375.9 177.5 439.7 179.8 496 156.9L496 398.7L471.6 407.8C437.9 420.4 400.4 418.5 368.2 402.4C320 378.3 264.9 372.3 212.6 385.3L144 402.5L144 165.5z" />
                  </svg>
                  <a href="#" class="flex-grow-1 text-decoration-none text-dark">Trang</a>
                </li>
                <li class="list-group-item d-flex align-items-center border-0">
                  <svg class="me-2 menu-icon" viewBox="0 0 640 640" fill="currentColor">
                    <path
                      d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z" />
                  </svg>
                  <a href="#" class="flex-grow-1 text-decoration-none text-dark">Cài đặt</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>


      <!-- Main feed -->
      <main class="col-lg-6">
        <div class="card mb-3 p-3">
          <div class="d-flex align-items-center gap-2">
            <img :src="`https://localhost:7130${user.avatarUrl}`" class="rounded-circle profile-avatar" alt="avatar" />
            <div class="form-control d-flex align-items-center create-input" role="button" @click="openModal">
              <span class="text-muted">Bạn đang nghĩ gì?</span>
            </div>
            <button class="btn btn-primary ms-2" @click="openModal">Đăng</button>
          </div>
        </div>

        <!-- Create Post Modal -->
        <div v-if="showModal" class="post-modal-overlay" @click.self="closeModal">
          <div class="post-modal card p-3">
            <div class="d-flex align-items-center mb-2">
              <h5 class="mb-0">{{ editingPostId ? 'Chỉnh sửa bài viết' : 'Tạo bài viết' }}</h5>
              <button class="btn btn-sm btn-light ms-auto" @click="closeModal">✕</button>
            </div>

            <div class="d-flex align-items-start mb-2">
              <img :src="`https://localhost:7130${user.avatarUrl}`" class="rounded-circle me-2"
                style="width:48px;height:48px;object-fit:cover" />
              <div class="flex-grow-1">
                <div class="fw-bold">{{ user.fullName }}</div>
                <small class="text-muted">Chỉ mình tôi</small>
              </div>
            </div>

            <textarea class="form-control mb-2" rows="6" v-model="newPostText"
              placeholder="Mạnh ơi, bạn đang nghĩ gì thế?"></textarea>

            <div class="d-flex align-items-center justify-content-between mt-2">
              <div class="d-flex gap-2 align-items-center">
                <input type="file" ref="fileInput" class="d-none" accept="image/*" multiple @change="onFilesSelected" />
                <button class="btn btn-light btn-sm" @click.prevent="fileInput && fileInput.click()">🖼️ Ảnh</button>
                <button class="btn btn-light btn-sm">😀 Cảm xúc</button>
                <div class="selected-images d-flex gap-2 mt-2">
                  <div v-for="(img, i) in selectedImages" :key="i" class="position-relative">
                    <img :src="img.url" style="height:48px; max-width:140px; border-radius:6px; object-fit:cover" />
                    <button class="btn btn-sm btn-danger position-absolute" style="top:-6px; right:-6px;"
                      @click.prevent="removeImage(i)">✕</button>
                  </div>
                </div>

              </div>
              <div>
                <button class="btn btn-secondary btn-sm me-2" @click="closeModal">Hủy</button>
                <button class="btn btn-primary btn-sm" :disabled="!newPostText.trim()" @click="handleSubmit">{{
                  editingPostId
                    ? 'Lưu' : 'Đăng' }}</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Post detail modal -->
        <div v-if="showPostDetail" class="post-modal-overlay" @click.self="closePostDetail">
          <div class="post-modal card p-3">
            <div class="d-flex align-items-center mb-2">
              <h5 class="mb-0">Chi tiết bài viết</h5>
              <button class="btn btn-sm btn-light ms-auto" @click="closePostDetail">✕</button>
            </div>

            <div v-if="selectedPost" class="mb-3">
              <div class="d-flex align-items-start mb-2">
                <img :src="`https://localhost:7130${selectedPost.user.avatarUrl}`" class="rounded-circle me-2"
                  style="width:48px;height:48px;object-fit:cover" />
                <div class="flex-grow-1">
                  <div class="fw-bold">{{ selectedPost.user.fullName }}</div>
                  <small class="text-muted">{{ timeAgo(selectedPost.createdAt) }}</small>
                </div>
              </div>
              <p>{{ selectedPost.content }}</p>
              <img v-for="(img, index) in selectedPost.images" :key="index"
                :src="`https://localhost:7130${img.imageUrl}`" class="img-fluid rounded mb-2 w-100" />
              <div class="small text-muted mb-2">{{ selectedPost.likes || 0 }} lượt thích · {{ (selectedPost.comments ||
                []).length }} bình luận</div>

              <div v-for="(c, i) in (selectedPost.comments || [])" :key="i" class="mb-2">
                <strong>{{ c.user.fullName }}</strong> <small class="text-muted ms-2">{{ timeAgo(c.createdAt)
                }}</small>
                <div>{{ c.content }}</div>
              </div>

              <div class="d-flex mt-2">
                <input v-model="selectedComment" class="form-control me-2" placeholder="Viết bình luận..."
                  @keyup.enter.prevent="submitSelectedComment" />
                <button class="btn btn-primary" :disabled="!selectedComment.trim()"
                  @click="submitSelectedComment">Gửi</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Posts list (reusable component) -->
        <PostCard v-for="post in posts" :key="post.postId" :post="post" @edit="startEdit" @delete="deletePost"
          @report="reportPost" @like="handleLike" @view="openPostDetail" />
      </main>

      <!-- Right sidebar -->
      <aside class="col-lg-3 d-none d-lg-block start-0">
        <div class="card mb-3">
          <div class="card-body">
            <h6>Gợi ý kết bạn</h6>
            <ul class="list-unstyled mb-0">
              <li v-for="u in suggestions" :key="u.id" class="d-flex align-items-center mb-2">
                <img :src="u.avatar" class="rounded-circle me-2" width="40" height="40" />
                <div class="flex-grow-1">
                  <div><strong>{{ u.name }}</strong></div>
                  <button class="btn btn-sm btn-primary mt-1" @click="addFriend(u)">Thêm</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from 'vue'
import api from '@/Services/api'
import { useUserStore } from '@/stores/userStore';
import AppHeader from '@/components/AppHeader.vue'
import PostCard from '@/components/PostCard.vue'

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";

dayjs.extend(relativeTime);
dayjs.locale("vi");




export default defineComponent({
  name: 'HomeVue',
  components: { AppHeader, PostCard },
  setup() {
    const userStore = useUserStore()
    const user = userStore.user
    const newPostText = ref('')
    const showModal = ref(false)
    const fileInput = ref(null)
    const selectedImage = ref('')
    const selectedImages = ref([])
    let currentObjectUrl = null
    const editingPostId = ref(null)

    const posts = ref([])
    const suggestions = reactive([])

    const loading = ref(false)
    const error = ref('')

    function timeAgo(date) {
      return dayjs(date).fromNow();
    }


    async function fetchPosts() {


      try {
        loading.value = true
        error.value = ''
        const response = await api.get('/Posts')
        posts.value = response.data.items

      } catch (err) {
        console.error('fetch posts error', err)
        error.value = 'Không tải được bài viết. Vui lòng thử lại.'
      } finally {
        loading.value = false
      }

      // posts.splice(0, posts.length, ...sample)
    }

    async function fetchSuggestions() {
      const s = [
        { id: 11, name: 'Vũ Minh', avatar: 'https://i.pravatar.cc/100?img=11' },
        { id: 12, name: 'Hà Linh', avatar: 'https://i.pravatar.cc/100?img=13' },
        { id: 13, name: 'Trọng Bảo', avatar: 'https://i.pravatar.cc/100?img=14' }
      ]
      suggestions.splice(0, suggestions.length, ...s)
    }


    async function handleSubmit() {
      if (editingPostId.value) {
        updatePost()
      } else {
        addPost()
      }
    }
    async function addPost() {
      const text = (newPostText.value || '').trim()
      if (!text) return

      const formData = new FormData()
      formData.append('UserId', user.userId)
      formData.append('Content', text)

      // nếu bạn cho phép nhiều ảnh
      if (selectedImages.value.length > 0) {
        for (const img of selectedImages.value) {
          formData.append('images', img.file)
        }
      }


      try {
        loading.value = true
        const response = await api.post('/Posts/create', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })

        console.log('Post created:', response.data)
        // Xử lý UI: push post mới vào posts array hoặc fetch lại posts
        await fetchPosts(); // ← reload danh sách bài viết mới nhất từ API

        // reset form
        newPostText.value = ''
        selectedImage.value = ''
        if (fileInput.value) fileInput.value.value = ''
        showModal.value = false
      } catch (err) {
        console.error('Add post error', err)
        error.value = 'Không tạo được bài viết'
      } finally {
        loading.value = false
      }
    }

    async function updatePost() {

      const postId = editingPostId.value;
      try {
        const res = await api.put(`/Posts/${postId}`, {
          postId: postId,
          content: newPostText.value
        })

        console.log("Update thành công:", res.data)

        // ✅ Update lại trong list posts luôn (không cần reload)
        const p = posts.value.find(x => x.postId === postId)
        if (p) p.content = newPostText.value

        closeModal();

      } catch (err) {
        console.error("Lỗi update post:", err)
      }
    }


    function handleAddComment(payload) {
      try {
        const p = posts.value.find(x => x.postId === payload.postId)

        if (!p) return
        p.comments = p.comments || []
        p.comments.push({ author: user.fullName || 'Bạn', text: payload.text, time: 'Vừa xong' })
      } catch (err) {
        console.error('add comment error', err)
      }
    }

    const selectedPost = ref(null)
    const showPostDetail = ref(false)
    const selectedComment = ref('')

    function openPostDetail(id) {
      const p = posts.value.find(x => x.postId === id)
      if (!p) return
      selectedPost.value = p
      showPostDetail.value = true
      console.log(selectedPost.value)


    }

    function closePostDetail() {
      showPostDetail.value = false
      selectedPost.value = null
      selectedComment.value = ''
    }

    async function submitSelectedComment() {
      const t = (selectedComment.value || '').trim()
      if (!t || !selectedPost.value) return
      selectedPost.value.comments = selectedPost.value.comments || []


      // optionally send to backend

      const commentPayload = {
        postId: selectedPost.value.postId,
        content: t,
        userId: user.userId


      }


      try {
        const response = await api.post('/Posts/comment', commentPayload)
        const newComment = response.data;
        selectedPost.value.comments = selectedPost.value.comments || []
        selectedPost.value.comments.push(newComment)

        // 3. Dọn dẹp Input
        selectedComment.value = ''

        console.log("thêm cmt thành công")

      } catch (err) {
        console.error('submit comment error', err)
      }


    }

    function handleLike(id) {
      try {
        const p = posts.value.find(x => x.id === id)
        if (!p) return
        p.likedBy = p.likedBy || []
        const uid = user.id ?? user.userId ?? user.email ?? user.fullName ?? 'anon'
        if (p.likedBy.includes(uid)) {
          // unlike: remove user and decrement
          p.likedBy = p.likedBy.filter(u => u !== uid)
          p.likes = Math.max(0, (p.likes || 0) - 1)
        } else {
          p.likedBy.push(uid)
          p.likes = (p.likes || 0) + 1
        }
      } catch (err) {
        console.error('like error', err)
      }
    }

    function startEdit(post) {
      console.log(post)
      editingPostId.value = post.postId
      newPostText.value = post.content
      // if post has image, show it in preview
      selectedImage.value = post.image || ''
      showModal.value = true
    }

    async function deletePost(id) {
      if (!confirm('Bạn có chắc muốn xóa bài viết này?')) return

      try {
        await api.delete(`/Posts/${id}`)
        posts.value = posts.value.filter(p => p.postId !== id)

        console.log("✅ Xoá thành công")
      } catch (error) {
        console.log(error)
      }
    }

    function reportPost(id) {
      // simple demo: just notify
      alert('Đã gửi báo cáo cho bài viết (id: ' + id + ')')
    }

    function addFriend(u) {
      // demo: gọi API để gửi request kết bạn nếu backend hỗ trợ
      try {
        api.post(`/friends/request/${u.id}`).catch(() => { })
      } catch {
        // ignore
      }
      alert(`Đã gửi lời mời kết bạn tới ${u.name}`)
    }

    onMounted(() => {
      fetchPosts()
      fetchSuggestions()
    })

    function openModal() {// Khi nhấn nút Đăng/Tạo bài viết, nếu không ở chế độ chỉnh sửa (editingPostId == null),
      // hãy đảm bảo form được dọn dẹp.
      if (!editingPostId.value) {
        newPostText.value = ''
        selectedImage.value = ''
        if (fileInput.value) fileInput.value.value = ''
        if (currentObjectUrl) { URL.revokeObjectURL(currentObjectUrl); currentObjectUrl = null }
      }
      showModal.value = true
    }
    function closeModal() {
      showModal.value = false
      // cleanup selected image when closing
      if (fileInput.value) fileInput.value.value = ''
      if (currentObjectUrl) { URL.revokeObjectURL(currentObjectUrl); currentObjectUrl = null }
      selectedImage.value = ''
      editingPostId.value = null
    }

    function onFilesSelected(e) {
      const files = e.target.files
      if (!files || files.length === 0) return

      // Xóa preview cũ
      selectedImages.value.forEach(img => URL.revokeObjectURL(img.url))
      selectedImages.value = []

      for (const file of files) {
        const objectUrl = URL.createObjectURL(file)
        selectedImages.value.push({
          file,
          url: objectUrl
        })
      }
    }


    function removeImage(index) {
      const img = selectedImages.value[index]
      if (img) {
        URL.revokeObjectURL(img.url)
        selectedImages.value.splice(index, 1)
      }
    }


    return { newPostText, posts, suggestions, addPost, addFriend, loading, error, user, showModal, openModal, closeModal, startEdit, deletePost, reportPost, editingPostId, fileInput, selectedImage, onFilesSelected, removeImage, handleAddComment, handleLike, selectedPost, showPostDetail, selectedComment, openPostDetail, closePostDetail, submitSelectedComment, timeAgo, handleSubmit }
  }
})
</script>

<style scoped>
.card img.img-fluid {
  max-height: 400px;
  object-fit: cover;
}

.profile-avatar {
  width: 50px;
  height: 50px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.left-avatar {
  width: 46px;
  height: 46px;
  object-fit: cover;
}

.list-group-item {
  cursor: pointer;
}

.list-group-item span {
  width: 28px;
  text-align: center;
}

.list-group-item:hover {
  background-color: #f0f2f5;
}

/* Modal styles */
.post-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
}

.post-modal {
  max-width: 680px;
  width: 100%;
  border-radius: .5rem
}

.create-input {
  cursor: pointer
}

.create-input:hover {
  background: #f0f2f5
}

.menu-icon {
  width: 22px;
  height: 22px;
  fill: black;
}
</style>
