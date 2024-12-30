// Importación de dependencias y hooks necesarios
import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';

// Componente EditTaskForm que recibe la tarea a editar y una función para cerrar el formulario
const EditTaskForm = ({ task, onClose }) => {
  const { updateTask } = useTasks(); // Hook personalizado para actualizar la tarea

  // Debugging: Imprimir en consola los props y funciones recibidas
  console.log('EditTaskForm -> task:', task);
  console.log('EditTaskForm -> onClose:', onClose);
  console.log('EditTaskForm -> updateTask:', updateTask);

  // Estados locales para manejar el título y la descripción de la tarea
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    if (!title.trim()) { // Validar que el título no esté vacío
      alert('El título es obligatorio');
      return;
    }

    // Debugging: Indicar que se enviarán los datos al backend
    console.log('Enviar datos al backend para actualizar la tarea');
    await updateTask(task._id, { title, description }); // Actualizar la tarea
    console.log('Tarea actualizada correctamente');
    onClose(); // Cerrar el formulario después de actualizar
  };

  // Renderizar el formulario de edición de tarea
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 bg-gray-100 rounded-lg shadow-md"
    >
      <h2 className="text-lg font-semibold text-gray-700">Editar Tarea</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border rounded-md"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 border rounded-md"
      />
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          className="p-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Guardar Cambios
        </button>
      </div>
    </form>
  );
};

export default EditTaskForm;
