// src/components/layout/LeftSidebar.tsx
import React from 'react';
import { useAppSelector } from '../../redux/hooks';

// ─── Icons ────────────────────────────────────────────────────────────────────
const FriendsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
);
const GroupIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);
const MemoryIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
  </svg>
);
const SavedIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
  </svg>
);
const VideoIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z" />
  </svg>
);
const MetaAIIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
    <circle cx="12" cy="12" r="10" fill="url(#metaGrad)" />
    <defs>
      <linearGradient id="metaGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0668E1" />
        <stop offset="0.5" stopColor="#C44FFF" />
        <stop offset="1" stopColor="#FF6B00" />
      </linearGradient>
    </defs>
    <text x="6" y="17" fontSize="12" fill="white" fontWeight="bold">AI</text>
  </svg>
);
const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M7 10l5 5 5-5z" />
  </svg>
);

// ─── Sidebar Item ─────────────────────────────────────────────────────────────
interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  iconBg?: string;
  badge?: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, iconBg, badge }) => (
  <button className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[#3a3b3c] transition-colors text-left group">
    <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${iconBg ?? 'bg-[#3a3b3c]'}`}>
      {icon}
    </div>
    <span className="text-[#e4e6eb] text-sm font-medium leading-tight flex-1">{label}</span>
    {badge !== undefined && (
      <span className="bg-[#1877f2] text-white text-xs font-bold min-w-[20px] h-5 flex items-center justify-center rounded-full px-1">
        {badge}
      </span>
    )}
  </button>
);

// ─── Left Sidebar ─────────────────────────────────────────────────────────────
const LeftSidebar: React.FC = () => {
  const currentUser = useAppSelector((s) => s.auth.currentUser);
  const [showMore, setShowMore] = React.useState(false);

  return (
    <aside className="sticky top-14 h-[calc(100vh-56px)] overflow-y-auto scrollbar-hide py-2 px-2">
      {/* Current User */}
      <SidebarItem
        icon={
          <img
            src={`https://localhost:7130${currentUser?.avatarUrl}`}
            alt="Avatar"
            className="w-9 h-9 rounded-full object-cover"
          />
        }
        label={currentUser?.fullName ?? 'Người dùng'}
        iconBg="bg-transparent p-0"
      />

      {/* Meta AI */}
      <SidebarItem
        icon={<MetaAIIcon />}
        label="Meta AI"
        iconBg="bg-gradient-to-br from-blue-600 via-purple-500 to-orange-500"
      />

      {/* Nav items */}
      <SidebarItem
        icon={<FriendsIcon />}
        label="Bạn bè"
        iconBg="bg-[#1877f2]"
        badge={5}
      />
      <SidebarItem
        icon={<GroupIcon />}
        label="Nhóm"
        iconBg="bg-[#1877f2]"
        badge={2}
      />
      <SidebarItem
        icon={<VideoIcon />}
        label="Video"
        iconBg="bg-red-600"
      />
      <SidebarItem
        icon={<SavedIcon />}
        label="Đã lưu"
        iconBg="bg-purple-600"
      />
      <SidebarItem
        icon={<MemoryIcon />}
        label="Kỷ niệm"
        iconBg="bg-cyan-600"
      />

      {/* Show more */}
      {!showMore && (
        <button
          onClick={() => setShowMore(true)}
          className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[#3a3b3c] transition-colors mt-1"
        >
          <div className="w-9 h-9 rounded-full bg-[#3a3b3c] flex items-center justify-center">
            <ChevronDownIcon />
          </div>
          <span className="text-[#e4e6eb] text-sm font-medium">Xem thêm</span>
        </button>
      )}

      {showMore && (
        <>
          <SidebarItem
            icon={
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M20 4H4v2l8 5 8-5V4zM4 13v7h16v-7l-8 5-8-5z" />
              </svg>
            }
            label="Marketplace"
            iconBg="bg-green-600"
          />
          <SidebarItem
            icon={
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M15 7.5V2H9v5.5l3 3 3-3zM7.5 9H2v6h5.5l3-3-3-3zM9 16.5V22h6v-5.5l-3-3-3 3zM16.5 9l-3 3 3 3H22V9h-5.5z" />
              </svg>
            }
            label="Gaming"
            iconBg="bg-indigo-600"
          />
        </>
      )}

      {/* Divider */}
      <div className="h-px bg-[#3e4042] my-2 mx-2" />

      {/* Shortcuts */}
      <p className="text-[#e4e6eb] text-base font-semibold px-2 py-1">Lối tắt của bạn</p>
      <SidebarItem
        icon={<img src="https://picsum.photos/seed/group1/40/40" alt="" className="w-9 h-9 rounded-lg object-cover" />}
        label="Cộng đồng Lập trình VN"
        iconBg="bg-transparent p-0"
      />
      <SidebarItem
        icon={<img src="https://picsum.photos/seed/group2/40/40" alt="" className="w-9 h-9 rounded-lg object-cover" />}
        label="ReactJS Vietnam"
        iconBg="bg-transparent p-0"
      />

      {/* Footer links */}
      <div className="mt-4 px-2">
        <p className="text-[#b0b3b8] text-[11px] leading-relaxed">
          Quyền riêng tư · Điều khoản · Quảng cáo · Lựa chọn quảng cáo · Cookie · Xem thêm · Meta © 2024
        </p>
      </div>
    </aside>
  );
};

export default LeftSidebar;
