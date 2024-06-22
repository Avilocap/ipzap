// src/components/VidstackPlayer.js
import React from 'react';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';

const VidstackPlayer = ({ server, channelId, channelName }) => {
  // Genera la URL del stream basada en los props
  const streamUrl = `${server.url}/live/${server.username}/${server.password}/${channelId}.m3u8`;
  console.log("streamUrl: ", streamUrl);
  return (
    <MediaPlayer autoPlay="true" viewType='video' streamType="live:dvr" title={channelName} src={streamUrl}>
      <MediaProvider>
        <DefaultVideoLayout icons={defaultLayoutIcons} />
      </MediaProvider>
    </MediaPlayer>
  );
};

export default VidstackPlayer;