import { Router, Request, Response } from 'express';
import { GiftService } from '../services/giftService';

const router = Router();
const giftService = new GiftService();

/**
 * GET /api/categories
 * Get all categories
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const categories = await giftService.getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      error: 'An error occurred while fetching categories',
    });
  }
});

/**
 * GET /api/categories/:slug/gifts
 * Get all gifts in a specific category
 */
router.get('/:slug/gifts', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const category = await giftService.getGiftsByCategory(slug);

    if (!category) {
      return res.status(404).json({
        error: 'Category not found',
      });
    }

    res.json(category);
  } catch (error) {
    console.error('Error fetching category gifts:', error);
    res.status(500).json({
      error: 'An error occurred while fetching category gifts',
    });
  }
});

export default router;
