import {
  OrbitControls,
  Scroll,
  ScrollControls,
  useScroll,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import TriggerFrog from "../ThreeDmodels/TriggerFrog";

const ParallaxScene = () => {
  const scroll = useScroll();
  const hedronRef = useRef();
  const torusRef = useRef();

  useFrame(() => {
    if (hedronRef.current) {
      hedronRef.current.position.y = scroll.offset * -5;
    }
    if (torusRef.current) {
      torusRef.current.position.y = scroll.offset * -2;
    }
  });

  return (
    <group>
      <mesh ref={hedronRef} position={[-2, 0, -2]}>
        <icosahedronGeometry />
        <meshLambertMaterial color="orange" />
      </mesh>
      <mesh ref={torusRef} position={[2, 0, -2]}>
        <torusGeometry />
        <meshStandardMaterial color="blue" />
      </mesh>
    </group>
  );
};

const ThreeD = () => {
  const name = "Mohan";

  return (
    <>
      <Canvas style={{ width: "1000px", height: "600px" }}>
        <OrbitControls autoRotate enableDamping enableZoom={false} />
        <ambientLight intensity={1.2} />
        <color attach="background" args={["#F0F0F0"]} />
        <ScrollControls pages={4} damping={1}>
          <Scroll>
            <ParallaxScene />
          </Scroll>
          <Scroll>
            <TriggerFrog />
          </Scroll>
          <Scroll html>
            <h1
              style={{
                position: "absolute",
                top: "20vh",
                left: "10vw",
                color: "blue",
              }}
            >
              Trigger {name}
            </h1>
            <h3
              style={{
                position: "absolute",
                top: "100vh",
                left: "50vw",
                color: "white",
              }}
            >
              Multipurpose Web application
            </h3>
            <h3
              style={{
                position: "absolute",
                top: "200vh",
                left: "10vw",
                color: "green",
              }}
            >
              Entertainment like music, videos and games
            </h3>
            <h3
              style={{
                position: "absolute",
                top: "280vh",
                left: "30vw",
                color: "white",
              }}
            >
              Test your knowledge by attempting the quiz
            </h3>
          </Scroll>
        </ScrollControls>
      </Canvas>
      <Canvas width="800px" height="800px">
        <ambientLight intensity={0.8} />
        <OrbitControls enableZoom={false} enableRotate />
        <mesh>
          <boxGeometry args={[1, 1, 1]} scale={2} />
          <meshLambertMaterial />
        </mesh>
      </Canvas>
    </>
  );
};

export default ThreeD;
