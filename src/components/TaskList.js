import React, { useContext } from "react";

const TaskList = () => {
    const { tasks, loading, markComplete, removeTask } = useContext(TaskContext);
    const [filter, setFilter] = useState('all');

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'all') return true;
        return filter === 'completed' ? task.completed : !task.completed;
        return true;
    });

    return (
        <div className="w-full max-w-2xl mx-auto mt-8">
            <div className="mb-4">
                <label className="mr-2">Filtro: </label>
                <select onChange={(e) => setFilter(e.target.value)} value={filter} className="px-2 py-1 border rounded-md">
                    <option value="all">Todas</option>
                    <option value="completed">Completadas</option>
                    <option value="pending">Pendientes</option>
                </select>
            </div>
            <ul className="space-y-4">
                {loading ? (
                    <p>Cargando tareas...</p>
                ) : (
                    filteredTasks.map((task) => (
                        <Task key={task._id} task={task} markComplete={markComplete} removeTask={removeTask} />
                    ))
                )}
            </ul>
        </div>
    );
};

export default TaskList;