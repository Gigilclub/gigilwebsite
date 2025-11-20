'use client'

import Link from "next/link"
import { motion } from "framer-motion"

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" aria-label="GIGIL hero">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-gigil-teal/90 to-gigil-dark/90">
          <div className="w-full h-full bg-black/20"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-playfair font-bold text-white mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
          >
            Let me guide you to your perfect moment
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-inter"
          >
            Discover thoughtfully curated gifts that turn moments into memories
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link
              href="/gifts"
              className="bg-gigil-peach text-gigil-dark px-8 py-4 rounded font-playfair text-base font-semibold hover:opacity-80 transition-all duration-300 hover:-translate-y-1"
            >
              Explore Gifts
            </Link>

            <Link
              href="/quiz"
              className="border-2 border-white text-white bg-transparent px-8 py-4 rounded font-inter text-base font-medium hover:bg-white hover:text-gigil-teal transition-all duration-300"
            >
              Try Gigil AI
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

