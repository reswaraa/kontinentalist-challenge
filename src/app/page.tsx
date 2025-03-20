import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">
        Kontinentalist Take Home Coding Challenge
      </h1>
      <p className="text-lg mb-8">
        This project implements two tasks for the Kontinentalist coding
        challenge.
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="border p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Task 1: Stories List</h2>
          <p className="mb-4">
            Implementation of a stories list page that fetches data from the
            Kontinentalist API.
          </p>
          <Link
            className="inline-block px-4 py-2 rounded-md text-white border border-gray-700 hover:bg-gray-700"
            href="/stories"
          >
            View Stories
          </Link>
        </div>
        <div className="border p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            Task 2: Posts REST API
          </h2>
          <p className="mb-4">
            Implementation of a complete REST API for posts.
          </p>
          <Link
            className="inline-block px-4 py-2 rounded-md text-white border border-gray-700 hover:bg-gray-700"
            href="/posts"
          >
            Manage Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
