import { useState, useEffect } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  persona: string;
  group: number;
  status: string;
}

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [persona, setPersona] = useState('');
  const [group, setGroup] = useState(0);

  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch('/api/all');
      const data = await response.json();
      setTasks(data);
    }

    fetchTasks();
  }, []);

  const handleCreateTask = async () => {
    const response = await fetch('/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, persona, group }),
    });

    if (response.ok) {
      const newTask = await response.json();
      setTitle('');
      setDescription('');
      setPersona('');
      setGroup(0);
      setTasks([...tasks, newTask]);
    }
  };

  const handleCompleteTask = async (id: number) => {
    const response = await fetch(`/api/complete/${id}`, {
      method: 'POST',
    });

    if (response.ok) {
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, status: 'completed' } : task
      ));
    }
  };

  const handleDeleteTask = async (id: number) => {
    const response = await fetch(`/api/delete/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#000', color: '#fff' }}>
      <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
        <div style={{ width: '50%', padding: '20px', borderRight: '1px solid #fff', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#000' }}>
          <h2 style={{ textAlign: 'center', color: '#fff', marginBottom: '20px' }}>Create Task</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleCreateTask(); }} style={{ width: '100%', maxWidth: '500px', backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.3)' }}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#fff' }}>Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#333', color: '#fff', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#fff' }}>Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#333', color: '#fff', boxSizing: 'border-box', minHeight: '100px' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#fff' }}>Persona:</label>
              <input
                type="text"
                value={persona}
                onChange={(e) => setPersona(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#333', color: '#fff', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#fff' }}>Group:</label>
              <input
                type="number"
                value={group}
                onChange={(e) => setGroup(Number(e.target.value))}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#333', color: '#fff', boxSizing: 'border-box' }}
              />
            </div>
            <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#0070f3', color: '#fff', fontSize: '16px', cursor: 'pointer', transition: 'background-color 0.3s ease', textAlign: 'center' }}>
              Create Task
            </button>
          </form>
        </div>

<div style={{ width: '50%', padding: '10px', boxSizing: 'border-box' }}>
  <h2 style={{ textAlign: 'center', color: '#fff' }}>Completed Tasks</h2>
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
    {tasks.filter(task => task.status === 'completed').map(task => (
      <div
        key={task.id}
        style={{
          border: '1px solid #444',
          borderRadius: '8px',
          padding: '20px',
          width: '250px',
          backgroundColor: '#1a1a1a',
          color: '#fff',
          boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
        }}
      >
        <h3 style={{ margin: '0 0 10px 0', color: '#4caf50' }}>{task.title}</h3>
        <p style={{ margin: '0 0 10px 0' }}>{task.description}</p>
        <p style={{ margin: '0 0 10px 0' }}><strong>Persona:</strong> {task.persona}</p>
        <p style={{ margin: '0 0 10px 0' }}><strong>Group:</strong> {task.group}</p>
        <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: '#4caf50' }}><strong>Status:</strong> {task.status}</p>
        <button onClick={() => handleDeleteTask(task.id)} style={{ backgroundColor: '#e53e3e', color: '#fff', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
      </div>
    ))}
  </div>
</div>

      </div>

      {/* Separator Line between upper and lower sections */}
      <div style={{ height: '1px', backgroundColor: '#fff', margin: '0 10px' }} />

      <div style={{ flex: 1, padding: '10px', overflowY: 'auto' }}>
  <h2 style={{ textAlign: 'center', color: '#fff' }}>Task List</h2>
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
    {tasks.filter(task => task.status !== 'completed').map(task => (
      <div
        key={task.id}
        style={{
          border: '1px solid #444',
          borderRadius: '8px',
          padding: '20px',
          width: '250px',
          backgroundColor: '#1a1a1a',
          color: '#fff',
          boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
        }}
      >
        <h3 style={{ margin: '0 0 10px 0', color: '#4caf50' }}>{task.title}</h3>
        <p style={{ margin: '0 0 10px 0' }}>{task.description}</p>
        <p style={{ margin: '0 0 10px 0' }}><strong>Persona:</strong> {task.persona}</p>
        <p style={{ margin: '0 0 10px 0' }}><strong>Group:</strong> {task.group}</p>
        <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: '#e53e3e' }}><strong>Status:</strong> {task.status}</p>
        <button onClick={() => handleCompleteTask(task.id)} style={{ backgroundColor: '#4caf50', color: '#fff', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer' }}>Complete</button>
        <button onClick={() => handleDeleteTask(task.id)} style={{ backgroundColor: '#e53e3e', color: '#fff', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
      </div>
    ))}
  </div>
</div>

    </div>
  );
}
