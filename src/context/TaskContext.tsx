import React, { createContext, useContext, useState } from 'react';
import { Task } from '../interfaces/task.interface';
import { TaskService } from '../services/task.service';

interface TaskContextProps {
  tasks: Task[];
  task: Task | undefined;
  getTasks: () => void;
  getTask: (taskId: string) => void;
  addTask: (task: Task) => void;
  removeTask: (taskId: string) => void;
  toggleTask: (task: Task) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task>();

  const getTask = async (taskId: string): Promise<void> => {
    try {
      const task = await TaskService.getTask(taskId);

      if (!task) {
        throw new Error('Error al obtener la tarea');
      }

      setTask(task);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error al obtener la tarea:', error.response?.data || error.message);
    }
  };

  const addTask = async (body: Task): Promise<void> => {
    try {

      const newTask = await TaskService.createTask(body);

      if (!newTask) {
        throw new Error('Error al crear la tarea');
      }

      setTasks([...tasks, newTask]);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error al crear la tarea:', error.response?.data || error.message);
    }
  };

  const getTasks = async (): Promise<void> => {
    try {

      const tasks = await TaskService.getAllTasks();

      if (!tasks) {
        setTasks([]);
        throw new Error('Error al obtener las tareas');
      }

      setTasks(tasks);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error al obtener las tareas:', error.response?.data || error.message);
    }
  };

  const removeTask = async (taskId: string): Promise<void> => {
    try {

      const task = await TaskService.deleteTask(taskId);

      if (!task) {
        throw new Error(`Error al eliminar la tarea`);
      }

      const filteredTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(filteredTasks);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error al eliminar la tarea:', error.response?.data || error.message);
    }
  };

  const toggleTask = async (body: Task): Promise<void> => {
    try {

      const fetchTask = await TaskService.updateTask(body);

      if (!fetchTask) {
        throw new Error(`Error al cambiar el estado de la tarea`);
      }

      setTask(fetchTask);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error al cambiar el estado de la tarea:', error.response?.data || error.message);
    }
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      task,
      getTasks,
      getTask,
      addTask,
      removeTask,
      toggleTask
    }}>
      {children}
    </TaskContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTask = (): TaskContextProps => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within an TaskProvider');
  }
  return context;
};
