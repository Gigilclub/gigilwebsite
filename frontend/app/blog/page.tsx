async function fetchPosts() {
  try {
    const url = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    const res = await fetch(`${url}/api/blogposts?populate=coverImage`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

export default async function BlogListPage() {
  const posts = await fetchPosts();
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gigil-teal">Gigil Blog</h1>
        <p className="mt-2 text-gray-600">Stories, insights, and practices we love.</p>
      </header>
      <div className="grid gap-10 md:grid-cols-2">
        {posts.map((p: any) => (
          <a key={p.id} href={`/blog/${p.slug}`} className="group rounded-xl overflow-hidden bg-white shadow-sm ring-1 ring-gray-100 hover:shadow transition">
            {p.coverImage?.url && (
              <img
                src={`${baseUrl}${p.coverImage.formats?.large?.url || p.coverImage.url}`}
                alt={p.title}
                className="h-56 w-full object-cover"
              />
            )}
            <div className="p-5">
              <h2 className="text-2xl font-semibold group-hover:text-gigil-teal">
                {p.title}
              </h2>
            </div>
          </a>
        ))}
        {posts.length === 0 && (
          <div className="text-gray-500">
            No posts yet. Ask admin to add posts in Strapi.
          </div>
        )}
      </div>
    </div>
  );
}
