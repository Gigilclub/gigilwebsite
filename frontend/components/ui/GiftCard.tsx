import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

interface GiftCardProps {
  id: string | number
  title: string
  image: string
  category: string
  priceRange: string
  description: string
  className?: string
}

export function GiftCard({ 
  id, 
  title, 
  image, 
  category, 
  priceRange, 
  description, 
  className 
}: GiftCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("group", className)}
    >
      <div className="bg-gigil-off-white rounded-lg shadow-gigil-sm border border-gigil-border h-full flex flex-col overflow-hidden transition-all duration-300 group-hover:shadow-gigil-md">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-gigil-peach text-gigil-teal px-2 py-1 rounded-full text-xs font-medium">
              {category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="font-playfair text-xl font-semibold text-gigil-teal mb-3 line-clamp-2 group-hover:text-gigil-peach transition-colors duration-300">
            {title}
          </h3>
          
          <p className="text-gigil-dark text-sm mb-4 line-clamp-3 flex-1">
            {description}
          </p>

          {/* Price Range and CTA */}
          <div className="flex items-center justify-between mt-auto">
            <div className="text-lg font-playfair font-semibold text-gigil-teal">
              {priceRange}
            </div>
            
            <Link 
              href={`/gifts/${id}`}
              className="text-gigil-peach font-inter text-sm hover:underline transition-all duration-300"
            >
              View details
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
