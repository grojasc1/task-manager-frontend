import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import EditTaskForm from './EditTaskForm';

const TaskList = () => {
  const { tasks, deleteTask, toggleComplete } = useTasks();
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all'); // Estado para el filtro

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      await deleteTask(id);
    }
  };

  const handleToggleComplete = async (task) => {
    await toggleComplete(task._id, task.completed);
  };

  // Filtrar las tareas según el estado seleccionado
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true; // 'all' muestra todas las tareas
  });

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold text-gray-700">Tareas</h2>

      {/* Filtro de tareas */}
      <div className="my-4">
        <label className="mr-2">Filtrar por estado:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        >
          <option value="all">Todas</option>
          <option value="completed">Completadas</option>
          <option value="pending">Pendientes</option>
        </select>
      </div>

      <ul className="mt-2">
        {filteredTasks.length === 0 ? (
          <li className="text-gray-600">No hay tareas disponibles.</li>
        ) : (
          filteredTasks.map((task) => (
            <li
              key={task._id}
              className="flex items-center justify-between p-4 mb-2 bg-gray-100 rounded-lg"
            >
              <div>
                <h3 className={`font-bold ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {task.title}
                </h3>
                <p className={`text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                  {task.description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className={`text-sm ${task.completed ? 'text-green-500' : 'text-yellow-500'} hover:underline`}
                  onClick={() => handleToggleComplete(task)}
                >
                  {task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
                </button>
                <button
                  className="text-sm text-blue-500 hover:underline"
                  onClick={() => setEditingTask(task)}
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

      {editingTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <EditTaskForm
            task={editingTask}
            onClose={() => setEditingTask(null)}
          />
        </div>
      )}
    </div>
  );
};

export default TaskList;
