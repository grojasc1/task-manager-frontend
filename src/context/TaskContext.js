import React, { createContext, useContext, useState, useEffect } from 'react';

// URL del backend
const API_URL = 'https://task-manager-backend-production-5cb8.up.railway.app/api/tasks';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [message, setMessage] = useState(null);

    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(null), 3000);
    };

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
            showMessage('Tarea agregada correctamente');
        } catch (error) {
            console.error(error.message);
            showMessage('Error al agregar tarea');
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
            showMessage('Tarea eliminada correctamente');
        } catch (error) {
            console.error('Error en la conexión:', error.message);
            showMessage('Error al eliminar tarea');
        }
    };

    // Actualizar tarea en el backend y actualizar el estado
    const updateTask = async (id, updatedTask) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTask),
            });
            if (!response.ok) {
                console.error('Error al actualizar la tarea:', response.status, response.statusText);
                showMessage('Error al actualizar tarea');
                return;
            }
            const updatedTaskFromBackend = await response.json();
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === id ? updatedTaskFromBackend : task
                )
            );
            showMessage('Tarea actualizada correctamente');
        } catch (error) {
            console.error('Error en la conexión:', error.message);
            showMessage('Error al actualizar tarea');
        }
    };

    // Cambiar el estado de 'completed' en el backend y actualizar el estado
    const toggleComplete = async (id, completed) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: !completed }), // Cambiamos el estado de 'completed'
            });
            if (!response.ok) {
                console.error('Error al actualizar el estado de la tarea:', response.status, response.statusText);
                return;
            }
            const updatedTask = await response.json();
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === id ? updatedTask : task
                )
            );
            console.log('Tarea actualizada correctamente');
            showMessage('Estado de la tarea actualizado correctamente');
        } catch (error) {
            console.error('Error en la conexión:', error.message);
            showMessage('Error al actualizar el estado de la tarea');
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
        updateTask,
        toggleComplete,
    };

    return <TaskContext.Provider value={{tasks, createTask, deleteTask, toggleComplete, updateTask, message, value}}>{children}</TaskContext.Provider>;
};

export default TaskProvider;
