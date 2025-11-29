'use client';

import { useParams } from 'next/navigation';
import { useBlogPostBySlug } from '@/hooks/useBlog';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CategoryBadge } from '@/components/CategoryBadge';
import { Calendar, ArrowLeft } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import Link from 'next/link';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const { data: post, isLoading, error } = useBlogPostBySlug(slug);

  // Format content into paragraphs
  const formatContent = (content?: string): string[] => {
    if (!content) return [];
    
    // Split by double line breaks (paragraphs)
    const paragraphs = content.split(/\n\n+/).filter(p => p.trim().length > 0);
    
    // If no double line breaks, split by single line breaks
    if (paragraphs.length === 1) {
      return content.split(/\n/).filter(p => p.trim().length > 0);
    }
    
    return paragraphs;
  };

  const paragraphs = formatContent(post?.content);

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-8">
              {/* Back button skeleton */}
              <div className="h-10 w-32 bg-muted rounded" />
              
              {/* Image skeleton */}
              <div className="w-full h-96 bg-muted rounded-lg" />
              
              {/* Title skeleton */}
              <div className="space-y-4">
                <div className="h-12 bg-muted rounded w-3/4" />
                <div className="h-6 bg-muted rounded w-1/2" />
              </div>
              
              {/* Content skeleton */}
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-5/6" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Error State
  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">
              {error instanceof Error ? error.message : 'The blog post you are looking for does not exist.'}
            </p>
            <Link
              href="/#blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Back to Blog</span>
          </Link>

          {/* Hero Image */}
          <div className="relative w-full h-64 md:h-96 lg:h-[500px] rounded-lg overflow-hidden mb-8 md:mb-12 shadow-lg">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              quality={90}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            />
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-8 pb-8 border-b border-border">
            {/* Category */}
            <CategoryBadge category={post.category} />

            {/* Author */}
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm text-foreground">{post.author.name}</p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.publishedAt}>{post.date}</time>
            </div>
          </div>

          {/* Content */}
          <article className="prose prose-lg max-w-none">
            <div className="space-y-6 text-base md:text-lg leading-relaxed">
              {paragraphs.length > 0 ? (
                paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground leading-8 md:leading-9">
                    {paragraph.trim()}
                  </p>
                ))
              ) : (
                <p className="text-muted-foreground leading-8 md:leading-9">
                  {post.content || post.excerpt}
                </p>
              )}
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}

