// Importación de dependencias y hooks necesarios
import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';

/**
 * Componente TaskForm
 * 
 * Este componente representa un formulario para crear una nueva tarea.
 * Utiliza un hook personalizado para agregar la tarea y maneja los estados locales
 * para el título y la descripción de la tarea.
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {Function} props.onClose - Función para cerrar el formulario.
 */
const TaskForm = ({ onClose }) => {
  const { addTask } = useTasks(); // Hook personalizado para agregar una nueva tarea

  // Estados locales para manejar el título y la descripción de la tarea
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  /**
   * Función para manejar el envío del formulario
   * 
   * @param {Event} e - El evento de envío del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    if (!title.trim()) { // Validar que el título no esté vacío
      alert('El título es obligatorio');
      return;
    }

    // Debugging: Indicar que se enviarán los datos al backend
    console.log('Enviar datos al backend para agregar una nueva tarea');
    await addTask({ title, description }); // Agregar la nueva tarea
    console.log('Tarea agregada correctamente');
    onClose(); // Cerrar el formulario después de agregar la tarea
  };

  // Renderizar el formulario de creación de tarea
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 bg-gray-100 rounded-lg shadow-md"
    >
      <h2 className="text-lg font-semibold text-gray-700">Nueva Tarea</h2>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Agregar Tarea
      </button>
    </form>
  );
};

export default TaskForm;
