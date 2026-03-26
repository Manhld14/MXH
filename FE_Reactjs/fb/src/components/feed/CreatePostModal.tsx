// src/components/feed/CreatePostModal.tsx
import { useState, useRef, useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks';


interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: { content: string; images?: File[] }) => Promise<void>;
  isLoading?: boolean;
}

export function CreatePostModal({ isOpen, onClose, onSubmit, isLoading = false }: CreatePostModalProps) {
  const currentUser = useAppSelector((s) => s.auth.currentUser);
  const [content, setContent] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleClose = () => {
    setContent('');
    setSelectedFiles([]);
    setPreviews([]);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setSelectedFiles((prev) => [...prev, ...files]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) =>
        setPreviews((prev) => [...prev, ev.target?.result as string]);
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const removeImage = (idx: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== idx));
    setPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    await onSubmit({ content: content.trim(), images: selectedFiles.length ? selectedFiles : undefined });
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-2xl bg-gray-900 border border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-700 px-6 py-4">
          <h2 className="text-xl font-bold text-white">Tạo bài viết</h2>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-800 transition disabled:opacity-50"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* User info */}
          <div className="flex items-center gap-3 px-6 py-4">
            <img
              src={`https://localhost:7130${currentUser?.avatarUrl}`}
              alt="avatar"
              className="h-10 w-10 rounded-full object-cover"
            />
            <p className="font-semibold text-white">{currentUser?.fullName ?? 'Bạn'}</p>
          </div>

          {/* Textarea */}
          <div className="px-6 pb-4">
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Bạn đang nghĩ gì?"
              rows={4}
              disabled={isLoading}
              className="w-full resize-none bg-transparent text-xl text-white placeholder-gray-600 outline-none disabled:opacity-50"
            />
          </div>

          {/* Image Previews */}
          {previews.length > 0 && (
            <div className={`grid gap-1 px-6 pb-4 ${previews.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
              {previews.map((src, idx) => (
                <div key={idx} className="relative group">
                  <img src={src} alt="" className="w-full h-40 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-2 right-2 rounded-full bg-gray-900/80 p-1 text-white opacity-0 group-hover:opacity-100 transition"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Tools */}
          <div className="border-t border-gray-700 px-6 py-3">
            <label className="flex cursor-pointer items-center gap-2 w-fit rounded px-3 py-2 text-green-400 hover:bg-gray-800 transition">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
              </svg>
              <span className="text-sm font-medium">Ảnh/Video</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                disabled={isLoading}
                className="hidden"
              />
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 border-t border-gray-700 px-6 py-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 rounded-xl bg-gray-800 py-2.5 font-semibold text-white hover:bg-gray-700 transition disabled:opacity-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={!content.trim() || isLoading}
              className="flex-1 rounded-xl bg-blue-600 py-2.5 font-semibold text-white hover:bg-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Đang đăng...' : 'Đăng'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
