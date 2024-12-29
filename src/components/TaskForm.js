import React from 'react';

const TaskForm = () => {
  return (
    <form className="mt-4">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Título de la tarea"
          className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Agregar
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
