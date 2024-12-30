# Task Manager Frontend

Task Manager es una aplicación de gestión de tareas que te permite agregar, editar, eliminar y marcar tareas como completadas o pendientes. Esta aplicación está construida utilizando React para el frontend y un backend que gestiona las tareas mediante una API REST.

## Enlace a la aplicación desplegada

Puedes acceder a la aplicación desplegada en el siguiente enlace:

[Task Manager en Netlify](https://6771de9555c34f9a8c5ee6b3--task-manager-coally.netlify.app/)

## Características
- Crear tareas con un título, descripción opcional y estado de completado.
- Listar todas las tareas.
- Actualizar tareas existentes.
- Eliminar tareas.

---

## Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes componentes:
- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) (generalmente incluido con Node.js)

---

## Pasos para instalar y ejecutar el proyecto localmente

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/grojasc1/task-manager-frontend.git
   cd task-manager-frontend
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor:**
   ```bash
   npm start
   ```
   Esto iniciará el servidor en el puerto configurado (por defecto, `3000`).

---

# Detalles de configuración
Este proyecto no requiere configuraciones complejas para funcionar localmente. SIn embargo, si necesitas configurar algunas variables de entorno, puedes crear un archivo `.env` en la raíz del proyecto con las siguientes configuraciones:

---

## Variables de entorno:
Si deseas configurar el backend de la aplicación (si no es el que está desplegado actualmente en Netlify), puedes agregar la siguiente variable de entorno en el archivo `.env`:

```bash
REACT_APP_API_URL=<URL_DEL_BACKEND>
```
Este valor por defecto está configurado para usar el backend desplegado en:
```bash
https://task-manager-backend-production-5cb8.up.railway.app/api/tasks
```
---

## Tecnologías utilizadas
### Frontend:
- React.js
- React Context API
- Tailwind CSS

### Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- Jest (para pruebas)
- Swagger (para documentación interactiva)

### Base de datos:
- MongoDB

### Despliegue:
- Netlify (Frontend)
- Railway (Backend)

---

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

