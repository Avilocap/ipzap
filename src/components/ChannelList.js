import React from 'react';

const ChannelList = ({ channels, onSelect }) => {
  return (
    <div>
      <h2>Canales</h2>
      <ul>
        {channels.map((channel) => (
          <li key={channel.stream_id} onClick={() => onSelect(channel.stream_id)}>
            {channel.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelList;
