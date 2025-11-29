'use client'

import { Button } from "@/components/ui/button";
import { BookOpen, Menu } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-transparent hover:bg-black/90 transition-all duration-300 ease-in-out group">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <BookOpen className="h-6 w-6 text-white" />
            <h1 className="font-serif text-2xl font-bold text-white">Gigil</h1>
          </button>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('blog')}
              className="text-sm font-medium text-white hover:text-white/80 transition-colors"
            >
              Stories
            </button>
            <a href="#" className="text-sm font-medium text-white hover:text-white/80 transition-colors">
              Categories
            </a>
            <a href="#" className="text-sm font-medium text-white hover:text-white/80 transition-colors">
              About
            </a>
            <Link 
              href="/quiz"
              className="text-sm font-medium text-white hover:text-white/80 transition-colors"
            >
              Gigil AI
            </Link>
            <Button 
              variant="default" 
              size="sm" 
              className="ml-4 bg-white text-black hover:bg-white/90 transition-colors"
            >
              Subscribe
            </Button>
          </nav>

          {/* Mobile Menu */}
          <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/20">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};



