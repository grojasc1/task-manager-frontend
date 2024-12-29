import React, { createContext, useContext, useState } from "react";

// Creamos el contexto
const TaskContext = createContext();

// Hook para acceder al contexto
export const useTasks = () => {
    return useContext(TaskContext);
}

// Proveedor del contexto
const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]); // Estado para almacenar las tareas

    // Función para agregar una tarea
    const addTask = (task) => {
        setTasks((prevTasks) => [...prevTasks, task]); 
    };

    // Función para actualizar una tarea (completarla/descompletarla o editarla)
    const updateTask = (id, updatedTask) => {
        setTasks((prevTasks) => {
            prevTasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task));
        });
    };

    // Función para eliminar una tarea
    const deleteTask = (id) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    // Contexto a proveer
    const value = {
        tasks,
        addTask,
        updateTask,
        deleteTask,
    };

    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export default TaskProvider;