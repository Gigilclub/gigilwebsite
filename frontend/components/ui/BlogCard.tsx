import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

interface BlogCardProps {
  id: string | number
  title: string
  image: string
  excerpt: string
  slug: string
  publishedAt: string
  className?: string
}

export function BlogCard({ 
  id, 
  title, 
  image, 
  excerpt, 
  slug, 
  publishedAt, 
  className 
}: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("group", className)}
    >
      <div className="bg-gigil-off-white rounded-lg shadow-gigil-sm border border-gigil-border h-full flex flex-col overflow-hidden transition-all duration-300 group-hover:shadow-gigil-md group-hover:scale-102">
        {/* Image */}
        <div className="relative aspect-[1200/630] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="font-playfair font-semibold text-gigil-teal mb-3 text-2xl line-clamp-2">
            {title}
          </h3>
          
          <p className="text-gigil-dark text-sm text-gigil-dark/60 mb-4">
            {formatDate(publishedAt)}
          </p>
          
          <p className="text-gigil-dark text-base mb-4 line-clamp-2 flex-1">
            {excerpt}
          </p>

          {/* Read More Link */}
          <Link 
            href={`/blog/${slug}`}
            className="text-gigil-peach font-inter text-sm hover:underline transition-all duration-300"
          >
            Read more →
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
