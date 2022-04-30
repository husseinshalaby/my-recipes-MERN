import React from 'react';
import Video from '../videos/video.mp4';
import '../App.css';

const Home = () => {
  return (
    <>
      <div className = 'HeroContainer' id ='home'>
        <div className = 'HeroBg'>
          <video className = 'VideoBg' 
            autoPlay 
            loop 
            muted 
            src= {Video} 
            type = 'vide/mp4'
          />
        </div>
      </div>
    </>
  )
}

export default Home
