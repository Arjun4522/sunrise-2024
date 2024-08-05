import { NextApiRequest, NextApiResponse } from 'next';
import { createTask } from '@/modules/taskManager';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { title, description, persona, group } = req.body;

      // Validate the input
      if (!title || !description || !persona || !group) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Create the task
      const newTask = await createTask(title, description, persona, group);

      // Return the created task
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
