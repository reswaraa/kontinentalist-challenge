import { StoriesResponse } from './types';
export async function fetchStories(page: number = 1): Promise<StoriesResponse> {
  const response = await fetch(
    `https://cryptodire.kontinentalist.com/api/v1/stories?page=${page}`,
    { next: { revalidate: 60 } }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch stories');
  }

  const data = await response.json();
  // Map the API response to the StoriesResponse type
  return {
    current_page: data.current_page,
    data: data.data.map((story: any) => ({
      id: story.id,
      title: story.title,
      dek: story.dek,
      hero_image: {
        url: story.hero_image.url,
      },
      slug: story.slug,
    })),
    meta: {
      current_page: data.current_page,
      from: (data.current_page - 1) * 15 + 1,
      last_page: data.current_page + 1, // Assume there's always a next page unless proven otherwise
      path: 'https://cryptodire.kontinentalist.com/api/v1/stories',
      per_page: 15,
      to: data.current_page * 15,
      total: data.current_page * 15 + 15, // This is a rough estimate
    },
  };
}
