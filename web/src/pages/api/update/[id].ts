import { NextApiRequest, NextApiResponse } from 'next';
import { updateTask } from '@/modules/taskManager';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      const { id } = req.query;
      if (typeof id !== 'string') return res.status(400).json({ message: 'Invalid ID' });

      const taskId = parseInt(id, 10);
      const { title, description, persona, group, status } = req.body;

      const updatedTask = await updateTask(taskId, { title, description, persona, group, status });

      if (updatedTask) {
        res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
