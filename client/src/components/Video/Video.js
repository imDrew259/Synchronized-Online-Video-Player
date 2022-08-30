import React,{useState, useEffect, useRef} from 'react';
import './Video.css'
import ReactPlayer from 'react-player';

const Video = ({Socket}) => {
  
  const [URL, setURL] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [Error, setError] = useState(false);
  // const [PlaybackRate, setPlaybackRate] = useState(1);

  const reactPlayer = useRef();
  useEffect(() => {
    if(Socket){
      Socket.on('videoURLRecieved', (URL)=>{
        setURL(URL);
        
      })

      Socket.on('play', (t)=>{
        
        reactPlayer.current.seekTo(t, 'seconds');
        setIsPlaying(true);
        
      })

      Socket.on('pause', (t)=>{
        
        reactPlayer.current.seekTo(t, 'seconds');
        setIsPlaying(false);
        
      })
    }
  }, [Socket]);
  

  const handleUpload = ()=>{

    if(URL && !Error){
    if(Socket){      
      Socket.emit('videoURL', URL)
      
    }
    else{
      alert("Connection not established. Please try again")
    }
  }
  else{
    alert("Enter a valid URL");
  }
  }

  const handlePlay=()=>{
    if(Socket){
    if(!isPlaying){
      setIsPlaying(true);
      let t= reactPlayer.current.getCurrentTime();
      
      Socket.emit('play', t);
    }
  }
  else{
    alert("Connection not established. Please try again")
  }
  }

  const handlePause=()=>{
    if(Socket){
    if(isPlaying){
      setIsPlaying(false);
      let t=reactPlayer.current.getCurrentTime();
      
      Socket.emit('pause', t);
    }
  }
  else{
    alert("Connection not established. Please try again")
  }
  }

  const handleError=()=>{
    setError(true);
  }

  const handleReady = ()=>{
    setError(false);
  }
  const handleStart=()=>{
    if(Socket){
        setIsPlaying(true);
        Socket.emit('play');
      }
    else{
      alert("Connection not established. Please try again")
    }
  }
  
  
  const handleSeek = (e)=>{
    console.log("seek", e);
  }
  return (
  
  <div className='video'>
  
    <div className="playerWrapper">
    <ReactPlayer 
      ref={reactPlayer}
      width="100%"
      height= "100%"
      className="reactPlayer"
      controls={true} 
      url={URL}
      playing = {isPlaying}
      // playbackRate={PlaybackRate}
      onReady={handleReady}
      onPlay={handlePlay}
      onPause={handlePause}
      onError={handleError}
      onStart={handleStart}
      // onPlaybackRateChange={handleRateChange}  
      onSeek={(e)=> {handleSeek(e)}}
    > 
    </ReactPlayer>
    
    </div>
    <div className='input'>
    <input id="videoURL" className='videoUrl' value={URL} placeholder="Enter URL of the video and click on the Upload button" onChange={e => setURL(e.target.value)}></input>
    <button className='uploadBtn' onClick={handleUpload}>Upload to everyone</button>
    </div>

  </div>
  );
};

export default Video;
