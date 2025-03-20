import { NextRequest, NextResponse } from 'next/server';

// GET /api/posts - Get all posts
export async function GET(request: NextRequest) {
  try {
    const posts =
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('posts') || '[]')
        : [];

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST /api/posts - Create a new post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    if (typeof window !== 'undefined') {
      const posts = JSON.parse(localStorage.getItem('posts') || '[]');
      const newPost = {
        id: Date.now().toString(),
        title: body.title,
        content: body.content,
        createdAt: new Date().toISOString(),
      };

      posts.push(newPost);
      localStorage.setItem('posts', JSON.stringify(posts));

      return NextResponse.json(newPost, { status: 201 });
    }

    return NextResponse.json(
      { error: 'Operation not available' },
      { status: 500 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
