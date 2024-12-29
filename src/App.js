import React from 'react';
import { TaskProvider } from './context/TaskContext';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-100">
        <TaskForm />
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default App;
