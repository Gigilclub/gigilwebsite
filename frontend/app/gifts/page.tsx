import React from 'react'
import { Container } from '@/components/layout/Container'
import { GiftGrid } from '@/components/sections/GiftGrid'
import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { strapiClient, Gift } from '@/lib/strapiClient'

async function fetchGifts(): Promise<Gift[]> {
  // Always use sample data for frontend-only operation
  const { sampleGifts } = await import('@/lib/sampleData')
  return sampleGifts.map(gift => ({
    id: gift.id,
    title: gift.title,
    description: gift.description,
    price: parseInt(gift.priceRange.replace(/[^0-9]/g, '')),
    image: { data: { attributes: { url: gift.image, alternativeText: gift.title } } },
    category: { data: { attributes: { name: gift.category, slug: gift.category.toLowerCase() } } },
    slug: gift.title.toLowerCase().replace(/\s+/g, '-'),
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString()
  }))
}

export default async function GiftsPage() {
  const gifts = await fetchGifts()

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
              All Gifts
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="max-w-2xl mx-auto text-gigil-teal/80 text-lg"
            >
              Discover our curated collection of thoughtful gifts and experiences for every occasion.
            </motion.p>
          </motion.div>

          {/* Gift Grid */}
          <GiftGrid 
            gifts={gifts.map(gift => ({
              id: gift.id.toString(),
              title: gift.title,
              image: gift.image?.data?.attributes?.url || '/api/placeholder/800/600',
              category: gift.category?.data?.attributes?.name || 'General',
              priceRange: `$${gift.price}`,
              description: gift.description
            }))} 
            title=""
            subtitle=""
            showViewAll={false}
          />
        </div>
      </Container>
    </div>
  )
}
