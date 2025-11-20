import React from 'react'
import HeroSection from '@/components/home/HeroSection'
import { GiftGrid } from '@/components/sections/GiftGrid'
import { BlogShowcase } from '@/components/sections/BlogShowcase'
import { AITeaser } from '@/components/sections/AITeaser'
import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'
import { sampleGifts, sampleBlogPosts } from '@/lib/sampleData'

export default function HomePage() {
  // Transform sample data to match component interfaces
  const transformedGifts = sampleGifts.map(gift => ({
    id: gift.id.toString(),
    title: gift.title,
    image: gift.image,
    category: gift.category,
    priceRange: gift.priceRange,
    description: gift.description
  }))

  const transformedPosts = sampleBlogPosts.map(post => ({
    id: post.id.toString(),
    title: post.title,
    image: post.image,
    excerpt: post.excerpt,
    slug: post.slug,
    publishedAt: post.publishedAt
  }))

  return (
    <main className="min-h-screen">
      <HeroSection />
      <GiftGrid gifts={transformedGifts} />
      <AITeaser />
      <BlogShowcase posts={transformedPosts} />
      <About />
      <Contact />
    </main>
  )
}
