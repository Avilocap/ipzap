// src/components/Player.js
import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const Player = ({ server, channelId }) => {
  const videoRef = useRef(null);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (videoRef.current) {
      const streamUrl = `${server.url}/live/${server.username}/${server.password}/${channelId}.m3u8`;

      // Configuración de Video.js
      const playerOptions = {
        autoplay: true,
        controls: true,
        sources: [{
          src: streamUrl,
          type: 'application/x-mpegURL'
        }]
      };

      // Inicializa el reproductor
      const _player = videojs(videoRef.current, playerOptions);
      setPlayer(_player);

      // Limpia el reproductor al desmontar el componente
      return () => {
        if (player !== null) {
          player.dispose();
        }
      };
    }
  }, [server, channelId]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered"></video>
    </div>
  );
};

export default Player;
