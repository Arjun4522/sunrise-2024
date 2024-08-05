import { NextApiRequest, NextApiResponse } from 'next';
import { completeTask } from '@/modules/taskManager';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { id } = req.query;
      if (typeof id !== 'string') return res.status(400).json({ message: 'Invalid ID' });

      const taskId = parseInt(id, 10);
      const task = await completeTask(taskId);

      if (task) {
        res.status(200).json({ message: 'Task completed successfully', task });
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
