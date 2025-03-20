import React from 'react';
import { Post } from '@/lib/types';

interface PostItemProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onEdit, onDelete }) => {
  return (
    <div className="rounded-lg p-4 border border-gray-700 shadow-sm">
      <h3 className="text-lg font-semibold">{post.title}</h3>
      <p className="text-gray-300 mt-2">{post.content}</p>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => onEdit(post)}
          className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(post.id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostItem;
