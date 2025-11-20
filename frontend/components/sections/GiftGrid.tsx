'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { GiftCard } from '@/components/ui/GiftCard'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { staggerContainer, fadeInUp } from '@/lib/animations'

interface Gift {
  id: string
  title: string
  image: string
  category: string
  priceRange: string
  description: string
}

interface GiftGridProps {
  gifts: Gift[]
  title?: string
  subtitle?: string
  showViewAll?: boolean
  limit?: number
}

export function GiftGrid({ 
  gifts, 
  title = "Explore Our Curated Collections",
  subtitle = "Handpicked experiences that create lasting memories",
  showViewAll = true,
  limit
}: GiftGridProps) {
  const displayGifts = limit ? gifts.slice(0, limit) : gifts

  return (
    <section className="py-3xl bg-gigil-cream">
      <Container size="xl">
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

        {/* Masonry Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
        >
          {displayGifts.map((gift, index) => (
            <motion.div
              key={gift.id}
              variants={fadeInUp}
              custom={index * 0.1}
              className="break-inside-avoid mb-6"
            >
              <GiftCard 
                id={gift.id}
                title={gift.title}
                image={gift.image}
                category={gift.category}
                priceRange={gift.priceRange}
                description={gift.description}
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
            className="text-center mt-16"
          >
            <Button asChild size="lg">
              <Link href="/gifts">
                View All Gifts
              </Link>
            </Button>
          </motion.div>
        )}
      </Container>
    </section>
  )
}
