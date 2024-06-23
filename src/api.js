import axios from 'axios';

const proxyBaseUrl = 'https://7df0m8rq0a.execute-api.eu-west-3.amazonaws.com/prod/proxy';

/**
 * Constructs the proxied URL for the API requests.
 * @param {object} server - An object containing the server details.
 * @param {string} action - The API action to be performed.
 * @param {object} [additionalParams] - Additional parameters to be included in the request.
 * @returns {string} The constructed proxied URL.
 */
const constructProxiedUrl = (server, action, additionalParams = {}) => {
  const baseUrl = server.url.replace(/\/+$/, ''); // Remove any trailing slashes
  const apiUrl = `${baseUrl}/player_api.php`;
  const url = new URL(proxyBaseUrl);

  const targetParams = new URLSearchParams({
    username: server.username,
    password: server.password,
    action,
    ...additionalParams
  });

  url.searchParams.append('url', `${apiUrl}?${targetParams.toString()}`);

  return url.toString();
};

/**
 * Fetches the live categories from the server.
 * @param {object} server - An object containing the server details.
 * @returns {Promise<axios.AxiosResponse>} The categories response.
 */
export const getCategories = (server) => {
  const url = constructProxiedUrl(server, 'get_live_categories');
  return axios.get(url)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

/**
 * Fetches the live channels for a specific category.
 * @param {object} server - An object containing the server details.
 * @param {string} categoryId - The ID of the category to fetch channels for.
 * @returns {Promise<axios.AxiosResponse>} The channels response.
 */
export const getChannels = (server, categoryId) => {
  const url = constructProxiedUrl(server, 'get_live_streams', { category_id: categoryId });
  return axios.get(url)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};
