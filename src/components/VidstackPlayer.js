import React from 'react';
import PropTypes from 'prop-types';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';

/**
 * Constructs the proxied URL for the stream.
 * @param {object} server - An object containing the server details.
 * @param {string} path - The path for the stream.
 * @returns {string} The constructed proxied URL.
 */
const constructProxiedUrl = (server, path) => {
  const proxyBaseUrl = 'https://7df0m8rq0a.execute-api.eu-west-3.amazonaws.com/prod/proxy';
  const baseUrl = server.url.replace(/\/+$/, ''); // Remove any trailing slashes
  const streamUrl = `${baseUrl}/${path}`;

  const url = new URL(proxyBaseUrl);
  url.searchParams.append('url', streamUrl);

  return url.toString();
};

/**
 * A React component that renders a Vidstack player for a specific channel.
 * @param {object} props - The component props.
 * @param {object} props.server - An object containing the server details.
 * @param {string} props.channelId - The ID of the channel to display.
 * @param {string} props.channelName - The name of the channel to display.
 * @returns {JSX.Element} The Vidstack player component.
 */
const VidstackPlayer = ({ server, channelId, channelName }) => {
  if (!server || !server.url || !server.username || !server.password || !channelId) {
    console.error('Invalid server or channel information');
    return <div>Error: Invalid stream URL or missing channel information.</div>;
  }

  const streamUrl = constructProxiedUrl(server, `live/${server.username}/${server.password}/${channelId}.m3u8`);

  return (
    <MediaPlayer autoPlay viewType="video" streamType="live:dvr" title={channelName} src={streamUrl}>
      <MediaProvider>
        <DefaultVideoLayout icons={defaultLayoutIcons} />
      </MediaProvider>
    </MediaPlayer>
  );
};

VidstackPlayer.propTypes = {
  server: PropTypes.shape({
    url: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }).isRequired,
  channelId: PropTypes.string.isRequired,
  channelName: PropTypes.string.isRequired
};

export default VidstackPlayer;
