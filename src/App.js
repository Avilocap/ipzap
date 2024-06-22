import React, { useState, useEffect } from 'react';
import AddServer from './components/AddServer';
import CategoryList from './components/CategoryList';
import ChannelList from './components/ChannelList';
import VidstackPlayer from './components/VidstackPlayer';
import { getCategories, getChannels } from './api';

const App = () => {
  const [servers, setServers] = useState(() => {
    const savedServers = localStorage.getItem('servers');
    return savedServers ? JSON.parse(savedServers) : [];
  });
  const [selectedServer, setSelectedServer] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [categories, setCategories] = useState([]);
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState(null);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingChannels, setLoadingChannels] = useState(false);

  useEffect(() => {
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
    setLoadingCategories(true);
    setError(null);
    try {
      const response = await getCategories(server);
      setCategories(response.data);
    } catch (error) {
      console.error('Error loading categories:', error);
      setError('Error loading categories.');
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchChannels = async (server, categoryId) => {
    setLoadingChannels(true);
    setError(null);
    try {
      const response = await getChannels(server, categoryId);
      setChannels(response.data);
    } catch (error) {
      console.error('Error loading channels:', error);
      setError('Error loading channels.');
    } finally {
      setLoadingChannels(false);
    }
  };

  const handleAddServer = (newServer) => {
    setServers([...servers, { ...newServer, id: servers.length.toString() }]);
  };

  const handleSelectServer = (serverId) => {
    const server = servers.find(s => s.id === serverId);
    setSelectedServer(server);
    setSelectedCategory(null);
    setSelectedChannel(null);
    setCategories([]);
    setChannels([]);
  };

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedChannel(null);
    setChannels([]);
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
          <h2>Servers</h2>
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
          {loadingCategories ? (
            <p>Loading categories...</p>
          ) : (
            <CategoryList categories={categories} onSelect={handleSelectCategory} />
          )}
          {selectedCategory && (
            loadingChannels ? (
              <p>Loading channels...</p>
            ) : (
              <ChannelList channels={channels} onSelect={handleSelectChannel} />
            )
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
