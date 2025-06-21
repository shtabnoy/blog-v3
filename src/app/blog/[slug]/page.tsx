import { getPostBySlug, getPostSlugs } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc'; // For app directory (Next.js 13+)
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug: slug.replace(/\.mdx$/, '') }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) return notFound();

  return (
    <article className="prose">
      <h1>{post.meta.title}</h1>
      <p>{post.meta.date}</p>
      <MDXRemote source={post.content} />
    </article>
  );
}
