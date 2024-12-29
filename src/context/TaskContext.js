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
            const response = await fetch(API_URL, { mode: 'cors' });
            if (!response.ok) {
                console.error('Error en la respuesta:', response.status, response.statusText);
                throw new Error('Error al obtener tareas');
            }
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error('Error en la conexión', error.message);
        }
    };

    // Agregar tarea en el backend y actualizar el estado
    const createTask = async (taskData) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskData),
            });
            if (!response.ok) throw new Error('Error al agregar tarea');
            const newTask = await response.json();
            setTasks((prevTasks) => [...prevTasks, newTask]); // Actualizar estado
        } catch (error) {
            console.error(error.message);
        }
    };

    // Eliminar tarea en el backend y actualizar el estado
    const deleteTask = async (id) => {
        try {
          const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
          if (!response.ok) {
            console.error('Error al eliminar la tarea:', response.status, response.statusText);
            return; // Salimos si hay un error
          }
          // Filtrar la tarea eliminada del estado local
          setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
          console.log('Tarea eliminada correctamente');
        } catch (error) {
          console.error('Error en la conexión:', error.message);
        }
      };

    // Cargar tareas al montar el componente
    useEffect(() => {
        fetchTasks();
    }, []);

    const value = {
        tasks,
        deleteTask,
        createTask,
    };

    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export default TaskProvider;
