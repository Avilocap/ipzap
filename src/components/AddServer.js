import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddServer = ({ onAdd }) => {
  const [server, setServer] = useState({
    url: '',
    username: '',
    password: ''
  });

  const handleChange = ({ target: { name, value } }) => {
    setServer(prevServer => ({ ...prevServer, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (server.url && server.username && server.password) {
      onAdd(server); 
      setServer({ url: '', username: '', password: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="url">URL</label>
      <input 
        id="url"
        name="url" 
        placeholder="URL" 
        value={server.url} 
        onChange={handleChange} 
        required 
      />
      <label htmlFor="username">Usuario</label>
      <input 
        id="username"
        name="username" 
        placeholder="Usuario" 
        value={server.username} 
        onChange={handleChange} 
        required 
      />
      <label htmlFor="password">Contraseña</label>
      <input 
        id="password"
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

AddServer.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default AddServer;
