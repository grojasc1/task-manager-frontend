import React, { createContext, useContext, useState, useEffect } from 'react';

// URL del backend
const API_URL = 'https://task-manager-backend-production-5cb8.up.railway.app/api/tasks';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Cargar tareas desde el backend
  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL, {mode: 'cors'});
      if (!response.ok) {
        console.error('Error en la respuesta:', response.status, response.statusText);
        throw new Error('Error al obtener tareas');
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error en la conexión',error.message);
    }
  };

  // Eliminar tarea en el backend y actualizar el estado
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Error al eliminar tarea');
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  // Cargar tareas al montar el componente
  useEffect(() => {
    fetchTasks();
  }, []);

  const value = {
    tasks,
    deleteTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export default TaskProvider;
