import { Router, Request, Response } from 'express';
import { GiftService } from '../services/giftService';

const router = Router();
const giftService = new GiftService();

/**
 * GET /api/gifts/:id
 * Get a single gift by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const gift = await giftService.getGiftById(id);

    if (!gift) {
      return res.status(404).json({
        error: 'Gift not found',
      });
    }

    res.json(gift);
  } catch (error) {
    console.error('Error fetching gift:', error);
    res.status(500).json({
      error: 'An error occurred while fetching the gift',
    });
  }
});

export default router;
