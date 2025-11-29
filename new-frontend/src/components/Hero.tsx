'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/Button'

export function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return
    
    const node = videoRef.current
    if (!node) return

    const handleVideoLoad = () => {
      setVideoLoaded(true)
      
      // Try to play the video
      node.play().catch((error) => {
        console.error('Video play failed:', error)
      })
    }

    const handleVideoError = (e: Event) => {
      console.error('Video error:', e)
      setVideoLoaded(false)
    }

    node.addEventListener('loadeddata', handleVideoLoad)
    node.addEventListener('error', handleVideoError)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoLoaded) {
          node.play().catch(() => {})
        } else {
          node.pause()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(node)
    
    return () => {
      observer.disconnect()
      node.removeEventListener('loadeddata', handleVideoLoad)
      node.removeEventListener('error', handleVideoError)
    }
  }, [isClient, videoLoaded])

  return (
    <motion.section
      className="relative h-screen flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        {isClient && (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="auto"
            onError={() => console.error('Video failed to load')}
          >
            <source src="/videos/hero/hero.mp4" type="video/mp4" />
          </video>
        )}
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Let me guide you to your perfect moment
        </motion.h1>
        
        <motion.p
          className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        >
          Discover thoughtfully curated gifts that turn moments into memories
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <Button variant="primary" size="lg" className="w-full sm:w-auto">
            Explore Gifts
          </Button>
          <Link href="/quiz">
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900"
            >
              Try Gigil AI
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </motion.section>
  )
}
