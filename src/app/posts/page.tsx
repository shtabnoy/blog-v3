import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Posts</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <article key={post.id} className="border-b pb-4">
            <Link
              href={`/posts/${post.slug}`}
              className="block hover:bg-gray-50 p-4 rounded"
            >
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              {post.description && (
                <p className="text-gray-600 mb-2">{post.description}</p>
              )}
              <time className="text-sm text-gray-500">
                {new Date(post.published_at).toLocaleDateString()}
              </time>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
