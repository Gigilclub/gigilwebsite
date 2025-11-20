'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { staggerContainer, fadeInUp } from '@/lib/animations'

export function AITeaser() {
  return (
    <section className="py-3xl bg-gigil-off-white">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            variants={fadeInUp}
            className="relative"
          >
            {/* Coming Soon Badge */}
            <div className="inline-block bg-gigil-peach text-gigil-dark px-4 py-2 rounded-full text-sm font-medium mb-6">
              Coming soon
            </div>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="font-playfair font-bold text-gigil-teal mb-4 text-3xl md:text-4xl lg:text-5xl"
          >
            Meet Gigil AI
          </motion.h2>
          
          <motion.p
            variants={fadeInUp}
            className="text-gigil-teal/60 text-lg mb-8"
          >
            Your personal gift guide
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-gigil-teal/80 mb-12 text-lg max-w-2xl mx-auto"
          >
            Get personalized gift recommendations based on your preferences and occasion. 
            Answer a few questions, get perfect matches.
          </motion.p>

          {/* AI Icon/Visual */}
          <motion.div
            variants={fadeInUp}
            className="mb-12"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-gigil-peach to-gigil-teal rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="bg-gigil-peach text-gigil-dark hover:bg-gigil-peach/90 font-playfair">
              <Link href="/quiz">
                Notify me when ready
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
