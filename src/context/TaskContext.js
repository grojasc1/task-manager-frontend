import React, { createContext, useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []); 

    const fetchTasks = async () => {
        setLoading(true);
        const data = await getTasks();
        setTasks(data);
        setLoading(false);
    };

    const addTask = async (task) => {
        const newTask = await createTask(task);
        setTasks([...tasks, newTask]);
    };

    const editTask = async (id, updatedTask) => {
        const task = await updateTask(id, updatedTask);
        setTasks(tasks.map((t) => (t.id === id ? task : t)));
    };

    const removeTask = async (id) => {
        await deleteTask(id);
        setTasks(tasks.filter((t) => t.id !== id));
    };

    const markComplete = (id) => {
        const task = tasks.find((t) => t._id === id);
        editTask(id, { ...task, completed: !task.completed });
    };

    return (
        <TaskContext.Provider value={{ tasks, loading, addTask, editTask, removeTask, markComplete }}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskContext;