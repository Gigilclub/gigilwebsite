import { Router, Request, Response } from 'express';
import { GiftService } from '../services/giftService';
import { QuizAnswers } from '../types/quiz';

const router = Router();
const giftService = new GiftService();

/**
 * POST /api/quiz
 * Submit quiz answers and get gift recommendations
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const answers: QuizAnswers = req.body;

    // Validate required fields
    if (!answers.recipient || !answers.budget || !answers.interests) {
      return res.status(400).json({
        error: 'Missing required fields: recipient, budget, and interests are required',
      });
    }

    // Validate recipient type
    const validRecipients = ['him', 'her', 'kids', 'teen', 'anyone'];
    if (!validRecipients.includes(answers.recipient)) {
      return res.status(400).json({
        error: `Invalid recipient type. Must be one of: ${validRecipients.join(', ')}`,
      });
    }

    // Validate budget
    const validBudgets = ['under-25', '25-50', '50-100', '100-plus'];
    if (!validBudgets.includes(answers.budget)) {
      return res.status(400).json({
        error: `Invalid budget. Must be one of: ${validBudgets.join(', ')}`,
      });
    }

    // Get recommendations
    const result = await giftService.findRecommendations(answers);

    res.json(result);
  } catch (error) {
    console.error('Error processing quiz:', error);
    res.status(500).json({
      error: 'An error occurred while processing your quiz',
    });
  }
});

export default router;
