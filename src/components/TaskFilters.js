import React from 'react';

const TaskFilters = () => {
  return (
    <div className="flex items-center gap-4">
      <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
        Todas
      </button>
      <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
        Pendientes
      </button>
      <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
        Completadas
      </button>
    </div>
  );
};

export default TaskFilters;
