import deleteIcon from '../../../public/delete.svg';
import { useTask } from '../../context/TaskContext';
import type { Task } from '../../interfaces/task.interface';
import CustomButton from '../common/CustomButton';

const Task = ({ task }: { task: Task; }) => {

  const { removeTask } = useTask();

  return (
    <div tabIndex={0} className="collapse bg-base-200 my-4">
      <div className="collapse-title text-xl font-medium">{task.title}</div>
      <div className="collapse-content flex flex-row justify-between">
        <p>{task.description}</p>
        <p>{task.completed}</p>
        <p>{task.creationDate}</p>
        <CustomButton text={`eliminar`} icon={deleteIcon} fn={() => removeTask(task.id || '')} style={'btn btn-error'} />
      </div>
    </div>
  );
};

export default Task;
