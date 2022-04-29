import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
function PlayerAudio() {
  const { id } = useParams();
  const [url, setUrl] = useState('');
  const refAudio = useRef();
  const reloadAudio = () => {
    setUrl('http://localhost:8086/files/' + id);
    refAudio.current.audio.current.play();
  };

  // url = '';
  console.log(id);
  console.log(url);
  useEffect(() => {
    // document.getElementById('player').onLoad();
    setUrl('http://localhost:8086/files/' + id);
    // refAudio.current.audio.current.pause();
    // console.log(id);
    const audio = document.getElementById('myaudio');
    audio.load();
  }, [refAudio]);

  return (
    <div id='player'>
      <audio
        id='myaudio'
        // src={url}
        controls='controls'
        preload='none '
        crossOrigin='anonymous'
        style={{ width: '100%' }}
      >
        <source src={url} type='audio/mpeg' />
        Browser not support this audio!
      </audio>
    </div>
  );
}

export default PlayerAudio;
