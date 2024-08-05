import { NextApiRequest, NextApiResponse } from 'next';
import { deleteTask } from '@/modules/taskManager';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      if (typeof id !== 'string') return res.status(400).json({ message: 'Invalid ID' });

      const taskId = parseInt(id, 10);
      const success = await deleteTask(taskId);

      if (success) {
        res.status(200).json({ message: 'Task deleted successfully' });
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
