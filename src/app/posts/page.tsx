'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import PostForm from '@/components/PostForm';
import PostItem from '@/components/PostItem';
import { Post } from '@/lib/types';

export default function PostsPage() {
  const { posts, getAllPosts, createPost, updatePost, deletePost } =
    useLocalStorage();
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleCreatePost = (title: string, content: string) => {
    createPost(title, content);
  };

  const handleUpdatePost = (title: string, content: string) => {
    if (currentPost) {
      updatePost(currentPost.id, { title, content });
      setCurrentPost(null);
      setIsEditing(false);
    }
  };

  const handleEdit = (post: Post) => {
    setCurrentPost(post);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(id);
    }
  };

  const handleCancelEdit = () => {
    setCurrentPost(null);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link href="/" className="text-white hover:underline">
          Back to Home
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="border border-gray-700 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? 'Edit Post' : 'Create New Post'}
            </h2>

            <PostForm
              post={currentPost || undefined}
              onSubmit={isEditing ? handleUpdatePost : handleCreatePost}
            />

            {isEditing && (
              <button
                onClick={handleCancelEdit}
                className="mt-2 text-gray-300 hover:text-gray-500"
              >
                Cancel Editing
              </button>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">All Posts</h2>

          {posts.length === 0 ? (
            <div className="p-6 rounded-lg shadow text-center">
              <p className="text-gray-500">
                No posts yet. Create your first post!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostItem
                  key={post.id}
                  post={post}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
