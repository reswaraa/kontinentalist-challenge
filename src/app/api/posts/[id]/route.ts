import { NextRequest, NextResponse } from 'next/server';

// Helper function to get posts from localStorage (with SSR handling)
const getPosts = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('posts') || '[]');
  }
  return [];
};

// Helper function to save posts to localStorage (with SSR handling)
const savePosts = (posts: any[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('posts', JSON.stringify(posts));
    return true;
  }
  return false;
};

// GET /api/posts/[id] - Get a single post
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const posts = getPosts();
    const post = posts.find((p: any) => p.id === params.id);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

// PATCH /api/posts/[id] - Update a post
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const posts = getPosts();
    const postIndex = posts.findIndex((p: any) => p.id === params.id);

    if (postIndex === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const body = await request.json();

    // Update only the fields that were provided
    const updatedPost = {
      ...posts[postIndex],
      ...(body.title && { title: body.title }),
      ...(body.content && { content: body.content }),
    };

    posts[postIndex] = updatedPost;

    if (!savePosts(posts)) {
      return NextResponse.json(
        { error: 'Operation not available' },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedPost);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

// DELETE /api/posts/[id] - Delete a post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const posts = getPosts();
    const postIndex = posts.findIndex((p: any) => p.id === params.id);

    if (postIndex === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const deletedPost = posts[postIndex];
    posts.splice(postIndex, 1);

    if (!savePosts(posts)) {
      return NextResponse.json(
        { error: 'Operation not available' },
        { status: 500 }
      );
    }

    return NextResponse.json(deletedPost);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
