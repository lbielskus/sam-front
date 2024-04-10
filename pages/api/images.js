import { mongooseConnect } from '../../lib/mongoose';
import Media from '../../models/Media';

export default async function handle(req, res) {
  await mongooseConnect();

  try {
    if (req.method === 'GET') {
      const media = await Media.find();
      res.json(media);
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
