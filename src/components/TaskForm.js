import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';

const TaskForm = () => {
  const { createTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('El título es obligatorio');
      return;
    }

    await createTask({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 bg-gray-100 rounded-lg shadow-md"
    >
      <h2 className="text-lg font-semibold text-gray-700">Agregar Tarea</h2>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border rounded-md"
      />
      <textarea
        placeholder="Descripción (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 border rounded-md"
      />
      <button
        type="submit"
        className="p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Agregar
      </button>
    </form>
  );
};

export default TaskForm;
