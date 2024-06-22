import React, { useState, useEffect } from 'react';
import AddServer from './components/AddServer';
import CategoryList from './components/CategoryList';
import ChannelList from './components/ChannelList';
import VidstackPlayer from './components/VidstackPlayer';
import { getCategories, getChannels } from './api'; // Importa las funciones

const App = () => {
  const [servers, setServers] = useState(() => {
    // Recuperar servidores desde localStorage al cargar la aplicación
    const savedServers = localStorage.getItem('servers');
    return savedServers ? JSON.parse(savedServers) : [];
  });
  const [selectedServer, setSelectedServer] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [categories, setCategories] = useState([]);
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Guardar servidores en localStorage cada vez que cambian
    localStorage.setItem('servers', JSON.stringify(servers));
  }, [servers]);

  useEffect(() => {
    if (selectedServer) {
      fetchCategories(selectedServer);
    }
  }, [selectedServer]);

  useEffect(() => {
    if (selectedServer && selectedCategory) {
      fetchChannels(selectedServer, selectedCategory);
    }
  }, [selectedServer, selectedCategory]);

  const fetchCategories = async (server) => {
    try {
      const response = await getCategories(server);
      setCategories(response.data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
      setError('Error al cargar categorías.');
    }
  };

  const fetchChannels = async (server, categoryId) => {
    try {
      const response = await getChannels(server, categoryId);
      setChannels(response.data);
    } catch (error) {
      console.error('Error al cargar canales:', error);
      setError('Error al cargar canales.');
    }
  };

  const handleAddServer = (newServer) => {
    setServers([...servers, { ...newServer, id: servers.length.toString() }]);
  };

  const handleSelectServer = (serverId) => {
    setSelectedServer(servers.find(s => s.id === serverId));
    setSelectedCategory(null);
    setSelectedChannel(null);
  };

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedChannel(null);
  };

  const handleSelectChannel = (channelId) => {
    const channel = channels.find(c => c.stream_id === channelId);
    setSelectedChannel({ id: channelId, name: channel ? channel.name : 'Canal desconocido' });
  };

  return (
    <div>
      <AddServer onAdd={handleAddServer} />
      {servers.length > 0 && (
        <div>
          <h2>Servidores</h2>
          <ul>
            {servers.map((server) => (
              <li key={server.id} onClick={() => handleSelectServer(server.id)}>
                {server.url}
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedServer && (
        <>
          <CategoryList categories={categories} onSelect={handleSelectCategory} />
          {selectedCategory && (
            <ChannelList channels={channels} onSelect={handleSelectChannel} />
          )}
          {selectedChannel && (
            <VidstackPlayer
              server={selectedServer}
              channelId={selectedChannel.id}
              channelName={selectedChannel.name}
            />
          )}
        </>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default App;
