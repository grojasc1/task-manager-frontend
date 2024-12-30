import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';

const EditTaskForm = ({ task, onClose }) => {
  const { updateTask } = useTasks();

  // Debugging
  console.log('EditTaskForm -> task:', task);
  console.log('EditTaskForm -> onClose:', onClose);
  console.log('EditTaskForm -> updateTask:', updateTask);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('El título es obligatorio');
      return;
    }

    console.log('Enviar datos al backend para actualizar la tarea');
    await updateTask(task._id, { title, description });
    console.log('Tarea actualizada correctamente');
    onClose(); // Cerrar el formulario después de actualizar
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 bg-gray-100 rounded-lg shadow-md"
    >
      <h2 className="text-lg font-semibold text-gray-700">Editar Tarea</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border rounded-md"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 border rounded-md"
      />
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          className="p-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Guardar Cambios
        </button>
      </div>
    </form>
  );
};

export default EditTaskForm;
