import React from "react";

const TaskList = () => {
    return (
        <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700">Tareas</h2>
            <ul className="mt-2">
                {/* Aquí se mostrarán las tareas */}
                <li className="text-gray-600">No hay tareas disponibles</li>
            </ul>
        </div>
    );
};

export default TaskList;