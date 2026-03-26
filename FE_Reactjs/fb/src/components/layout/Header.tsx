// src/components/layout/Header.tsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';


// ─── SVG Icons ───────────────────────────────────────────────────────────────
const HomeIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>);
const VideoIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z" /></svg>);
const StoreIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M20 4H4v2l8 5 8-5V4zM4 13v7h16v-7l-8 5-8-5z" /></svg>);
const GroupIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>);
const GamingIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M15 7.5V2H9v5.5l3 3 3-3zM7.5 9H2v6h5.5l3-3-3-3zM9 16.5V22h6v-5.5l-3-3-3 3zM16.5 9l-3 3 3 3H22V9h-5.5z" /></svg>);
const SearchIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>);
const MessengerIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.898 1.448 5.49 3.72 7.192V22l3.388-1.862A10.66 10.66 0 0012 20.486c5.523 0 10-4.145 10-9.243S17.523 2 12 2zm1.093 12.444l-2.548-2.718-4.97 2.718 5.467-5.803 2.609 2.718 4.909-2.718-5.467 5.803z" /></svg>);
const BellIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" /></svg>);
const MenuIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" /></svg>);

interface NavItemProps { icon: React.ReactNode; label: string; active?: boolean; }
const NavItem: React.FC<NavItemProps> = ({ icon, label, active }) => (
  <button title={label} className={`relative flex items-center justify-center h-full px-8 transition-colors group ${active ? 'text-[#1877f2] border-b-[3px] border-[#1877f2]' : 'text-[#b0b3b8] hover:bg-[#3a3b3c] rounded-lg mx-1'}`}>
    {icon}
    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#3a3b3c] text-[#e4e6eb] text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">{label}</span>
  </button>
);

interface IconBtnProps { icon: React.ReactNode; badge?: number; label: string; }
const IconBtn: React.FC<IconBtnProps> = ({ icon, badge, label }) => (
  <button title={label} className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#3a3b3c] hover:bg-[#4e4f50] text-[#e4e6eb] transition-colors">
    {icon}
    {badge !== undefined && badge > 0 && (
      <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1">{badge > 9 ? '9+' : badge}</span>
    )}
  </button>
);

const Header: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeNav, setActiveNav] = useState<string>('home');
  const [searchFocused, setSearchFocused] = useState(false);

  const navItems = [
    { id: 'home', icon: <HomeIcon />, label: 'Trang chủ' },
    { id: 'video', icon: <VideoIcon />, label: 'Video' },
    { id: 'marketplace', icon: <StoreIcon />, label: 'Marketplace' },
    { id: 'groups', icon: <GroupIcon />, label: 'Nhóm' },
    { id: 'gaming', icon: <GamingIcon />, label: 'Gaming' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#242526] shadow-lg flex items-center px-4">
      {/* Left */}
      <div className="flex items-center gap-2 min-w-[240px]">
        <a href="/" className="flex-shrink-0">
          <svg viewBox="0 0 40 40" className="w-10 h-10" fill="#1877f2">
            <path d="M40 20C40 8.954 31.046 0 20 0S0 8.954 0 20c0 9.983 7.314 18.257 16.875 19.754V25.781h-5.078V20h5.078v-4.406c0-5.01 2.985-7.781 7.554-7.781 2.189 0 4.48.39 4.48.39v4.922H26.44c-2.484 0-3.258 1.543-3.258 3.125V20h5.547l-.887 5.781h-4.66v13.973C32.686 38.257 40 29.983 40 20z"/>
          </svg>
        </a>
        <div className={`flex items-center gap-2 bg-[#3a3b3c] rounded-full px-3 py-2 transition-all ${searchFocused ? 'ring-2 ring-[#1877f2]' : ''}`}>
          <SearchIcon />
          <input type="text" placeholder="Tìm kiếm trên Facebook" className="bg-transparent text-[#e4e6eb] placeholder-[#b0b3b8] text-sm outline-none w-44" onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)} />
        </div>
      </div>

      {/* Center nav */}
      <nav className="flex-1 flex items-center justify-center h-full">
        {navItems.map((item) => (
          <div key={item.id} onClick={() => setActiveNav(item.id)} className="h-full">
            <NavItem icon={item.icon} label={item.label} active={activeNav === item.id} />
          </div>
        ))}
      </nav>

      {/* Right */}
      <div className="flex items-center gap-2 min-w-[240px] justify-end">
        <IconBtn icon={<MenuIcon />} label="Menu" />
        <IconBtn icon={<MessengerIcon />} badge={3} label="Messenger" />
        <IconBtn icon={<BellIcon />} badge={7} label="Thông báo" />
        <button title={currentUser?.fullName} className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#3a3b3c] hover:ring-[#1877f2] transition-all flex-shrink-0">
          <img src={`https://localhost:7130${currentUser?.avatarUrl}`} alt={currentUser?.fullName ?? 'Avatar'} className="w-full h-full object-cover" />
        </button>
      </div>
    </header>
  );
};

export default Header;
