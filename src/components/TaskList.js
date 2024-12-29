import React from 'react';
import { useTasks } from '../context/TaskContext';

const TaskList = () => {
  const { tasks, deleteTask } = useTasks();

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      await deleteTask(id); // Esperamos a que la tarea sea eliminada
    }
  };
  

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold text-gray-700">Tareas</h2>
      <ul className="mt-2">
        {tasks.length === 0 ? (
          <li className="text-gray-600">No hay tareas disponibles.</li>
        ) : (
          tasks.map((task) => (
            <li
              key={task._id}
              className="flex items-center justify-between p-4 mb-2 bg-gray-100 rounded-lg"
            >
              <div>
                <h3 className="font-bold text-gray-800">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="text-sm text-blue-500 hover:underline"
                  onClick={() => console.log('Editar', task.id)}
                >
                  Editar
                </button>
                <button
                  className="text-sm text-red-500 hover:underline"
                  onClick={() => handleDelete(task._id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TaskList;
