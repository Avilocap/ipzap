import React, { useState } from 'react';

const AddServer = ({ onAdd }) => {
  const [server, setServer] = useState({
    url: '',
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setServer({ ...server, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(server); 
    setServer({ url: '', username: '', password: '' }); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        name="url" 
        placeholder="URL" 
        value={server.url} 
        onChange={handleChange} 
        required 
      />
      <input 
        name="username" 
        placeholder="Usuario" 
        value={server.username} 
        onChange={handleChange} 
        required 
      />
      <input 
        type="password"
        name="password" 
        placeholder="Contraseña" 
        value={server.password} 
        onChange={handleChange} 
        required 
      />
      <button type="submit">Añadir Servidor</button>
    </form>
  );
};

export default AddServer;
