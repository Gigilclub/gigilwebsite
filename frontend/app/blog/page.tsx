import React from 'react'
import { Container } from '@/components/layout/Container'
import { BlogCard } from '@/components/ui/BlogCard'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { strapiClient, BlogPost } from '@/lib/strapiClient'

async function fetchPosts(): Promise<BlogPost[]> {
  // Always use sample data for frontend-only operation
  const { sampleBlogPosts } = await import('@/lib/sampleData')
  return sampleBlogPosts.map(post => ({
    id: post.id,
    title: post.title,
    content: post.excerpt,
    excerpt: post.excerpt,
    slug: post.slug,
    featuredImage: { data: { attributes: { url: post.image, alternativeText: post.title } } },
    author: { 
      data: { 
        attributes: { 
          name: 'GIGIL Team', 
          bio: 'Curating meaningful gifts',
          avatar: { data: { attributes: { url: '/api/placeholder/100/100' } } }
        } 
      } 
    },
    createdAt: post.publishedAt,
    updatedAt: post.publishedAt,
    publishedAt: post.publishedAt
  }))
}

export default async function BlogListPage() {
  const posts = await fetchPosts()

  return (
    <div className="min-h-screen bg-gigil-cream">
      <Container>
        <div className="py-3xl">
          {/* Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h1
              variants={fadeInUp}
              className="font-playfair font-semibold text-gigil-teal mb-4"
            >
              GIGIL Blog
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="max-w-2xl mx-auto text-gigil-teal/80 text-lg"
            >
              Stories, insights, and inspiration to help you find the perfect gift for every moment.
            </motion.p>
          </motion.div>

          {/* Blog Grid */}
          {posts.length > 0 ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  variants={fadeInUp}
                  custom={index}
                >
                  <BlogCard 
                    id={post.id.toString()}
                    title={post.title}
                    image={post.featuredImage?.data?.attributes?.url || '/api/placeholder/1200/630'}
                    excerpt={post.excerpt}
                    slug={post.slug}
                    publishedAt={post.publishedAt}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gigil-border rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gigil-teal/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="font-playfair font-semibold text-gigil-teal mb-2">
                No posts yet
              </h3>
              <p className="text-gigil-teal/60 mb-6">
                Check back soon for inspiring gift stories and tips.
              </p>
              <Button asChild>
                <a href="/">Back to Home</a>
              </Button>
            </motion.div>
          )}
        </div>
      </Container>
    </div>
  )
}
