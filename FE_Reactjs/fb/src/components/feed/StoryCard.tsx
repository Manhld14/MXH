// src/components/feed/StoryCard.tsx
import React from 'react';
import type { Story } from '../../types';

interface StoryCardProps {
  story: Story;
  isAddStory?: boolean;
}

const StoryCard: React.FC<StoryCardProps> = ({ story, isAddStory = false }) => {
  if (isAddStory) {
    return (
      <div className="flex-shrink-0 w-28 h-48 rounded-xl overflow-hidden bg-[#3a3b3c] cursor-pointer relative group">
        <img
          src="https://i.pravatar.cc/150?img=3"
          alt="Create story"
          className="w-full h-[72%] object-cover group-hover:brightness-90 transition-all"
        />
        <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-[#242526] flex flex-col items-center justify-end pb-2 pt-4">
          <div className="absolute top-[55%] -translate-y-[55%] w-9 h-9 rounded-full bg-[#1877f2] flex items-center justify-center border-4 border-[#242526]">
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
          </div>
          <span className="text-[#e4e6eb] text-xs font-semibold text-center leading-tight">Tạo tin</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-shrink-0 w-28 h-48 rounded-xl overflow-hidden cursor-pointer relative group">
      {/* Background image */}
      <img
        src={story.imageUrl}
        alt={story.user.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
      {/* Avatar */}
      <div className="absolute top-3 left-3">
        <div className="w-9 h-9 rounded-full border-4 border-[#1877f2] overflow-hidden">
          <img
            src={story.user.avatarUrl}
            alt={story.user.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* Name */}
      <div className="absolute bottom-3 left-2 right-2">
        <p className="text-white text-xs font-semibold leading-tight line-clamp-2 drop-shadow">
          {story.user.name}
        </p>
      </div>
    </div>
  );
};

export default StoryCard;
