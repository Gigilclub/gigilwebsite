'use client';

import { useState } from 'react';
import ProgressBar from '@/components/quiz/ProgressBar';
import QuizCard from '@/components/quiz/QuizCard';
import OptionButton from '@/components/quiz/OptionButton';
import MultiSelectButton from '@/components/quiz/MultiSelectButton';
import GiftCard from '@/components/quiz/GiftCard';

type RecipientType = 'him' | 'her' | 'kids' | 'teen' | 'anyone';
type BudgetType = 'under-25' | '25-50' | '50-100' | '100-plus';
type OccasionType = 'birthday' | 'anniversary' | 'holiday' | 'thank-you' | 'any';

interface QuizAnswers {
  recipient: RecipientType | null;
  budget: BudgetType | null;
  interests: string[];
  occasion: OccasionType | null;
}

interface GiftRecommendation {
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
  matchScore?: number;
}

const TOTAL_STEPS = 4;

const INTEREST_OPTIONS = [
  { value: 'tech', label: 'Technology', emoji: '💻' },
  { value: 'sports', label: 'Sports', emoji: '⚽' },
  { value: 'arts', label: 'Arts & Crafts', emoji: '🎨' },
  { value: 'food', label: 'Food & Cooking', emoji: '🍳' },
  { value: 'travel', label: 'Travel', emoji: '✈️' },
  { value: 'reading', label: 'Reading', emoji: '📚' },
  { value: 'music', label: 'Music', emoji: '🎵' },
  { value: 'gaming', label: 'Gaming', emoji: '🎮' },
  { value: 'fashion', label: 'Fashion', emoji: '👗' },
  { value: 'fitness', label: 'Fitness', emoji: '💪' },
];

