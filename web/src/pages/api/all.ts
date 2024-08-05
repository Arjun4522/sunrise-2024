import { NextApiRequest, NextApiResponse } from 'next';
import { getAllTasks } from '@/modules/taskManager';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const allTasks = getAllTasks();
      res.status(200).json(allTasks);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
