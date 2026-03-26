// src/hooks/useStories.ts
import { useState, useEffect } from 'react';
import type { Story } from '../types';
import { fetchStories } from '../services/api';

interface UseStoriesReturn {
  stories: Story[];
  loading: boolean;
  error: string | null;
}

export function useStories(): UseStoriesReturn {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchStories();
        setStories(data);
      } catch (err) {
        setError('Không thể tải stories.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { stories, loading, error };
}
