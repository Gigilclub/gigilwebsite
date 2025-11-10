import { ReactNode } from 'react';

interface QuizCardProps {
  question: string;
  description?: string;
  children: ReactNode;
}

export default function QuizCard({ question, description, children }: QuizCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gigil-teal mb-2">{question}</h2>
      {description && (
        <p className="text-gray-600 mb-6">{description}</p>
      )}
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}