export default function GiftingPage() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>({
    recipient: null,
    budget: null,
    interests: [],
    occasion: null,
  });
  const [recommendations, setRecommendations] = useState<GiftRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleInterest = (interest: string) => {
    setAnswers((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    // Validate answers
    if (!answers.recipient || !answers.budget || answers.interests.length === 0) {
      setError('Please answer all required questions');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';
      const response = await fetch(`${apiBase}/api/quiz`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient: answers.recipient,
          budget: answers.budget,
          interests: answers.interests,
          occasion: answers.occasion || 'any',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }

      const data = await response.json();
      setRecommendations(data.recommendations);
      setStep(TOTAL_STEPS + 1); // Move to results
    } catch (err) {
      setError('Unable to get recommendations. Please try again.');
      console.error('Error submitting quiz:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    setStep(1);
    setAnswers({
      recipient: null,
      budget: null,
      interests: [],
      occasion: null,
    });
    setRecommendations([]);
    setError(null);
  };

  // Results view
  if (step === TOTAL_STEPS + 1) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gigil-teal mb-3">
            Your Gift Recommendations
          </h1>
          <p className="text-gray-600">
            We found {recommendations.length} perfect {recommendations.length === 1 ? 'gift' : 'gifts'} for you!
          </p>
        </div>

        {recommendations.length === 0 ? (
          <div className="bg-gigil-peach bg-opacity-20 border border-gigil-peach rounded-xl p-8 text-center">
            <p className="text-lg text-gray-700 mb-4">
              No gifts found matching your criteria. Try adjusting your preferences!
            </p>
            <button
              onClick={handleRestart}
              className="bg-gigil-teal text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90"
            >
              Start Over
            </button>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {recommendations.map((gift) => (
                <GiftCard
                  key={gift.id}
                  name={gift.name}
                  description={gift.description}
                  price={gift.price}
                  imageUrl={gift.imageUrl}
                  category={gift.category.name}
                  url={gift.url}
                  matchScore={gift.matchScore}
                />
              ))}
            </div>
            <div className="text-center">
              <button
                onClick={handleRestart}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300"
              >
                Start New Quiz
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gigil-teal mb-4">Gifting Quiz</h1>
        <ProgressBar current={step} total={TOTAL_STEPS} />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Step 1: Recipient */}
      {step === 1 && (
        <QuizCard
          question="Who is the gift for?"
          description="Select the recipient type"
        >
          <OptionButton
            label="For Him"
            emoji="👨"
            selected={answers.recipient === 'him'}
            onClick={() => setAnswers({ ...answers, recipient: 'him' })}
          />
          <OptionButton
            label="For Her"
            emoji="👩"
            selected={answers.recipient === 'her'}
            onClick={() => setAnswers({ ...answers, recipient: 'her' })}
          />
          <OptionButton
            label="For Kids"
            emoji="👶"
            selected={answers.recipient === 'kids'}
            onClick={() => setAnswers({ ...answers, recipient: 'kids' })}
          />
          <OptionButton
            label="For Teens"
            emoji="🧑"
            selected={answers.recipient === 'teen'}
            onClick={() => setAnswers({ ...answers, recipient: 'teen' })}
          />
          <OptionButton
            label="For Anyone"
            emoji="👥"
            selected={answers.recipient === 'anyone'}
            onClick={() => setAnswers({ ...answers, recipient: 'anyone' })}
          />
        </QuizCard>
      )}

      {/* Step 2: Budget */}
      {step === 2 && (
        <QuizCard
          question="What's your budget?"
          description="Choose a price range"
        >
          <OptionButton
            label="Under $25"
            emoji="💵"
            selected={answers.budget === 'under-25'}
            onClick={() => setAnswers({ ...answers, budget: 'under-25' })}
          />
          <OptionButton
            label="$25 - $50"
            emoji="💰"
            selected={answers.budget === '25-50'}
            onClick={() => setAnswers({ ...answers, budget: '25-50' })}
          />
          <OptionButton
            label="$50 - $100"
            emoji="💸"
            selected={answers.budget === '50-100'}
            onClick={() => setAnswers({ ...answers, budget: '50-100' })}
          />
          <OptionButton
            label="$100+"
            emoji="💎"
            selected={answers.budget === '100-plus'}
            onClick={() => setAnswers({ ...answers, budget: '100-plus' })}
          />
        </QuizCard>
      )}

      {/* Step 3: Interests */}
      {step === 3 && (
        <QuizCard
          question="What are their interests?"
          description="Select all that apply (at least one)"
        >
          <div className="flex flex-wrap gap-2">
            {INTEREST_OPTIONS.map((interest) => (
              <MultiSelectButton
                key={interest.value}
                label={interest.label}
                emoji={interest.emoji}
                selected={answers.interests.includes(interest.value)}
                onClick={() => toggleInterest(interest.value)}
              />
            ))}
          </div>
        </QuizCard>
      )}

      {/* Step 4: Occasion */}
      {step === 4 && (
        <QuizCard
          question="What's the occasion?"
          description="Optional: helps us refine recommendations"
        >
          <OptionButton
            label="Birthday"
            emoji="🎂"
            selected={answers.occasion === 'birthday'}
            onClick={() => setAnswers({ ...answers, occasion: 'birthday' })}
          />
          <OptionButton
            label="Anniversary"
            emoji="💕"
            selected={answers.occasion === 'anniversary'}
            onClick={() => setAnswers({ ...answers, occasion: 'anniversary' })}
          />
          <OptionButton
            label="Holiday"
            emoji="🎄"
            selected={answers.occasion === 'holiday'}
            onClick={() => setAnswers({ ...answers, occasion: 'holiday' })}
          />
          <OptionButton
            label="Thank You"
            emoji="🙏"
            selected={answers.occasion === 'thank-you'}
            onClick={() => setAnswers({ ...answers, occasion: 'thank-you' })}
          />
          <OptionButton
            label="Any Occasion"
            emoji="🎁"
            selected={answers.occasion === 'any'}
            onClick={() => setAnswers({ ...answers, occasion: 'any' })}
          />
        </QuizCard>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handleBack}
          disabled={step === 1}
          className={`px-6 py-3 rounded-lg font-semibold ${
            step === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          ← Back
        </button>
        {step < TOTAL_STEPS ? (
          <button
            onClick={handleNext}
            disabled={
              (step === 1 && !answers.recipient) ||
              (step === 2 && !answers.budget) ||
              (step === 3 && answers.interests.length === 0)
            }
            className={`px-6 py-3 rounded-lg font-semibold ${
              (step === 1 && !answers.recipient) ||
              (step === 2 && !answers.budget) ||
              (step === 3 && answers.interests.length === 0)
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gigil-teal text-white hover:bg-opacity-90'
            }`}
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-gigil-teal text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 disabled:bg-gray-400"
          >
            {loading ? 'Finding Gifts...' : 'Get Recommendations 🎁'}
          </button>
        )}
      </div>
    </div>
  );
}
