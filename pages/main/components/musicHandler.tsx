import { useEffect, useRef, useState } from "react";

import backgroundMusic from "../../../assets/audio/backgroundMusic.mp3"

export const MainPage = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [musicStarted, setMusicStarted] = useState(false);
  
    useEffect(() => {
      const startMusic = () => {
        if (audioRef.current && !musicStarted) {
          audioRef.current.play().catch((err) => {
            console.error("Error playing audio:", err);
          });
          setMusicStarted(true);
          document.removeEventListener('click', startMusic);
          document.removeEventListener('keydown', startMusic);
          document.removeEventListener('pointermove', startMusic);
        }
      };
      document.addEventListener('click', startMusic);
      document.addEventListener('keydown', startMusic);
      document.addEventListener('pointermove', startMusic);
  
      return () => {
        document.removeEventListener('click', startMusic);
        document.removeEventListener('keydown', startMusic);
        document.removeEventListener('pointermove', startMusic);
      };
    }, [musicStarted]);
    
    return (
        <audio ref={audioRef} loop autoPlay>
            <source src={backgroundMusic} type="audio/mp3" />
        </audio>
    );
}
