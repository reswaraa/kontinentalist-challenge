import { useState, useEffect } from 'react';
import { Post } from '@/lib/types';

// Generate a unique ID for new posts
export const generateId = (): string => {
  return Date.now().toString();
};

// Custom hook to handle posts in local storage
export const useLocalStorage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  // Load posts from localStorage on component mount
  useEffect(() => {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  // Get all posts
  const getAllPosts = (): Post[] => {
    return posts;
  };

  // Get a single post by ID
  const getPostById = (id: string): Post | undefined => {
    return posts.find((post) => post.id === id);
  };

  // Create a new post
  const createPost = (title: string, content: string): Post => {
    const newPost: Post = {
      id: generateId(),
      title,
      content,
      createdAt: new Date().toISOString(),
    };
    setPosts((prevPosts) => [...prevPosts, newPost]);
    return newPost;
  };

  // Update an existing post
  const updatePost = (id: string, updates: Partial<Post>): Post | null => {
    let updatedPost: Post | null = null;

    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === id) {
          updatedPost = { ...post, ...updates };
          return updatedPost;
        }
        return post;
      })
    );

    return updatedPost;
  };

  // Delete a post
  const deletePost = (id: string): boolean => {
    const initialLength = posts.length;
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    return posts.length !== initialLength;
  };

  return {
    posts,
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
  };
};
