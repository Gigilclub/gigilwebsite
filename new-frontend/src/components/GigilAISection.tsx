'use client';

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export const GigilAISection = () => {
  const router = useRouter();
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleSectionClick = () => {
    router.push('/quiz');
  };
  
  return (
    <section
      id="gigil-ai"
      className="bg-secondary/10 py-16 md:py-24 cursor-pointer"
      onClick={handleSectionClick}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            <Sparkles className="h-4 w-4 text-amber-300" />
            Gigil AI concierge
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white leading-tight">
            Get unstuck on thoughtful gifting with a dedicated AI curator.
          </h2>
          <p className="text-base md:text-lg text-white/80 leading-relaxed">
            Share who you are gifting, the occasion, and the sentiment you want to convey.
            Gigil AI will turn that into a curated set of ideas drawn from expert stylists,
            cultural researchers, and rituals from around the world.
          </p>
          <div className="space-y-4 text-white/70 text-sm">
            <p>
              Take our quick quiz to discover personalized gift recommendations tailored to your recipient's interests, your budget, and the occasion.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button 
              className="bg-white text-black hover:bg-white/90"
              onClick={(e) => {
                e.stopPropagation();
                router.push('/quiz');
              }}
            >
              Start the Gifting Quiz
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              onClick={() => scrollToSection('blog')}
            >
              Read Our Stories
            </Button>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-indigo-900 to-fuchsia-900 p-8 text-white shadow-2xl">
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_40%)]" />
          <div className="relative space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">
              Preview
            </p>
            <div className="space-y-4">
              <div className="rounded-2xl bg-black/40 p-5 backdrop-blur">
                <p className="text-xs text-white/60 mb-1">Gigil AI</p>
                <p className="text-lg font-medium">
                  Who are you gifting and what do you want them to feel?
                </p>
              </div>
              <div className="rounded-2xl bg-black/40 p-5 backdrop-blur">
                <p className="text-xs text-white/60 mb-1">You</p>
                <p className="text-base text-white/90">
                  My sister just launched her studio. I want something grounding yet bold.
                </p>
              </div>
              <div className="rounded-2xl bg-black/40 p-5 backdrop-blur border border-white/10">
                <p className="text-xs text-white/60 mb-1">Gigil AI</p>
                <p className="text-base text-white/90">
                  Beautiful. I’ll map options that mirror her creative energy and celebrate
                  her launch ritual.
                </p>
              </div>
            </div>
            <p className="text-sm text-white/70">
              Answer a few questions and get personalized gift recommendations in seconds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};



