import React from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/task/TaskList';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login');
  }

  return (
    <div className='container w-96 bg-gray-900text-neutral-300 flex-1 flex flex-col p-4 rounded-lg shadow-lg mt-10'>
      <header className='flex justify-between items-center pt-4 pb-4'>
        <h1>Bienvenido, {user ? user.nickname : 'Invitado'}</h1>
        <button onClick={() => logout()}>Cerrar Sesión</button>
      </header>

      <TaskList />
    </div>
  );
};

export default Home;
