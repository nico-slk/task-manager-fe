import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login');
  }

  return (
    <div>
      <h1>Bienvenido, {user ? user.nickname : 'Invitado'}</h1>
      <button onClick={() => logout()}>Cerrar Sesión</button>
    </div>
  );
};

export default Home;
