import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { TextureLoader } from "three";

const Spaceship = () => {
  const spaceshipRef = useRef();

  console.log(spaceshipRef);
  const obj = useLoader(
    OBJLoader,
    "assets/models/soucoupe/11681_Flying_saucer_v1_L3.obj"
  );
  const texture = useLoader(
    TextureLoader,
    "assets/models/soucoupe/11681_Flying_saucer_diff.jpg"
  );

  obj.traverse((child) => {
    if (child.isMesh) {
      child.material.map = texture;
    }
  });

  useFrame(() => {
    if (spaceshipRef.current) {
      spaceshipRef.current.rotation.z += 0.01;
    }
  });

  return <primitive object={obj} ref={spaceshipRef} scale={1} />;
};

const ThreeScene = () => {
  return (
    <Canvas camera={{ position: [0, -20, 8] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 3]} intensity={1} />
      <Spaceship />
    </Canvas>
  );
};

export default ThreeScene;
