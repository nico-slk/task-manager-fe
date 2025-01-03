import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './common/ProtectedRoute';
import Login from './components/form/auth/Login';
import Register from './components/form/auth/Register';
import { TaskProvider } from './context/TaskContext';
import Home from './home/Home';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<TaskProvider ><Home /></TaskProvider>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
