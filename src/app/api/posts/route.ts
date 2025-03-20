import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';

// In-memory database for demonstration purposes
let posts: any[] = [
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

// Validation schema
const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
});

// GET /posts
// Fetches all posts
export async function GET() {
  return NextResponse.json({
    data: posts,
    meta: {
      total: posts.length,
      page: 1,
      limit: 10,
    },
  });
}

// POST /posts
// Creates a new post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = postSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors },
        { status: 400 }
      );
    }

    const newPost = {
      id: (posts.length + 1).toString(),
      ...validation.data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    posts.push(newPost);
  } catch (err) {
    console.log('Error creating post:', err);
    return NextResponse.json({ error: 'Invalid Request' }, { status: 400 });
  } finally {
  }
}
