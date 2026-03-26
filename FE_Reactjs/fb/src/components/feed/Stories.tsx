// src/components/feed/Stories.tsx
import React, { useRef } from 'react';
import { useStories } from '../../hooks/useStories';
import StoryCard from './StoryCard';

const Stories: React.FC = () => {
  const { stories, loading } = useStories();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'right' ? 240 : -240, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* Scroll left button */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-9 h-9 rounded-full bg-[#3a3b3c] shadow-lg hover:bg-[#4e4f50] flex items-center justify-center text-[#e4e6eb] transition-colors"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </button>

      {/* Stories scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide pb-1"
      >
        {/* Add story card */}
        <StoryCard
          story={{ id: 'add', user: { id: 'me', name: '', avatarUrl: '' }, imageUrl: '' }}
          isAddStory
        />

        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-28 h-48 rounded-xl bg-[#3a3b3c] animate-pulse" />
            ))
          : stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
      </div>

      {/* Scroll right button */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-9 h-9 rounded-full bg-[#3a3b3c] shadow-lg hover:bg-[#4e4f50] flex items-center justify-center text-[#e4e6eb] transition-colors"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      </button>
    </div>
  );
};

export default Stories;
