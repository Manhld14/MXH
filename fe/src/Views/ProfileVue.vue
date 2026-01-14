<template>
    <AppHeader />
    <div class="container py-4">
        <!-- Cover + Profile header -->
        <div class="profile-cover position-relative "
            :style="{ backgroundImage: `url(https://localhost:7130${user.avatarUrl})` }">

        </div>
        <div class="card mb-4 overflow-hidden gap-2 pt-5 ">

            <div class="card-body pt-0 mt-5">
                <div class="d-flex align-items-end">
                    <img :src="`https://localhost:7130${user.avatarUrl}`"
                        class="rounded-circle profile-avatar border" />
                    <div class="ms-3">
                        <h3 class="mb-0">{{ user.fullName }}</h3>
                        <p class="text-muted mb-0">{{ user.headline }}</p>
                        <small class="text-muted">{{ user.location }}</small>
                    </div>
                    <div class="d-flex ms-auto gap-2">
                        <button @click="openEditProfileModal" class="btn btn-outline-secondary me-2">Chỉnh sửa trang cá
                            nhân</button>
                    </div>
                </div>

                <ul class="nav nav-tabs mt-4">
                    <li class="nav-item" v-for="tab in tabs" :key="tab">
                        <a href="#" class="nav-link" :class="{ active: activeTab === tab }"
                            @click.prevent="activeTab = tab">
                            {{ tab }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Main layout -->
        <div class="row">
            <!-- LEFT: About / Photos -->
            <div class="col-lg-3 mb-4">
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">Giới thiệu</h5>
                        <p class="mb-1"><strong>Công việc:</strong> {{ user.job }}</p>
                        <p class="mb-1"><strong>Học vấn:</strong> {{ user.education }}</p>
                        <p class="mb-1"><strong>Sống tại:</strong> {{ user.location }}</p>
                        <p class="mb-0"><strong>Quan hệ:</strong> {{ user.relationship }}</p>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Ảnh</h5>
                        <div class="row g-2">
                            <div class="col-4" v-for="(p, i) in photos" :key="i">
                                <img :src="p" class="img-fluid rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- CENTER: Feed / Posts -->
            <div class="col-lg-6 mb-4">
                <div v-if="activeTab === 'Bài viết' || activeTab === 'Trang chủ'">
                    <div class="card mb-3">
                        <div class="card-body">
                            <div class="d-flex">
                                <img :src="`https://localhost:7130${user.avatarUrl}`" class="rounded-circle"
                                    style="width:48px;height:48px" />
                                <div class="flex-grow-1 ms-2">
                                    <textarea class="form-control mb-2" rows="3" v-model="newPostText"
                                        placeholder="Bạn đang nghĩ gì?"></textarea>
                                    <div class="d-flex justify-content-between">
                                        <div>
                                            <input type="file" ref="file" @change="onFileChange"
                                                class="form-control form-control-sm" />
                                        </div>
                                        <button class="btn btn-primary btn-sm" @click="createPost">Đăng</button>
                                    </div>
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
                                    <img :src="selectedPost.avatar" class="rounded-circle me-2"
                                        style="width:48px;height:48px;object-fit:cover" />
                                    <div class="flex-grow-1">
                                        <div class="fw-bold">{{ selectedPost.author }}</div>
                                        <small class="text-muted">{{ selectedPost.time }}</small>
                                    </div>
                                </div>
                                <p>{{ selectedPost.content }}</p>
                                <img v-if="selectedPost.image" :src="selectedPost.image"
                                    class="img-fluid rounded mb-2" />
                                <div class="small text-muted mb-2">{{ selectedPost.likes || 0 }} lượt thích · {{
                                    (selectedPost.comments || []).length }} bình luận</div>

                                <div v-for="(c, i) in (selectedPost.comments || [])" :key="i" class="mb-2">
                                    <strong>{{ c.author }}</strong> <small class="text-muted ms-2">{{ c.time }}</small>
                                    <div>{{ c.text }}</div>
                                </div>

                                <div class="d-flex mt-2">
                                    <input v-model="selectedComment" class="form-control me-2"
                                        placeholder="Viết bình luận..." @keyup.enter.prevent="submitSelectedComment" />
                                    <button class="btn btn-primary" :disabled="!selectedComment.trim()"
                                        @click="submitSelectedComment">Gửi</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <PostCard v-for="post in posts" :key="post.postId" :post="post" @edit="startEdit"
                        @delete="deletePost" @report="reportPost" @like="handleLike" @view="openPostDetail" />
                </div>

                <div v-else-if="activeTab === 'Giới thiệu'">
                    <div class="card p-3">
                        <h5>Chi tiết cá nhân</h5>
                        <p>{{ user.bio }}</p>
                    </div>
                </div>

                <div v-else-if="activeTab === 'Bạn bè'">
                    <div class="card p-3">
                        <h5>Bạn bè ({{ friends.length }})</h5>
                        <div class="d-flex flex-wrap">
                            <div class="text-center m-2" v-for="f in friends" :key="f.id" style="width:100px">
                                <img :src="f.avatar" class="rounded-circle mb-1" style="width:64px;height:64px" />
                                <div class="small">{{ f.name }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- MODAL CHỈNH SỬA TRANG CÁ NHÂN -->
            <div v-if="showEditProfileModal" class="post-modal-overlay" @click.self="closeEditProfileModal">
                <div class="post-modal card p-3">

                    <!-- Header -->
                    <div class="d-flex align-items-center mb-2">
                        <h5 class="mb-0">Chỉnh sửa trang cá nhân</h5>
                        <button class="btn btn-sm btn-light ms-auto" @click="closeEditProfileModal">✕</button>
                    </div>

                    <!-- Avatar -->
                    <div class="d-flex align-items-start mb-3">
                        <img :src="previewAvatar || `https://localhost:7130${editProfile.avatarUrl}`"
                            class="rounded-circle me-2" style="width:70px;height:70px;object-fit:cover" />

                        <div class="flex-grow-1">
                            <div class="fw-bold">{{ editProfile.fullName }}</div>

                            <input type="file" ref="avatarInput" class="d-none" accept="image/*"
                                @change="onAvatarSelected" />
                            <button class="btn btn-light btn-sm mt-1" @click="avatarInput && avatarInput.click()">
                                🖼️ Đổi ảnh đại diện
                            </button>
                        </div>
                    </div>

                    <!-- Họ tên -->
                    <div class="mb-2">
                        <label class="form-label">Họ và tên</label>
                        <input type="text" class="form-control" v-model="editProfile.fullName" />
                    </div>

                    <!-- Email -->
                    <div class="mb-2">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-control" v-model="editProfile.email" />
                    </div>

                    <!-- Ngày sinh -->
                    <div class="mb-2">
                        <label class="form-label">Ngày sinh</label>
                        <input type="date" class="form-control" v-model="editProfile.birthday" />
                    </div>

                    <!-- Giới tính -->
                    <div class="mb-3">
                        <label class="form-label">Giới tính</label>
                        <select class="form-select" v-model="editProfile.sex">
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Khác">Khác</option>
                        </select>
                    </div>

                    <!-- Nút -->
                    <div class="text-end">
                        <button class="btn btn-secondary btn-sm me-2" @click="closeEditProfileModal">Hủy</button>
                        <button class="btn btn-primary btn-sm" @click="handleUpdateProfile">
                            Lưu thay đổi
                        </button>
                    </div>

                </div>
            </div>



            <!-- RIGHT: Suggestions -->
            <div class="col-lg-3 mb-4">
                <div class="card mb-3">
                    <div class="card-body">
                        <h6 class="card-title">Có thể bạn biết</h6>
                        <div v-for="p in suggestions" :key="p.id" class="d-flex align-items-center mb-3">
                            <img :src="p.avatar" class="rounded-circle" style="width:40px;height:40px" />
                            <div class="ms-2 flex-grow-1">
                                <div class="small">{{ p.name }}</div>
                                <div class="text-muted small">{{ p.mutual }} bạn chung</div>
                            </div>
                            <button class="btn btn-sm btn-outline-primary">Thêm</button>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <h6 class="card-title">Truy cập nhanh</h6>
                        <ul class="list-unstyled small mb-0">
                            <li>Nhật ký hoạt động</li>
                            <li>Cài đặt quyền riêng tư</li>
                            <li>Đăng xuất</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import PostCard from '@/components/PostCard.vue'
import { reactive, ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'   // ✅ THÊM DÒNG NÀY
import api from '@/Services/api'

const userStore = useUserStore()

const { user } = storeToRefs(userStore)



const showEditProfileModal = ref(false);
const avatarInput = ref(null);
const previewAvatar = ref(null);
const editProfile = reactive({
    userId: 0,
    fullName: "",
    avatarUrl: "",
    email: "",
    birthday: "",
    sex: ""
});


const loading = ref(false)
const error = ref('')
onMounted(() => {
    getPost();
})

// Mở modal
// ✅ MỞ MODAL + LOAD DATA USER
function openEditProfileModal() {
    showEditProfileModal.value = true;

    editProfile.userId = user.value.userId;
    editProfile.fullName = user.value.fullName;
    editProfile.avatarUrl = user.value.avatarUrl;
    editProfile.email = user.value.email;

    // Convert DateTime -> yyyy-MM-dd cho input type="date"
    editProfile.birthday = user.value.birthday?.slice(0, 10);
    editProfile.sex = user.value.sex?.trim().toLowerCase() === "nam" ? "Nam"
        : user.value.sex?.trim().toLowerCase() === "nữ" ? "Nữ"
            : "Khác";

    previewAvatar.value = null;
}

function closeEditProfileModal() {
    showEditProfileModal.value = false;
    previewAvatar.value = null;
}


// ✅ CHỌN ẢNH
function onAvatarSelected(e) {
    const file = e.target.files[0];
    if (file) {
        previewAvatar.value = URL.createObjectURL(file);
    }
}

// ✅ GỬI UPDATE LÊN API
async function handleUpdateProfile() {
    const formData = new FormData();

    formData.append("userId", editProfile.userId);
    formData.append("fullName", editProfile.fullName);
    formData.append("email", editProfile.email);
    formData.append("birthday", editProfile.birthday);
    formData.append("sex", editProfile.sex);

    if (avatarInput.value?.files.length > 0) {
        formData.append("avatar", avatarInput.value.files[0]);
    }

    try {
        const res = await api.put(
            `/Users/update-profile/${user.value.userId}`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );

        // ✅ Cập nhật lại user sau khi sửa
        Object.assign(user.value, res.data);
        // ✅ LƯU VÀO LOCALSTORAGE ĐỂ KHÔNG MẤT KHI F5
        localStorage.setItem("user", JSON.stringify(user.value))

        getPost()


        closeEditProfileModal();
    } catch (error) {
        console.log(error)
    }
}

const tabs = ['Trang chủ', 'Bài viết', 'Giới thiệu', 'Bạn bè']
const activeTab = ref('Trang chủ')

const photos = [
    'https://picsum.photos/200/200?1',
    'https://picsum.photos/200/200?2',
    'https://picsum.photos/200/200?3',
    'https://picsum.photos/200/200?4',
    'https://picsum.photos/200/200?5',
    'https://picsum.photos/200/200?6'
]

const friends = [
    { id: 1, name: 'Lê Thị B', avatar: 'https://i.pravatar.cc/100?img=5' },
    { id: 2, name: 'Trần C', avatar: 'https://i.pravatar.cc/100?img=6' },
    { id: 3, name: 'Phạm D', avatar: 'https://i.pravatar.cc/100?img=7' }
]

const suggestions = [
    { id: 1, name: 'Ngô E', avatar: 'https://i.pravatar.cc/100?img=8', mutual: 3 },
    { id: 2, name: 'Hoàng F', avatar: 'https://i.pravatar.cc/100?img=9', mutual: 1 }
]

const posts = reactive([])



const newPostText = ref('')
const fileInput = ref(null)


async function getPost() {
    try {
        loading.value = true
        error.value = ''
        const response = await api.get(`/Posts/user/${user.value.userId}`);
        posts.splice(0, posts.length, ...response.data)
    } catch (err) {
        console.error('fetch posts error', err)
        error.value = 'Không tải được bài viết. Vui lòng thử lại.'
    } finally {
        loading.value = false
    }
}

function createPost() {
    if (!newPostText.value.trim()) return
    const id = Date.now()
    let image = ''
    // if a file was selected, create an object URL (simple demo)
    const f = fileInput.value?.files?.[0]
    if (f) image = URL.createObjectURL(f)
    posts.unshift({
        id,
        text: newPostText.value,
        image,
        time: 'Vừa xong',
        likes: 0,
        likedBy: [],
        comments: []
    })
    newPostText.value = ''
    if (fileInput.value) fileInput.value.value = ''
}

function onFileChange() {
    // handled in createPost
}

// Post actions are handled via PostCard emits (likes/view open detail)

function handleLike(id) {
    try {
        const p = posts.find(x => x.id === id)
        if (!p) return
        p.likedBy = p.likedBy || []
        const uid = user.id ?? user.userId ?? user.email ?? user.fullName ?? 'anon'
        if (p.likedBy.includes(uid)) {
            // unlike
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

const selectedPost = ref(null)
const showPostDetail = ref(false)
const selectedComment = ref('')

function openPostDetail(id) {
    const p = posts.find(x => x.postId === id)
    if (!p) return
    selectedPost.value = p
    showPostDetail.value = true
}

function closePostDetail() {
    showPostDetail.value = false
    selectedPost.value = null
    selectedComment.value = ''
}

function submitSelectedComment() {
    const t = (selectedComment.value || '').trim()
    if (!t || !selectedPost.value) return
    selectedPost.value.comments = selectedPost.value.comments || []
    selectedPost.value.comments.push({ author: user.fullName || 'Bạn', text: t, time: 'Vừa xong' })
    selectedComment.value = ''
}



</script>

<style scoped>
.profile-cover {
    height: 350px;
    background-size: cover;
    background-position: center;
}

.profile-avatar {
    width: 120px;
    height: 120px;
    margin-top: -60px;
    margin-left: 16px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.card .border-top {
    border-top: 1px solid #e9ecef;
}


.post-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
}

.post-modal {
    width: 500px;
    max-width: 95%;
    border-radius: 10px;
}
</style>