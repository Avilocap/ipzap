import React from 'react';
import PropTypes from 'prop-types';

const ChannelList = ({ channels, onSelect }) => {
  return (
    <div>
      <h2>Channels</h2>
      <ul>
        {channels.map((channel) => (
          <li key={channel.stream_id}>
            <button onClick={() => onSelect(channel.stream_id)}>
              {channel.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

ChannelList.propTypes = {
  channels: PropTypes.arrayOf(
    PropTypes.shape({
      stream_id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ChannelList;
