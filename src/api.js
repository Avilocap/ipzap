import axios from 'axios';

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
