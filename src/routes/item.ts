import express, { Request, Response } from 'express';
import { ItemModel } from '../models/models';

const router = express.Router();

// GET /items
router.get('/', async (req: Request, res: Response) => {
  try {
    const items = await ItemModel.find();
    res.send(items);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

router.put('/:itemId', async (req: Request, res: Response) => {
  try {
    const itemId = req.params.itemId;
    const { discountItemId } = req.body;

    const item = await ItemModel.findByIdAndUpdate(itemId, { discountItemId }, { new: true });

    if (!item) {
      return res.status(404).send('Item not found');
    }

    res.send(item);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export { router as itemRoutes };
