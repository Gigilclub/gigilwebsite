'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { BlogCard } from '@/components/ui/BlogCard'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { staggerContainer, fadeInUp } from '@/lib/animations'

interface BlogPost {
  id: string
  title: string
  image: string
  excerpt: string
  slug: string
  publishedAt: string
}

interface BlogShowcaseProps {
  posts: BlogPost[]
  title?: string
  subtitle?: string
  showViewAll?: boolean
  limit?: number
}

export function BlogShowcase({ 
  posts, 
  title = "Latest from our blog",
  subtitle = "Stories, tips, and ideas to help you find the perfect gift",
  showViewAll = true,
  limit = 3
}: BlogShowcaseProps) {
  const displayPosts = limit ? posts.slice(0, limit) : posts

  return (
    <section className="py-3xl bg-gigil-off-white">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-playfair font-bold text-gigil-teal mb-6 text-3xl md:text-4xl lg:text-5xl"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-gigil-teal/80 text-lg"
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {displayPosts.map((post, index) => (
            <motion.div
              key={post.id}
              variants={fadeInUp}
              custom={index * 0.1}
              className="group"
            >
              <BlogCard 
                id={post.id}
                title={post.title}
                image={post.image}
                excerpt={post.excerpt}
                slug={post.slug}
                publishedAt={post.publishedAt}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        {showViewAll && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center"
          >
            <Button asChild variant="secondary" size="lg">
              <Link href="/blog">
                Read More Stories
              </Link>
            </Button>
          </motion.div>
        )}
      </Container>
    </section>
  )
}
