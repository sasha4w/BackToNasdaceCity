import React, { useState, useEffect, useRef } from "react";

const Blaster = ({
  onGameOver,
  onScoreUpdate,
  setter,
  fuel,
  vocabulary = [],
}) => {
  const [targets, setTargets] = useState([]);
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState(null);
  const [isGameActive, setIsGameActive] = useState(true);
  const [result, setResult] = useState("");
  const gameAreaRef = useRef(null);
  const shipRef = useRef(null);
  const [laserBeam, setLaserBeam] = useState(null);

  const defaultVocabulary = [
    { word: "planète", correct: true },
    { word: "satellite", correct: true },
    { word: "galaxie", correct: true },
    { word: "étoile", correct: true },
    { word: "météorite", correct: true },
    { word: "voiture", correct: false },
    { word: "ordinateur", correct: false },
  ];

  const vocabToUse = vocabulary.length > 0 ? vocabulary : defaultVocabulary;

  useEffect(() => {
    generateTargets();
    setCurrentWord(getRandomCorrectWord());
  }, []);

  const getRandomCorrectWord = () => {
    const correctWords = vocabToUse.filter((item) => item.correct);
    return correctWords[Math.floor(Math.random() * correctWords.length)].word;
  };

  const generateTargets = () => {
    const gameArea = gameAreaRef.current;
    if (!gameArea) return;

    const gameWidth = gameArea.clientWidth;
    const gameHeight = gameArea.clientHeight;
    const shuffled = [...vocabToUse].sort(() => 0.5 - Math.random());
    const selectedVocab = shuffled.slice(0, 4);

    const newTargets = selectedVocab.map((item, index) => ({
      id: Date.now() + index,
      word: item.word,
      x: Math.random() * (gameWidth - 100),
      y: Math.random() * (gameHeight * 0.5),
      size: 80 + Math.random() * 30,
      correct: item.correct,
    }));

    setTargets(newTargets);
  };

  const handleShoot = (targetId) => {
    if (!isGameActive) return;

    const target = targets.find((t) => t.id === targetId);
    if (!target) return;

    setLaserBeam({ x1: 50, y1: 100, x2: target.x, y2: target.y });

    setTimeout(() => setLaserBeam(null), 300);

    if (target.word === currentWord) {
      setResult("Victoire !");
      setScore((prev) => prev + 10);
      onScoreUpdate?.(score + 10);
      setIsGameActive(false);
      setTimeout(() => {
        generateTargets();
        setCurrentWord(getRandomCorrectWord());
        setIsGameActive(true);
        setResult("");
      }, 800);
    } else {
      setResult("Perdu !");
      setter((prev) => Math.max(0, prev - 10));
      if (fuel <= 10) onGameOver?.();
      setTimeout(() => setResult(""), 800);
    }
  };

  return (
    <div ref={gameAreaRef} style={styles.container}>
      <div style={styles.hud}>
        <div style={styles.score}>Score: {score}</div>
      </div>

      <div style={styles.targetWord}>
        Trouvez: <span style={styles.targetText}>{currentWord}</span>
      </div>

      {result && (
        <div style={result === "Victoire !" ? styles.success : styles.failure}>
          {result}
        </div>
      )}

      {targets.map((target) => (
        <div
          key={target.id}
          onClick={() => handleShoot(target.id)}
          style={{
            ...styles.asteroid,
            left: `${target.x}px`,
            top: `${target.y}px`,
            width: `${target.size}px`,
            height: `${target.size}px`,
          }}
        >
          {target.word}
        </div>
      ))}

      {laserBeam && <div style={styles.laser} />}

      <div ref={shipRef} style={styles.spaceship}>
        🚀
      </div>

      <div style={styles.fuelGauge}>
        <div style={{ ...styles.fuelLevel, width: `${fuel}%` }}></div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    width: "100%",
    height: "600px",
    background: "linear-gradient(to bottom, #0a0a2a 0%, #1e1e5a 100%)",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 0 20px rgba(0, 0, 255, 0.2)",
    fontFamily: "Arial, sans-serif",
    color: "white",
  },
  hud: {
    position: "absolute",
    top: "15px",
    left: "0",
    right: "0",
    display: "flex",
    justifyContent: "space-between",
    padding: "0 20px",
    zIndex: 10,
  },
  score: {
    fontSize: "18px",
  },
  targetWord: {
    position: "absolute",
    top: "60px",
    left: "0",
    right: "0",
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "bold",
  },
  targetText: {
    color: "#facc15",
  },
  success: {
    position: "absolute",
    top: "100px",
    left: "0",
    right: "0",
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#4ade80",
    textShadow: "0 0 10px #4ade80",
  },
  failure: {
    position: "absolute",
    top: "100px",
    left: "0",
    right: "0",
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#f87171",
    textShadow: "0 0 10px #f87171",
  },
  asteroid: {
    position: "absolute",
    backgroundColor: "#4338ca",
    border: "2px solid #818cf8",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "10px",
    cursor: "pointer",
    transition: "transform 0.2s",
    boxShadow: "0 0 15px rgba(99, 102, 241, 0.6)",
    color: "white",
    fontWeight: "bold",
  },
  spaceship: {
    position: "absolute",
    bottom: "80px",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "40px",
    filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.7))",
  },
  fuelGauge: {
    position: "absolute",
    bottom: "20px",
    left: "20px",
    right: "20px",
    height: "15px",
    backgroundColor: "#333",
    borderRadius: "8px",
    overflow: "hidden",
  },
  fuelLevel: {
    height: "100%",
    backgroundColor: "#22c55e",
    transition: "width 0.5s",
  },
  laser: {
    position: "absolute",
    background: "linear-gradient(to right, transparent, #ff0066, transparent)",
    height: "2px",
    transformOrigin: "bottom center",
    zIndex: 5,
    animation: "laser-pulse 0.3s infinite",
  },
};

export default Blaster;
