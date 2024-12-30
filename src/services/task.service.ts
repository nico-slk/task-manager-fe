/* eslint-disable @typescript-eslint/no-explicit-any */
import { Task } from '../interfaces/task.interface';

export const TaskService = {
  getTask: async (taskId: string): Promise<Task | null> => {
    try {
      const fetchTask = await fetch(
        `http://localhost:3000/api/task/${taskId}`,
        {
          headers: {
            Authorization:
              'Bearer ' + JSON.parse(sessionStorage.getItem('token') || ''),
          },
        },
      );

      if (!fetchTask.ok) {
        const { message } = await fetchTask.json();
        throw new Error(`Error al obtener la tarea: ${message}`);
      }

      const response = await fetchTask.json();

      return response;
    } catch (error: any) {
      console.error('Error al obtener la tarea:', error);
      return null;
    }
  },

  getAllTasks: async (): Promise<Task[]> => {
    try {
      const fetchTasks = await fetch('http://localhost:3000/api/task/', {
        headers: {
          'Content-Type': 'application/json',
          authorization:
            'Bearer ' + JSON.parse(sessionStorage.getItem('token') || ''),
        },
      });

      if (!fetchTasks.ok) {
        const { message } = await fetchTasks.json();
        throw new Error(`Error al obtener las tareas: ${message}`);
      }

      const response = await fetchTasks.json();

      return response.success ? response.tasks.map((task: Task) => task) : [];
    } catch (error: any) {
      console.error('Error al obtener las tareas:', error);
      return [];
    }
  },

  createTask: async (task: Task): Promise<Task | null> => {
    try {
      const fetchTask = await fetch('http://localhost:3000/api/task/', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer ' + JSON.parse(sessionStorage.getItem('token') || ''),
        },
      });

      if (!fetchTask.ok) {
        const { message } = await fetchTask.json();
        throw new Error(`Error al crear la tarea: ${message}`);
      }

      const response = await fetchTask.json();

      return response;
    } catch (error: any) {
      console.error('Error al crear la tarea:', error);
      return null;
    }
  },

  updateTask: async (task: Task): Promise<Task | null> => {
    try {
      const fetchTask = await fetch(
        `http://localhost:3000/api/task/${task.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(task),
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer ' + JSON.parse(sessionStorage.getItem('token') || ''),
          },
        },
      );

      if (!fetchTask.ok) {
        const { message } = await fetchTask.json();
        throw new Error(`Error al actualizar la tarea: ${message}`);
      }

      const response = await fetchTask.json();

      return response;
    } catch (error: any) {
      console.error('Error al actualizar la tarea:', error);
      return null;
    }
  },

  deleteTask: async (taskId: string): Promise<Task | null> => {
    try {
      const fetchTask = await fetch(
        `http://localhost:3000/api/task/${taskId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization:
              'Bearer ' + JSON.parse(sessionStorage.getItem('token') || ''),
          },
        },
      );

      if (!fetchTask.ok) {
        const { message } = await fetchTask.json();
        throw new Error(`Error al eliminar la tarea: ${message}`);
      }

      const response = await fetchTask.json();

      return response;
    } catch (error: any) {
      console.error('Error al eliminar la tarea:', error);
      return null;
    }
  },
};
