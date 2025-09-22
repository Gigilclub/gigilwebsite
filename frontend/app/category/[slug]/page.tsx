async function fetchGifts(slug: string) {
  const api = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
  const res = await fetch(`${api}/api/categories/${slug}/gifts`, { next: { revalidate: 30 } });
  if (!res.ok) return [];
  return res.json();
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const gifts = await fetchGifts(params.slug);
  return (
    <div>
      <h1 className="text-3xl font-bold text-gigil-teal capitalize">{params.slug.replace('-', ' ')} gifts</h1>
      <div className="mt-8 grid gap-4 grid-cols-2 md:grid-cols-3">
        {gifts.map((g: any) => (
          <div key={g.id} className="rounded-md border border-gray-100 p-4 bg-white">
            <div className="font-medium text-gigil-teal">{g.name}</div>
            <div className="text-sm text-gray-600">{g.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}


