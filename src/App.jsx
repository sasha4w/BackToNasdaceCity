import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import ThreeScene from "./components/ThreeScene";
import ATH from "./components/ATH";
import AmbientSound from "./components/AmbientSound";
function App() {
  const [count, setCount] = useState(0);

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
        <h1>Three.js avec React</h1>
        <ATH showChrono={true} /> {/* Affiche le chrono */}
        <ThreeScene />
        <AmbientSound
          bgmSrc="/audios/zinzin.mp3"
          bgsSrc="/audios/pnj.mp3"
          volume={1}
        />
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
