'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { staggerContainer, fadeInUp } from '@/lib/animations'

export function Contact() {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const inquiryTypes = [
    'General Inquiry',
    'Gift Recommendation',
    'Order Support',
    'Partnership',
    'Press Inquiry',
    'Other'
  ]

  return (
    <section className="py-3xl bg-gigil-off-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="font-playfair font-bold text-gigil-teal mb-8 text-3xl"
            >
              Get in Touch
            </motion.h2>
            
            <Card>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gigil-teal mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gigil-border rounded-lg focus:ring-2 focus:ring-gigil-peach focus:border-transparent bg-gigil-cream text-gigil-teal placeholder-gigil-teal/50"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gigil-teal mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gigil-border rounded-lg focus:ring-2 focus:ring-gigil-peach focus:border-transparent bg-gigil-cream text-gigil-teal"
                  >
                    <option value="">Select inquiry type</option>
                    {inquiryTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gigil-teal mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gigil-border rounded-lg focus:ring-2 focus:ring-gigil-peach focus:border-transparent bg-gigil-cream text-gigil-teal placeholder-gigil-teal/50 resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Info & Footer */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-12"
          >
            {/* Brand Info */}
            <motion.div
              variants={fadeInUp}
            >
              <h3 className="font-playfair font-bold text-gigil-teal mb-4 text-2xl">
                Gigil
              </h3>
              <p className="text-gigil-teal/80 mb-6">
                Curating thoughtful gifts that turn moments into memories. 
                Every recommendation guides you toward the perfect moment.
              </p>
              
              <div className="space-y-2">
                <p className="text-gigil-teal font-medium">Business Inquiries</p>
                <a 
                  href="mailto:gigle.wave@gmail.com" 
                  className="text-gigil-peach hover:text-gigil-teal transition-colors duration-300"
                >
                  gigle.wave@gmail.com
                </a>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={fadeInUp}
            >
              <h4 className="font-playfair font-semibold text-gigil-teal mb-4">
                Follow Us
              </h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gigil-teal/60 hover:text-gigil-peach transition-colors duration-300">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297z"/>
                  </svg>
                </a>
                <a href="#" className="text-gigil-teal/60 hover:text-gigil-peach transition-colors duration-300">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-gigil-teal/60 hover:text-gigil-peach transition-colors duration-300">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </motion.div>

            {/* Copyright */}
            <motion.div
              variants={fadeInUp}
              className="pt-8 border-t border-gigil-border"
            >
              <p className="text-gigil-teal/60 text-sm">
                © {new Date().getFullYear()} Gigil. All rights reserved.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
