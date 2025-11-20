import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, hover = false, padding = 'md', ...props }, ref) => {
    const paddingClasses = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    }

    const cardClasses = cn(
      'gigil-card',
      paddingClasses[padding],
      hover && 'cursor-pointer',
      className
    )

    if (hover) {
      return (
        <motion.div
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={cardClasses}
          ref={ref}
          {...(props as any)}
        >
          {children}
        </motion.div>
      )
    }

    return (
      <div
        className={cardClasses}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = "Card"

export { Card }
