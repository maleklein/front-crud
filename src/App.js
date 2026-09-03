import React, { useState, useEffect } from 'react';
import UserTable from './components/UserTable';
import UserModal from './components/UserModal';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserManager from './components/UserManager';
import JobHistory from './components/JobHistory';
import JobAdd from './components/JobAdd';

const App = () => {
  const [users, setUsers] = useState([{ id: 1, name: 'Tania', username: 'floppydiskette' }]);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: null, name: '', username: '' });
  const [user, setUser] = useState(null);
  const [view, setView] = useState('login'); // 'login' o 'register'


  // Al cargar la app, verificamos si ya hay un usuario en localStorage
  useEffect(() => {
    console.log("¿Modo Mock activo?:", process.env.REACT_APP_USE_MOCK);
    const savedUser = localStorage.getItem('userData');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
      setView('inicio');// O la vista que desees por defecto
    }
  }, []);


  const handleLogin = (response) => {
    if (response.success) {
      // 1. Actualizamos el estado de React (esto dispara el re-render del Navbar)
      setUser(response.user);
      setIsAuthenticated(true);
      
      // 2. Cambiamos la vista
      setView('inicio');
      
      // Nota: El localStorage ya lo maneja el authService, 
      // pero si no, podrías hacerlo aquí también.
    }
  };

  
  const handleLogout = () => {
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUser(null);
    setView('login');
  };


  const handleRegister = (newUser) => {
    setView('login'); // Al terminar, lo mandamos al login
    alert('Usuario registrado con éxito. ¡Ya puedes iniciar sesión!');
  };


  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const deleteUser = (id) => setUsers(users.filter((user) => user.id !== id));

  const updateUser = (id, updatedUser) => {
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
    setEditing(false);
  };

  const editRow = (user) => {
    setEditing(true);
    setCurrentUser(user);
    // Disparamos el modal manualmente si es necesario o usamos data-bs-toggle en la tabla
  };

  const renderContent = () => {
  if (!isAuthenticated) {
    return view === 'login' ? 
     <LoginForm onLogin={handleLogin} onGoToRegister={() => setView('register')} />
      : 
        <RegisterForm 
        onRegister={handleRegister} 
        onGoToLogin={() => setView('login')} 
      />;
  }

  // Lógica de navegación interna post-login
  switch (view) {
    case 'usuarios-listado':
      return (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3">
            <h5 className="mb-0 text-secondary">Listado de Usuarios (Solo lectura)</h5>
          </div>
          <div className="card-body p-0">
            {/* showActions={false} oculta Editar y Eliminar */}
            <UserTable users={users} showActions={false} />
          </div>
        </div>
      );
    case 'usuarios-gestion':
     return (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <h5 className="mb-0 text-primary">Gestión de Usuarios</h5>
            {/* Botón Agregar exclusivo de esta vista */}
            <button 
              className="btn btn-success btn-sm" 
              data-bs-toggle="modal" 
              data-bs-target="#userModal"
              onClick={() => {
                setEditing(false);
                setCurrentUser({ id: null, name: '', username: '' });
              }}
            >
              + Agregar Usuario
            </button>
          </div>
          <div className="card-body p-0">
            {/* showActions={true} muestra Editar y Eliminar */}
            <UserTable 
              users={users} 
              editRow={editRow} 
              deleteUser={deleteUser} 
              showActions={true} 
            />
          </div>
        </div>
      ); // Tu componente de gestión
    case 'trabajos-historial':
      return <JobHistory />;
    case 'trabajos-nuevo':
      return <JobAdd />;
    default:
      return <h2 className="text-center mt-5">Bienvenido al Sistema</h2>;
  }
};

  return (
   <div className="App d-flex flex-column min-vh-100">
    
    {/* 1. NAVBAR FIJA */}
   <Navbar 
        isAuthenticated={isAuthenticated} 
        user={user} 
        onLogout={handleLogout} 
        setView={setView} 
      />

    {/* 2. CONTENIDO PRINCIPAL 
        flex-grow-1 empuja al footer hacia abajo si el contenido es corto.
        pt-5 compensa la altura de la navbar fija.
    */}
    <main className="flex-grow-1" style={{ paddingTop: '100px' }}>
      <div className="container mb-5">
        {renderContent()}
      </div>
    </main>

    {/* 3. MODAL (No afecta al diseño visual del scroll) */}
    <UserModal 
      key={editing ? `edit-${currentUser.id}` : 'add-new'}
      editing={editing} 
      currentUser={currentUser} 
      addUser={addUser} 
      updateUser={updateUser}
      setEditing={setEditing}
    />

    {/* 4. FOOTER 
        mt-auto asegura que si el contenido de arriba es poco, el footer se pegue al fondo.
    */}
    <Footer />
    
  </div>
  );
};

export default App;