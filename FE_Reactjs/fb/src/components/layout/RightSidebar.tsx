// src/components/layout/RightSidebar.tsx
import React from 'react';
import type { Ad, Contact } from '../../types';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const ADS: Ad[] = [
  {
    id: 'a1',
    title: 'Laptop Gaming MSI 2024',
    description: 'Hiệu năng mạnh mẽ, giá tốt nhất thị trường',
    imageUrl: 'https://picsum.photos/seed/ad1/80/80',
    sponsor: 'MSI Vietnam',
  },
  {
    id: 'a2',
    title: 'Khóa học Online Pro',
    description: 'Học lập trình từ cơ bản đến nâng cao',
    imageUrl: 'https://picsum.photos/seed/ad2/80/80',
    sponsor: 'EduTech',
  },
];

const CONTACTS: Contact[] = [
  { id: 'c1', user: { userId: 10, fullName: 'Minh Tú', avatarUrl: 'https://i.pravatar.cc/150?img=10' }, isOnline: true },
  { id: 'c2', user: { userId: 11, fullName: 'Lan Hương', avatarUrl: 'https://i.pravatar.cc/150?img=11' }, isOnline: true },
  { id: 'c3', user: { userId: 12, fullName: 'Thanh Bình', avatarUrl: 'https://i.pravatar.cc/150?img=12' }, isOnline: true },
  { id: 'c4', user: { userId: 13, fullName: 'Đình Dũng', avatarUrl: 'https://i.pravatar.cc/150?img=13' }, isOnline: false },
  { id: 'c5', user: { userId: 14, fullName: 'Khánh Ly', avatarUrl: 'https://i.pravatar.cc/150?img=20' }, isOnline: true },
  { id: 'c6', user: { userId: 15, fullName: 'Tuấn Anh', avatarUrl: 'https://i.pravatar.cc/150?img=15' }, isOnline: false },
  { id: 'c7', user: { userId: 16, fullName: 'Thu Nga', avatarUrl: 'https://i.pravatar.cc/150?img=16' }, isOnline: true },
];

// ─── Ad Card ─────────────────────────────────────────────────────────────────
const AdCard: React.FC<{ ad: Ad }> = ({ ad }) => (
  <button className="w-full flex gap-3 items-start hover:bg-[#3a3b3c] rounded-lg p-1 transition-colors text-left">
    <img
      src={ad.imageUrl}
      alt={ad.title}
      className="w-[100px] h-[100px] rounded-lg object-cover flex-shrink-0"
    />
    <div className="flex-1 min-w-0">
      <p className="text-[#e4e6eb] text-sm font-medium leading-tight line-clamp-2">{ad.title}</p>
      <p className="text-[#b0b3b8] text-xs mt-0.5 line-clamp-2">{ad.description}</p>
      <p className="text-[#b0b3b8] text-xs mt-1">
        <span className="inline-block w-2 h-2 rounded-full bg-[#b0b3b8] mr-1 align-middle" />
        {ad.sponsor}
      </p>
    </div>
  </button>
);

// ─── Contact Item ─────────────────────────────────────────────────────────────
const ContactItem: React.FC<{ contact: Contact }> = ({ contact }) => (
  <button className="w-full flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-[#3a3b3c] transition-colors text-left">
    <div className="relative flex-shrink-0">
      <img
        src={contact.user.avatarUrl}
        alt={contact.user.fullName}
        className="w-9 h-9 rounded-full object-cover"
      />
      {contact.isOnline && (
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#242526]" />
      )}
    </div>
    <span className="text-[#e4e6eb] text-sm font-medium">{contact.user.fullName}</span>
  </button>
);

// ─── Right Sidebar ────────────────────────────────────────────────────────────
const RightSidebar: React.FC = () => {
  return (
    <aside className="sticky top-14 h-[calc(100vh-56px)] overflow-y-auto scrollbar-hide py-2 px-2">
      {/* ─ Sponsored ─ */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2 px-1">
          <p className="text-[#e4e6eb] text-base font-semibold">Được tài trợ</p>
        </div>
        <div className="flex flex-col gap-2">
          {ADS.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#3e4042] my-2 mx-1" />

      {/* ─ Contacts ─ */}
      <div>
        <div className="flex items-center justify-between mb-1 px-1">
          <p className="text-[#e4e6eb] text-base font-semibold">Người liên hệ</p>
          <div className="flex gap-1">
            {/* Search icon */}
            <button className="w-8 h-8 rounded-full hover:bg-[#3a3b3c] flex items-center justify-center text-[#b0b3b8] transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </button>
            {/* More icon */}
            <button className="w-8 h-8 rounded-full hover:bg-[#3a3b3c] flex items-center justify-center text-[#b0b3b8] transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          {CONTACTS.map((contact) => (
            <ContactItem key={contact.id} contact={contact} />
          ))}
        </div>
      </div>

      {/* ─ Group conversations ─ */}
      <div className="mt-4">
        <div className="h-px bg-[#3e4042] my-2 mx-1 mb-3" />
        <div className="flex items-center justify-between mb-1 px-1">
          <p className="text-[#e4e6eb] text-base font-semibold">Cuộc trò chuyện nhóm</p>
          <button className="w-8 h-8 rounded-full hover:bg-[#3a3b3c] flex items-center justify-center text-[#b0b3b8] transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
            </svg>
          </button>
        </div>
        <p className="text-[#b0b3b8] text-xs px-2 py-1">
          Tạo cuộc trò chuyện nhóm để liên lạc với nhiều người cùng lúc.
        </p>
      </div>
    </aside>
  );
};

export default RightSidebar;
