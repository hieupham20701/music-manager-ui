import React, { useState, useEffect, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
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
  }, [refAudio]);

  return (
    <div id='player'>
      <AudioPlayer
        autoPlay={false}
        preload='auto'
        style={{ borderRadius: '1rem' }}
        src={url}
        showSkipControls={true}
        showJumpControls={false}
        onLoadedData={reloadAudio}
        ref={refAudio}
        // header={`Now Playing: ${name}`}
      />
      {/* <audio
        controls
        // onPlayError={reloadAudio}
        src={url}
        id='player'
        type='audio/mpeg'
        autoPlay={false}
        ref={refAudio}
      ></audio> */}
    </div>
  );
}

export default PlayerAudio;
