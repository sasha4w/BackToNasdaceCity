import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Quiz from "./components/Quiz";
import GameOver from "./components/GameOver";
import ThreeScene from "./components/ThreeScene";
import ATH from "./components/ATH";
import AmbientSound from "./components/AmbientSound";

function App() {
  const [fuel, setFuel] = useState(100);

  return (
    <Router>
      <Routes>
        {/* Route principale avec le jeu */}
        <Route
          path="/"
          element={
            <>
              <div>
                <h1>Les Nasdaces de l'espace</h1>
                <ATH showChrono={true} fuel={fuel} />
                <ThreeScene />
                <AmbientSound
                  bgmSrc="/audios/zinzin.mp3"
                  bgsSrc="/audios/pnj.mp3"
                  volume={1}
                />
              </div>
              <div className="card">
                <Quiz setter={setFuel} fuel={fuel} />
              </div>
            </>
          }
        />

        {/* Route vers l'écran de Game Over */}
        <Route
          path="/gameover"
          element={<GameOver resetFuel={() => setFuel(100)} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
