import { Variants } from "framer-motion"

// Disable animations during static generation
const isServer = typeof window === 'undefined'

// Page load animations
export const fadeInUp: Variants = {
  hidden: isServer ? {} : { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: isServer ? {} : { duration: 0.6, ease: "easeOut" }
  }
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

// Hover animations
export const hoverLift = {
  scale: 1.02,
  y: -4,
  transition: { duration: 0.3, ease: "easeInOut" }
}

export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.3, ease: "easeInOut" }
}

// Scroll-triggered animations
export const scrollReveal: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

// Button animations
export const buttonHover = {
  scale: 1.02,
  boxShadow: "0 10px 15px rgba(0,0,0,0.08)",
  transition: { duration: 0.3, ease: "easeInOut" }
}

export const buttonTap = {
  scale: 0.98,
  transition: { duration: 0.1 }
}
