'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/Button';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

interface QuizAnswer {
  questionId: string;
  answer: string | string[];
}

interface QuizStep {
  id: string;
  question: string;
  type: 'single' | 'multiple' | 'text';
  options?: string[];
  placeholder?: string;
}

const QUIZ_STEPS: QuizStep[] = [
  {
    id: 'recipient',
    question: 'Who are you gifting to?',
    type: 'single',
    options: ['Friend', 'Family Member', 'Colleague', 'Partner', 'Other'],
  },
  {
    id: 'occasion',
    question: 'What\'s the occasion?',
    type: 'single',
    options: ['Birthday', 'Anniversary', 'Graduation', 'Wedding', 'Just Because', 'Holiday'],
  },
  {
    id: 'budget',
    question: 'What\'s your budget range?',
    type: 'single',
    options: ['Under $50', '$50 - $100', '$100 - $250', '$250 - $500', '$500+'],
  },
  {
    id: 'interests',
    question: 'What are their interests? (Select all that apply)',
    type: 'multiple',
    options: ['Tech & Gadgets', 'Fashion & Style', 'Books & Reading', 'Art & Design', 'Food & Cooking', 'Travel', 'Fitness & Wellness', 'Music'],
  },
  {
    id: 'sentiment',
    question: 'What feeling do you want to convey?',
    type: 'single',
    options: ['Gratitude', 'Celebration', 'Support', 'Love', 'Appreciation', 'Encouragement'],
  },
  {
    id: 'message',
    question: 'Any special message or context? (Optional)',
    type: 'text',
    placeholder: 'Tell us more about the person or occasion...',
  },
];

export function GiftingQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const step = QUIZ_STEPS[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === QUIZ_STEPS.length - 1;
  const progress = ((currentStep + 1) / QUIZ_STEPS.length) * 100;

  const handleAnswer = (value: string) => {
    if (step.type === 'multiple') {
      const currentAnswers = (answers[step.id] as string[]) || [];
      const newAnswers = currentAnswers.includes(value)
        ? currentAnswers.filter(a => a !== value)
        : [...currentAnswers, value];
      setAnswers({ ...answers, [step.id]: newAnswers });
    } else {
      setAnswers({ ...answers, [step.id]: value });
    }
  };

  const handleTextChange = (value: string) => {
    setAnswers({ ...answers, [step.id]: value });
  };

  const handleNext = () => {
    if (currentStep < QUIZ_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // TODO: Connect to backend API
    console.log('Quiz answers:', answers);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Quiz submitted! (Backend integration coming soon)');
    }, 1000);
  };

  const canProceed = () => {
    if (step.type === 'text') return true; // Text is optional
    if (step.type === 'multiple') {
      return (answers[step.id] as string[])?.length > 0;
    }
    return !!answers[step.id];
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground mb-4">
            <Sparkles className="h-4 w-4" />
            Gifting Quiz
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Find the Perfect Gift
          </h1>
          <p className="text-muted-foreground">
            Answer a few questions and we'll curate personalized gift recommendations
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentStep + 1} of {QUIZ_STEPS.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Quiz Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-card border border-border rounded-lg p-6 md:p-8 shadow-card"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            {step.question}
          </h2>

          <AnimatePresence mode="wait">
            {step.type === 'text' ? (
              <motion.textarea
                key="text-input"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                value={(answers[step.id] as string) || ''}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder={step.placeholder}
                className="w-full min-h-[120px] px-4 py-3 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            ) : step.type === 'multiple' ? (
              <motion.div
                key="multiple-options"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                {step.options?.map((option) => {
                  const isSelected = (answers[step.id] as string[])?.includes(option);
                  return (
                    <motion.button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      className={`w-full text-left px-4 py-3 rounded-md border-2 transition-all ${
                        isSelected
                          ? 'border-primary bg-primary/10 text-foreground'
                          : 'border-input bg-background text-foreground hover:border-primary/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {option}
                    </motion.button>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="single-options"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                {step.options?.map((option) => {
                  const isSelected = answers[step.id] === option;
                  return (
                    <motion.button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      className={`w-full text-left px-4 py-3 rounded-md border-2 transition-all ${
                        isSelected
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-input bg-background text-foreground hover:border-primary/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {option}
                    </motion.button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-6">
          <Button
            variant="secondary"
            onClick={handlePrevious}
            disabled={isFirstStep}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          {isLastStep ? (
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={!canProceed() || isSubmitting}
              isLoading={isSubmitting}
              className="flex items-center gap-2"
            >
              Get Recommendations
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center gap-2"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}




