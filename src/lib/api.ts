import { StoriesResponse } from './types';
import axios from 'axios';

export async function fetchStories(page: number = 1): Promise<StoriesResponse> {
  try {
    const response = await axios.get(
      `https://cryptodire.kontinentalist.com/api/v1/stories?page=${page}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = response.data;
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
  } catch (error) {
    console.error('Failed to fetch stories:', error);
    throw new Error('Failed to fetch stories');
  }
}
