import { useEffect, useState } from 'react';
import { useTask } from '../../context/TaskContext';
import Task from './Task';

const TaskList = () => {
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const { tasks, getTasks } = useTask();

  useEffect(() => {
    getTasks();
    setTasksList(tasks);

  }, []);

  return (
    <div >
      {tasksList.length > 0 && tasksList.map((task) => (<Task key={task.id} task={task} />))}
    </div>
  );
};

export default TaskList;
