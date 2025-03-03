import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import Quiz from "./components/Quiz";
import ThreeScene from "./components/ThreeScene";
import ATH from "./components/ATH";
import AmbientSound from "./components/AmbientSound";
function App() {
  const [fuel, setFuel] = useState(100);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          {/* <img src={viteLogo} className="logo" alt="Vite logo" /> */}
        </a>
        <a href="https://react.dev" target="_blank">
          {/* <img src={reactLogo} className="logo react" alt="React logo" /> */}
        </a>
      </div>
      <div>
        <h1>Les Nasdaces de l'espace</h1>
        <ATH showChrono={true} fuel={fuel} /> {/* Affiche le chrono */}
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
  );
}

export default App;
