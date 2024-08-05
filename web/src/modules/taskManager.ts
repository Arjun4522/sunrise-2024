// Task interface definition
interface Task {
  id: number;
  title: string;
  description: string;
  persona: string;
  group: number;
  status: string;
}

// Initialize task ID and tasks array
let taskId = 1;
const tasks: Task[] = [];  // Define tasks array once

// Function to create a new task
export async function createTask(title: string, description: string, persona: string, group: number): Promise<Task> {
  // Create a new task
  const newTask: Task = {
    id: taskId++,
    title,
    description,
    persona,
    group,
    status: 'pending',
  };

  tasks.push(newTask);  // Add the new task to the array
  return newTask;
}

// Get all tasks
export function getAllTasks(): Task[] {
  return tasks;
}

// Get all active (pending) tasks
export function getActiveTasks(): Task[] {
  return tasks.filter(task => task.status === 'pending');
}

// Complete a task by ID
export async function completeTask(taskId: number): Promise<Task | null> {
  const task = tasks.find(task => task.id === taskId);
  
  if (task) {
    task.status = 'completed'; // Update the task status
    return task;
  }

  return null; // Return null if the task was not found
}

// Delete a task by ID
export async function deleteTask(taskId: number): Promise<boolean> {
  const index = tasks.findIndex(task => task.id === taskId);
  
  if (index !== -1) {
    tasks.splice(index, 1); // Remove the task from the array
    return true;
  }

  return false; // Return false if the task was not found
}

// Update a task by ID
export async function updateTask(taskId: number, updates: Partial<Task>): Promise<Task | null> {
  const task = tasks.find(task => task.id === taskId);
  
  if (task) {
    // Update the task with the provided fields
    Object.assign(task, updates);
    return task;
  }

  return null; // Return null if the task was not found
}
