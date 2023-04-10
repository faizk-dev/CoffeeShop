import express, { Request, Response } from 'express';
import { ItemModel, OrderModel } from '../models/models';
import { calculateTotalPrice } from '../common/utils';
import { sendNotification } from '../services/notification';

const router = express.Router();

// POST /orders
router.post('/', async (req: Request, res: Response) => {
    try {
        const { items } = req.body;

        // Check if payload has itemId and quantity
        if (!Array.isArray(items) || items.some(item => !item.itemId || !item.quantity)) {
            return res.status(400).json({ message: 'Invalid payload' });
        }

        const itemIds = items.map((item) => item.itemId);
        const foundItems = await ItemModel.find({ _id: { $in: itemIds } });

        if (foundItems.length !== itemIds.length) {
            return res.status(400).json({ message: 'One or more items not found' });
        }

        const itemsWithQty = items.map((obj) => {
            const foundItem = foundItems.find(elem => elem._id.toString() === obj.itemId);
            return { ...foundItem.toObject(), quantity: obj.quantity };
        });

        const { totalPrice, discountApplied } = calculateTotalPrice(itemsWithQty);

        const order = new OrderModel({ items: foundItems, totalPrice, discountApplied, status: 'Pending' });
        await order.save();
        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT /orders/:id
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const order = await OrderModel.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.status = status;
        if (status === 'Ready') {
            await sendNotification(order);
        }

        await order.save();
        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET /orders/:id
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const order = await OrderModel.findById(id);
        if (!order) {
            res.status(404).json({ error: `Order with id ${id} not found` });
            return;
        }
        res.json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export { router as orderRoutes };
