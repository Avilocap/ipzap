import React from 'react';
import PropTypes from 'prop-types';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';

const VidstackPlayer = ({ server, channelId, channelName }) => {
  if (!server || !server.url || !server.username || !server.password || !channelId) {
    console.error("Invalid server or channel information");
    return <div>Error: Invalid stream URL or missing channel information.</div>;
  }

  const streamUrl = `${server.url}/live/${server.username}/${server.password}/${channelId}.m3u8`;

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
