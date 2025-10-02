import { notFound } from "next/navigation";
import Link from "next/link";
import BlockRenderer from "components/BlockRenderer";

async function fetchPost(slug: string) {
  try {
    const url = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    const res = await fetch(
      `${url}/api/blogposts?filters[slug][$eq]=${slug}&populate=coverImage`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.data?.[0] || null;
  } catch {
    return null;
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await fetchPost(params.slug);
  if (!post) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  return (
    <article className="mx-auto max-w-3xl">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/blog" className="hover:text-gigil-teal">← Back to blog</Link>
      </nav>

      <header className="mb-6">
        <p className="text-xs uppercase tracking-wider text-gray-500">Gigil Blog</p>
        <h1 className="mt-2 text-4xl font-extrabold leading-tight text-gigil-teal">{post.title}</h1>
      </header>

      {post.coverImage?.url && (
        <img
          src={`${baseUrl}${post.coverImage.formats?.large?.url || post.coverImage.url}`}
          alt={post.title}
          className="mb-8 h-auto w-full rounded-xl object-cover shadow-sm"
        />
      )}

      <div className="prose prose-lg max-w-none">
        <BlockRenderer content={post.content} />
      </div>
    </article>
  );
}



