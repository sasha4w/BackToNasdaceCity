import React, { useState, useEffect } from "react";
import ATH from "./ATH";

const Quiz = ({ onGameOver, onScoreUpdate }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [countdown, setCountdown] = useState(8);
  const [result, setResult] = useState("");
  const [isGameActive, setIsGameActive] = useState(true);
  const [fuel, setFuel] = useState(100);
  const [score, setScore] = useState(0);

  const questions = [
    {
      question: "Quelle est la plus grande planète du système solaire ?",
      choices: ["Mars", "Saturne", "Jupiter", "Neptune"],
      correct: 2,
    },
    {
      question: "Quelle est la distance moyenne entre la Terre et le Soleil ?",
      choices: [
        "150 millions km",
        "100 millions km",
        "200 millions km",
        "250 millions km",
      ],
      correct: 0,
    },
    {
      question: "Qu'est-ce qu'un trou noir ?",
      choices: [
        "Une étoile morte",
        "Un objet si dense que même la lumière ne peut s'en échapper",
        "Une planète sombre",
        "Un astéroïde noir",
      ],
      correct: 1,
    },
    {
      question: "Quelle est la galaxie la plus proche de la Voie lactée ?",
      choices: ["Andromède", "Triangle", "Grande Ourse", "Orion"],
      correct: 0,
    },
    {
      question: "Quel est le nom du premier homme à avoir marché sur la Lune ?",
      choices: [
        "Buzz Aldrin",
        "Neil Armstrong",
        "Youri Gagarine",
        "Alan Shepard",
      ],
      correct: 1,
    },
    {
      question: "Quelle est la température à la surface du Soleil ?",
      choices: ["1 500°C", "3 500°C", "5 500°C", "10 000°C"],
      correct: 2,
    },
    {
      question: "Qu'est-ce qu'une année-lumière ?",
      choices: [
        "La distance parcourue par la lumière en un an",
        "Le temps que met la lumière pour atteindre la Terre",
        "L'âge d'une étoile",
        "La durée de vie d'une galaxie",
      ],
      correct: 0,
    },
    {
      question: "Quelle planète est surnommée la planète rouge ?",
      choices: ["Vénus", "Mars", "Jupiter", "Mercure"],
      correct: 1,
    },
  ];

  useEffect(() => {
    selectNewQuestion();
  }, []);

  useEffect(() => {
    if (!isGameActive) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 800);

    return () => clearInterval(timer);
  }, [isGameActive]);

  const selectNewQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
  };

  const handleTimeout = () => {
    setIsGameActive(false);
    setResult("Temps écoulé !");
    setFuel((prev) => prev - 10);

    if (fuel === 0) {
      onGameOver?.();
    }

    setTimeout(nextQuestion, 1500);
  };

  const nextQuestion = () => {
    selectNewQuestion();
    setCountdown(8);
    setIsGameActive(true);
    setResult("");
  };

  const handleAnswer = (selectedIndex) => {
    if (!isGameActive) return;

    const isCorrect = selectedIndex === currentQuestion.correct;
    setResult(isCorrect ? "Victoire !" : "Perdu !");
    setIsGameActive(false);

    if (isCorrect) {
      setScore((prev) => prev + 10);
      onScoreUpdate?.(score + 10);
    } else {
      setFuel((prev) => prev - 10);
      if (fuel <= 10) {
        onGameOver?.();
      }
    }

    setTimeout(nextQuestion, 1500);
  };

  if (!currentQuestion) return null;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="p-6">
        <div className="flex justify-between mb-4">
          <div className="text-lg">Carburant: {fuel}</div>
          <div className="text-lg">Score: {score}</div>
          <div className="text-xl font-bold">{countdown}</div>
        </div>

        {result && (
          <div
            className={`text-center text-xl font-bold mb-4 ${
              result === "Victoire !" ? "text-green-600" : "text-red-600"
            }`}
          >
            {result}
          </div>
        )}

        <div className="text-xl font-semibold mb-4">
          {currentQuestion.question}
        </div>

        <div className="space-y-2">
          {currentQuestion.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={!isGameActive}
              className={`w-full p-3 text-left rounded border hover:bg-gray-100 
                transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                ${
                  !isGameActive && index === currentQuestion.correct
                    ? "bg-green-100"
                    : ""
                }
              `}
            >
              {choice}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
