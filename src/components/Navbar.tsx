'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (path: string) => {
    return pathname === path;
  };
  return (
    <nav className="text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="font-bold text-xl">Kontinentalist Challenge</div>
          <div className="flex space-x-4">
            <Link
              href="/"
              className={`px-3 py-2 border border-gray-700 rounded-md font-medium ${
                isActive('/') ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
            >
              Home
            </Link>
            <Link
              href="/stories"
              className={`px-3 py-2 border border-gray-700 rounded-md font-medium ${
                isActive('/stories') ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
            >
              Stories
            </Link>
            <Link
              href="/posts"
              className={`px-3 py-2 border border-gray-700 rounded-md font-medium ${
                isActive('/posts') ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
            >
              Posts
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
