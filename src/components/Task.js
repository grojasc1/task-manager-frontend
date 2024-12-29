import React from 'react';

const Task = ({ task, markComplete, removeTask }) => {
  return (
    <li className="flex items-center justify-between p-4 border border-gray-300 rounded-md">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => markComplete(task._id)}
          className="mr-4"
        />
        <div>
          <h3 className={`font-bold ${task.completed ? 'line-through' : ''}`}>{task.title}</h3>
          <p className="text-sm text-gray-500">{new Date(task.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <button onClick={() => removeTask(task._id)} className="text-red-500">Eliminar</button>
    </li>
  );
};

export default Task;
