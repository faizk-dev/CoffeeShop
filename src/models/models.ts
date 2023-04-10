import mongoose, { Document } from 'mongoose';

export interface ItemDoc extends Document {
  name: string;
  price: number;
  taxRate: number;
  discountItemId?: string;
}

const itemSchema = new mongoose.Schema<ItemDoc>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  taxRate: { type: Number, required: true },
  discountItemId: { type: String },
});

export const ItemModel = mongoose.model<ItemDoc>('Item', itemSchema);

export interface OrderDoc extends Document {
  items: ItemDoc[];
  totalPrice: number;
  status: 'Pending' | 'Ready' | 'Cancelled';
  discountApplied?: Boolean;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new mongoose.Schema<OrderDoc>({
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  totalPrice: { type: Number, required: true },
  discountApplied: { type: Boolean },
  status: { type: String, enum: ['Pending', 'Ready', 'Cancelled'], default: 'Pending' },
});

export const OrderModel = mongoose.model<OrderDoc>('Order', orderSchema);
