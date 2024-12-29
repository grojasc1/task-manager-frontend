import React from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilters from './components/TaskFilters';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Task Manager</h1>
        
        {/* Filtros */}
        <TaskFilters />

        {/* Formulario para agregar tareas */}
        <TaskForm />

        {/* Lista de tareas */}
        <TaskList />
      </div>
    </div>
  );
};

export default App;
