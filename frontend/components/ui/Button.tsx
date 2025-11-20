import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, children, ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center rounded cursor-pointer transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gigil-peach focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
    
    const variants = {
      primary: "bg-gigil-peach text-gigil-dark border-none font-playfair text-base font-semibold hover:opacity-80 hover:-translate-y-0.5",
      secondary: "bg-transparent border-2 border-gigil-peach text-gigil-teal font-playfair text-base font-semibold hover:opacity-80 hover:-translate-y-0.5",
      ghost: "bg-transparent border-none text-gigil-teal font-inter text-base font-medium hover:underline"
    }
    
    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg"
    }

    const buttonClasses = cn(
      baseClasses,
      variants[variant],
      sizes[size],
      className
    )

    if (asChild) {
      return (
        <div
          className={buttonClasses}
        >
          {children}
        </div>
      )
    }

    return (
      <motion.button
        whileHover={{ opacity: 0.8, y: -1 }}
        whileTap={{ scale: 0.98 }}
        className={buttonClasses}
        ref={ref}
        {...(props as any)}
      >
        {children}
      </motion.button>
    )
  }
)

Button.displayName = "Button"

export { Button }
