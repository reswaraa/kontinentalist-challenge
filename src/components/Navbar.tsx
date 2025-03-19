'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="font-bold text-xl">Kontinentalist Challenge</div>
          <div className="flex space-x-4">
            <Link href="/" className="px-3 py-2 rounded-md font-medium">
              Home
            </Link>
            <Link href="/stories" className="px-3 py-2 rounded-md font-medium">
              Stories
            </Link>
            <Link href="/posts" className="px-3 py-2 rounded-md font-medium">
              Posts
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
