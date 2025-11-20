import React from 'react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '@/lib/animations'

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-gigil-cream">
      <Container>
        <div className="py-3xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              variants={fadeInUp}
              className="font-playfair font-semibold text-gigil-teal mb-6"
            >
              AI-Powered Gift Quiz
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              className="text-gigil-teal/80 text-lg mb-12"
            >
              Answer a few questions about your loved one and we'll recommend the perfect gift. 
              Our AI learns from your preferences to suggest thoughtful, personalized experiences.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="bg-gigil-off-white rounded-2xl p-12 border border-gigil-border"
            >
              <div className="w-24 h-24 bg-gigil-peach rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gigil-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              
              <h2 className="font-playfair font-semibold text-gigil-teal mb-4">
                Quiz Coming Soon
              </h2>
              
              <p className="text-gigil-teal/70 mb-8">
                We're working on an amazing AI-powered quiz that will help you find the perfect gift. 
                In the meantime, browse our curated collection of thoughtful gifts.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <a href="/gifts">Browse Gifts</a>
                </Button>
                
                <Button asChild variant="secondary" size="lg">
                  <a href="/">Back to Home</a>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </div>
  )
}
