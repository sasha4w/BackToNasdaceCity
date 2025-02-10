import { useEffect, useRef, useState } from "react";

const AmbientSound = ({ bgmSrc, bgsSrc, volume = 0.5 }) => {
  const bgmRef = useRef(null);
  const bgsRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    bgmRef.current = new Audio(bgmSrc);
    bgsRef.current = new Audio(bgsSrc);

    bgmRef.current.loop = true;
    bgmRef.current.volume = volume;

    bgsRef.current.loop = true;
    bgsRef.current.volume = volume * 0.6;

    return () => {
      bgmRef.current.pause();
      bgsRef.current.pause();
    };
  }, [bgmSrc, bgsSrc, volume]);

  const togglePlay = () => {
    if (isPlaying) {
      bgmRef.current.pause();
      bgsRef.current.pause();
    } else {
      bgmRef.current.play();
      bgsRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div style={styles.container}>
      <button onClick={togglePlay} style={styles.button}>
        {isPlaying ? "🔇 Stop Audio" : "🔊 Play Audio"}
      </button>
    </div>
  );
};

const styles = {
  container: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: "rgba(0, 0, 0, 0.6)",
    padding: "10px",
    borderRadius: "8px",
  },
  button: {
    padding: "10px 15px",
    fontSize: "16px",
    cursor: "pointer",
    background: "#fff",
    border: "none",
    borderRadius: "5px",
  },
};

export default AmbientSound;
