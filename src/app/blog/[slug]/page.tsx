import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) return notFound();

  return (
    <article className="max-w-4xl mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        {post.description && (
          <p className="text-xl text-gray-600 mb-4">{post.description}</p>
        )}
        <time className="text-sm text-gray-500">
          {new Date(post.published_at).toLocaleDateString()}
        </time>
      </header>

      <div className="prose max-w-none">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
