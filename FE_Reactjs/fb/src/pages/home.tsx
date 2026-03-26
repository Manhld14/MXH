// src/pages/home.tsx
import { useState } from 'react';
import LeftSidebar from '../components/layout/LeftSidebar';
import RightSidebar from '../components/layout/RightSidebar';
import { PostList } from '../components/feed/PostList';
import { CreatePostModal } from '../components/feed/CreatePostModal';
import Stories from '../components/feed/Stories';
import { usePosts } from '../hooks/usePosts';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearUser } from '../redux/slices/authSlice';


export default function HomePage() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((s) => s.auth.currentUser);

  const {
    posts,
    loading,
    error,
    refetch,
    createNewPost,
    editPost,
    removePost,
    addPostComment,
    removeComment,
  } = usePosts();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const handleCreatePost = async (payload: { content: string; images?: File[] }) => {
    setIsCreatingPost(true);
    try {
      await createNewPost(payload);
      setShowCreateModal(false);
    } finally {
      setIsCreatingPost(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="flex justify-center pt-14 w-full">
        {/* Left Sidebar */}
        <div className="hidden lg:block w-[280px] flex-shrink-0">
          <LeftSidebar />
        </div>

        {/* ─ Main Feed ─ */}
        <main className="flex-1 max-w-[600px] py-4 px-4 flex flex-col gap-3">
          {/* Stories */}
          <Stories />

          {/* Create Post Bar */}
          <div className="bg-gray-900 rounded-lg border border-gray-700 p-4">
            <div className="flex items-center gap-3">
              <img
                src={`https://localhost:7130${currentUser?.avatarUrl}`}
                alt="Your avatar"
                className="h-10 w-10 rounded-full object-cover"
              />
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex-1 rounded-full bg-gray-800 px-4 py-2.5 text-left text-gray-400 transition hover:bg-gray-700"
              >
                Bạn đang nghĩ gì, {currentUser?.fullName?.split(' ').pop()}?
              </button>
            </div>

            {/* Quick actions */}
            <div className="mt-3 flex gap-2 border-t border-gray-700 pt-3">
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex flex-1 items-center justify-center gap-2 rounded py-2 text-gray-400 transition hover:bg-gray-800"
              >
                <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                </svg>
                <span className="text-sm font-semibold">Ảnh</span>
              </button>
              <button
                onClick={() => dispatch(clearUser())}
                className="flex flex-1 items-center justify-center gap-2 rounded py-2 text-gray-400 transition hover:bg-gray-800"
              >
                <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="text-sm font-semibold">Đăng xuất</span>
              </button>
            </div>
          </div>

          {/* Posts */}
          <PostList
            posts={posts}
            loading={loading}
            error={error}
            onRefetch={refetch}
            onEditPost={editPost}
            onDeletePost={removePost}
            onAddComment={addPostComment}
            onDeleteComment={removeComment}
          />
        </main>

        {/* Right Sidebar */}
        <div className="hidden xl:block w-[340px] flex-shrink-0">
          <RightSidebar />
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreatePost}
        isLoading={isCreatingPost}
      />
    </div>
  );
}
