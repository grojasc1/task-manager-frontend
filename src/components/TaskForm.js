import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';

const TaskForm = () => {
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') return;

    const newTask = {
      id: Date.now().toString(), // ID temporal
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    addTask(newTask);
    setTitle('');
    setDescription('');
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título de la tarea"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción (opcional)"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Agregar
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
