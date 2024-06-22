import axios from 'axios';

// Función para obtener categorías de un servidor
export const getCategories = (server) => {
  const url = `${server.url}/player_api.php`;
  return axios.get(url, {
    params: {
      username: server.username,
      password: server.password,
      action: 'get_live_categories'
    }
  });
};

// Función para obtener canales de una categoría de un servidor
export const getChannels = (server, categoryId) => {
  const url = `${server.url}/player_api.php`;
  return axios.get(url, {
    params: {
      username: server.username,
      password: server.password,
      action: 'get_live_streams',
      category_id: categoryId
    }
  });
};
