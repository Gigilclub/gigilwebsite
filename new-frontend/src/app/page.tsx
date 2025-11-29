'use client';

import { Hero } from "@/components/Hero";
import { Header } from "@/components/layout/Header";
import { GigilAISection } from "@/components/GigilAISection";
import { BlogCard } from "@/components/BlogCard";
import { useBlogPosts } from "@/hooks/useBlog";

const Index = () => {
  // Fetch blog posts from Strapi
  const { data: blogPosts, isLoading, error } = useBlogPosts();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with Background Video */}
      <section id="home">
        <Hero />
      </section>
      
      <GigilAISection />

      <main id="blog" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Blog Section Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Stories Worth Reading
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Discover captivating narratives, insightful perspectives, and beautiful design inspiration from our curated collection of articles.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-12 md:space-y-16">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="grid md:grid-cols-2 gap-8 items-center bg-card rounded-lg overflow-hidden shadow-card animate-pulse"
              >
                <div className="h-64 md:h-full bg-muted" />
                <div className="p-8 md:p-12 space-y-4">
                  <div className="h-6 w-24 bg-muted rounded" />
                  <div className="h-8 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-destructive mb-4">
              Failed to load blog posts. Please try again later.
            </p>
            <p className="text-sm text-muted-foreground">
              {error instanceof Error ? error.message : 'An unknown error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Blog Posts Grid */}
        {!isLoading && !error && blogPosts && blogPosts.length > 0 && (
          <div className="space-y-12 md:space-y-16">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && (!blogPosts || blogPosts.length === 0) && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No blog posts found.</p>
            <p className="text-sm text-muted-foreground">
              Check your Strapi CMS configuration or create some blog posts.
            </p>
          </div>
        )}

        {/* Footer CTA */}
        {!isLoading && !error && blogPosts && blogPosts.length > 0 && (
          <div className="mt-20 text-center">
            <p className="text-muted-foreground mb-4">Want more stories like these?</p>
            <button className="font-medium text-primary hover:underline underline-offset-4 transition-all">
              View All Articles →
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
