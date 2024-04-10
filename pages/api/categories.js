import { mongooseConnect } from '../../lib/mongoose';
import { Category } from '../../models/Category';

export default async function handle(req, res) {
  await mongooseConnect();

  try {
    if (req.method === 'GET') {
      const categories = await Category.find().populate('parent');
      res.json(categories);
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
