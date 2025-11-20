'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export function About() {
  return (
    <section className="py-16 bg-gigil-cream">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            variants={fadeInUp}
            className="space-y-8"
          >
            <motion.p
              variants={fadeInUp}
              className="text-gigil-dark text-lg leading-relaxed"
            >
              At Gigil, we believe gifts are more than objects. They're promises of unforgettable moments. 
              We curate experiences that matter, turning ordinary occasions into extraordinary memories. 
              Every recommendation is crafted with care, designed to create connections that last.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-gigil-dark text-lg leading-relaxed"
            >
              Our mission: to make gift-giving effortless and meaningful. Every recommendation guides you 
              toward the perfect moment, helping you express what words cannot. Because the best gifts 
              aren't just given—they're felt.
            </motion.p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
