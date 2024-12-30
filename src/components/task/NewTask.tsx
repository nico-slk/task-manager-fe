import { useEffect, useState } from 'react';
import createTask from '../../assets/create.svg';
import { useTask } from '../../context/TaskContext';
import CustomButton from '../common/CustomButton';

const NewTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState('');

  const { addTask } = useTask();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'title') setTitle(value);
    if (name === 'description') setDescription(value);
  };

  useEffect(() => {
    const userId = sessionStorage.getItem('user');
    const userIdJson = userId ? JSON.parse(userId) : '';
    setUserId(userIdJson);
  }, []);


  return (
    <div tabIndex={0} className="collapse bg-base-200 mb-8">
      <div className="collapse-title text-xl font-medium ">Nueva tarea</div>
      <div className="collapse-content flex flex-row justify-between ">
        <p>Instertar nueva tarea</p>
        <input type="text" placeholder="Titulo" name="title" onChange={handleChange} className="input input-bordered w-full max-w-xs" />
        <input type="text" placeholder="Descripcion" name="description" onChange={handleChange} className="input input-bordered w-full max-w-xs" />
        <CustomButton text={`eliminar`} icon={createTask} fn={() => addTask({ title, description, userId })} style={'btn btn-error'} />
      </div>
    </div>
  );
};

export default NewTask;
