// giftgpt/frontend/components/BlockRenderer.tsx
'use client'; // This directive is required for the external React library

import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';

interface BlockRendererProps {
  content: BlocksContent;
}

export default function BlockRenderer({ content }: BlockRendererProps) {
  if (!content) return null;

  // The 'prose' class comes from the @tailwindcss/typography plugin you installed.
  return (
    <div className="prose prose-lg mx-auto mt-4">
        <BlocksRenderer
            content={content}
        />
    </div>
  );
}