import React from 'react'
import { Container } from '@/components/layout/Container'
import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '@/lib/animations'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gigil-cream">
      <Container>
        <div className="py-3xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h1 className="font-playfair font-semibold text-gigil-teal mb-6">
                About GIGIL
              </h1>
              <p className="text-gigil-teal/80 text-lg">
                We believe that the best gifts aren't just objects—they're experiences that create lasting memories.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="prose prose-lg max-w-none prose-headings:font-playfair prose-headings:text-gigil-teal prose-p:text-gigil-teal/80 prose-a:text-gigil-peach prose-strong:text-gigil-teal"
            >
              <h2>Our Mission</h2>
              <p>
                At GIGIL, we're on a mission to revolutionize the way people give and receive gifts. 
                We understand that finding the perfect gift can be overwhelming, which is why we've 
                created a platform that combines human curation with AI-powered personalization.
              </p>

              <h2>What We Do</h2>
              <p>
                We curate a collection of thoughtful gifts and experiences that go beyond the ordinary. 
                From intimate moments to grand celebrations, every item in our collection is chosen for 
                its ability to create meaningful connections and lasting memories.
              </p>

              <h2>Our Values</h2>
              <ul>
                <li><strong>Thoughtfulness:</strong> Every gift tells a story and reflects the relationship between giver and receiver.</li>
                <li><strong>Quality:</strong> We partner with artisans, designers, and experience creators who share our commitment to excellence.</li>
                <li><strong>Personalization:</strong> Our AI-powered quiz helps you find gifts that truly resonate with the recipient.</li>
                <li><strong>Sustainability:</strong> We believe in responsible gifting that considers the impact on our planet.</li>
              </ul>

              <h2>Join Our Community</h2>
              <p>
                Whether you're looking for the perfect gift or want to share your own gifting stories, 
                we'd love to have you join our community of thoughtful gifters.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </div>
  )
}









