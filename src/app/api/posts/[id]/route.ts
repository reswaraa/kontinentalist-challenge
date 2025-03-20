import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';

// Access the same in-memory database
// In a real app, this would be a database connection
declare global {
  var posts: any[];
}

if (!global.posts) {
  global.posts = [
    {
      id: '1',
      title: 'First Post',
      content: 'This is the content of the first post',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Second Post',
      content: 'This is the content of the second post',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
}

// Validation schema for update
const updatePostSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  content: z.string().min(1, 'Content is required').optional(),
});

// GET /posts/[id]
// Fetches a specific post by ID
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const post = global.posts.find((post) => post.id === id);
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
  return NextResponse.json({ data: post });
}

// PATCH /posts/[id]
// Updates a specific post by ID
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const postIndex = global.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    const body = await request.json();
    const validation = updatePostSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors },
        { status: 400 }
      );
    }

    const updatedPost = {
      ...global.posts[postIndex],
      ...validation.data,
      updatedAt: new Date().toISOString(),
    };
    global.posts[postIndex] = updatedPost;
    return NextResponse.json({ data: updatedPost });
  } catch (err) {
    console.log('Error updating post:', err);
    return NextResponse.json({ error: 'Invalid Request' }, { status: 400 });
  }
}

// DELETE /posts/[id]
// Deletes a specific post by ID
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const postIndex = global.posts.findIndex((post) => post.id === id);
  if (postIndex === -1) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
  const deletedPost = global.posts[postIndex];
  global.posts.splice(postIndex, 1);
  return NextResponse.json({ data: deletedPost });
}
