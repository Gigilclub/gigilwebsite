import { getPrismaClient } from './database';
import { QuizAnswers, GiftRecommendation, QuizResult } from '../types/quiz';

/**
 * Gift Service - Contains business logic for gift recommendations
 */
export class GiftService {
  private prisma = getPrismaClient();

  /**
   * Find gift recommendations based on quiz answers
   * Implements custom filtering rules:
   * 1. Match recipient type (him, her, kids, teen, anyone)
   * 2. Match budget/price range
   * 3. Match at least one interest
   * 4. Optional: Match occasion
   */
  async findRecommendations(answers: QuizAnswers): Promise<QuizResult> {
    const { recipient, budget, interests, occasion } = answers;

    // Build the filter conditions
    const whereConditions: any = {
      // Recipient must match exactly OR be "anyone"
      recipientType: {
        in: [recipient, 'anyone'],
      },
      // Price range must match
      priceRange: budget,
    };

    // Interest matching: gift must have at least one matching interest
    if (interests && interests.length > 0) {
      whereConditions.interests = {
        hasSome: interests,
      };
    }

    // Occasion matching: if specified, gift must support it or be "any"
    if (occasion && occasion !== 'any') {
      whereConditions.occasion = {
        hasSome: [occasion, 'any'],
      };
    }

    // Query the database with filters
    const gifts = await this.prisma.gift.findMany({
      where: whereConditions,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calculate match scores for ranking
    const recommendations: GiftRecommendation[] = gifts.map((gift) => {
      let matchScore = 0;

      // Perfect recipient match gets +10, "anyone" gets +5
      if (gift.recipientType === recipient) {
        matchScore += 10;
      } else if (gift.recipientType === 'anyone') {
        matchScore += 5;
      }

      // Count matching interests (+5 per match)
      const matchingInterests = gift.interests.filter((interest) =>
        interests.includes(interest)
      );
      matchScore += matchingInterests.length * 5;

      // Exact occasion match gets +10
      if (occasion && gift.occasion.includes(occasion)) {
        matchScore += 10;
      }

      return {
        id: gift.id,
        name: gift.name,
        description: gift.description,
        imageUrl: gift.imageUrl,
        price: gift.price,
        category: gift.category,
        url: gift.url,
        matchScore,
      };
    });

    // Sort by match score (highest first)
    recommendations.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

    return {
      recommendations,
      totalMatches: recommendations.length,
      filters: answers,
    };
  }

  /**
   * Get all categories
   */
  async getAllCategories() {
    return this.prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  /**
   * Get gifts by category slug
   */
  async getGiftsByCategory(categorySlug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug: categorySlug },
      include: {
        gifts: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return category;
  }

  /**
   * Get a single gift by ID
   */
  async getGiftById(giftId: string) {
    return this.prisma.gift.findUnique({
      where: { id: giftId },
      include: {
        category: true,
      },
    });
  }
}
