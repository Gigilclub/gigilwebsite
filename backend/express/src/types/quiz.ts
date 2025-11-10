// Quiz-related TypeScript interfaces

export interface QuizAnswers {
  recipient: 'him' | 'her' | 'kids' | 'teen' | 'anyone';
  budget: 'under-25' | '25-50' | '50-100' | '100-plus';
  interests: string[]; // ["tech", "sports", "arts", "food", "travel", etc.]
  occasion?: string; // "birthday", "anniversary", "holiday", "thank-you", "any"
}

export interface GiftRecommendation {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  price: number;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  url: string | null;
  matchScore?: number; // Optional score for ranking
}

export interface QuizResult {
  recommendations: GiftRecommendation[];
  totalMatches: number;
  filters: QuizAnswers;
}
