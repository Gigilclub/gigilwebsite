import React from 'react'

export function Footer() {
  return (
    <footer className="bg-gigil-cream border-t border-gigil-border">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center">
          <p className="text-gigil-teal/60 text-sm">
            © {new Date().getFullYear()} Gigil. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
