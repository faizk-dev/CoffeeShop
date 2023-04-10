import { ItemModel } from './src/models/models';

const items: any[] = [
    {
      name: 'Coffee',
      price: 2.99,
      taxRate: 0.08,
    },
    {
      name: 'Muffin',
      price: 2.49,
      taxRate: 0.10,
      discountItemId: '612df6c51f6a3c6d34aa6b36', // set the ID of the corresponding item that has a discount
    },
    {
      name: 'Cappuccino',
      price: 3.99,
      taxRate: 0.0,
    },
    {
      name: 'Latte',
      price: 4.29,
      taxRate: 1.0,
    },
    {
      name: 'Bagel',
      price: 2.99,
      taxRate: 0.08,
      discountItemId: '612df6c51f6a3c6d34aa6b36', // set the ID of the corresponding item that has a discount
    },
    {
      name: 'Orange Juice',
      price: 2.99,
      taxRate: 0.08,
    },
  ];




export default async function populateDB() {
    console.log('insert few items to database');

    try {
        await ItemModel.deleteMany({});
        console.log('Items deleted');

        await ItemModel.insertMany(items);
        console.log('Items inserted');

    } catch (err) {
        console.error(err);
    }
};
