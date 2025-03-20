'use client';

import { useState, useEffect } from 'react';
import { fetchStories } from '@/lib/api';
import { Story } from '@/lib/types';
import StoryCard from '@/components/StoryCard';

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStories = async (pageNum: number) => {
    setLoading(true);
    try {
      const response = await fetchStories(pageNum);
      if (pageNum === 1) {
        setStories(response.data);
      } else {
        setStories((prev) => [...prev, ...response.data]);
      }
      setHasMore(response.meta.current_page < response.meta.last_page);
    } catch (err) {
      setError('Failed to load stories. Please try again.');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStories(1);
  }, []);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadStories(nextPage);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Stories</h1>
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-6 py-2 text-white rounded-md border border-gray-700 hover:bg-gray-700 disabled:bg-gray-500"
          >
            {loading ? 'Loading ...' : 'Load More'}
          </button>
        </div>
      )}

      {!hasMore && stories.length > 0 && (
        <p className="text-center mt-8 text-white">No more stories to load.</p>
      )}
    </div>
  );
}
