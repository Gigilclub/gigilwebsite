interface GiftCardProps {
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  category: string;
  url: string | null;
  matchScore?: number;
}

export default function GiftCard({
  name,
  description,
  price,
  imageUrl,
  category,
  url,
  matchScore,
}: GiftCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      {imageUrl && (
        <div className="aspect-square bg-gray-100 relative">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
          {matchScore && matchScore > 15 && (
            <div className="absolute top-3 right-3 bg-gigil-teal text-white px-3 py-1 rounded-full text-sm font-semibold">
              Top Match
            </div>
          )}
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-gigil-teal">{name}</h3>
          <span className="text-gigil-teal font-bold">${price.toFixed(2)}</span>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {category}
          </span>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gigil-teal hover:underline font-semibold"
            >
              View Product →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
