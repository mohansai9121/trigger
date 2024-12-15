import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  useGLTF,
  Sky,
  Stars,
} from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import { Link } from "react-router-dom";

function Car() {
  const [ref, api] = useBox(() => ({
    mass: 500,
    position: [0, 2, 0],
    rotation: [0, Math.PI, 0],
    args: [2, 1, 4], // width, height, length
    material: { friction: 0.7 },
    linearDamping: 0.5,
  }));

  // State for car movement
  const [controls, setControls] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });
  const [velocity, setVelocity] = useState([0, 0, 0]);

  useEffect(() => {
    const unsubscribe = api.velocity.subscribe((v) => setVelocity(v));
    return unsubscribe;
  }, [api.velocity]);

  // Handle keydown
  useFrame(() => {
    const speed = 15;
    const rotationSpeed = 0.05;
    //const currentVel = ref.current.getLinearVelocity();

    // Forward/Backward movement
    if (controls.forward) {
      api.velocity.set(velocity[0], velocity[1], -speed);
    }
    if (controls.backward) {
      api.velocity.set(velocity[0], velocity[1], speed);
    }

    // Left/Right rotation
    if (controls.left) {
      ref.current.rotation.y += rotationSpeed;
    }
    if (controls.right) {
      ref.current.rotation.y -= rotationSpeed;
    }

    // Apply friction when no keys are pressed
    if (!controls.forward && !controls.backward) {
      api.velocity.set(velocity[0] * 0.95, velocity[1], velocity[2] * 0.95);
    }
  });

  // Event listeners for keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          setControls((prev) => ({ ...prev, forward: true }));
          break;
        case "ArrowDown":
          setControls((prev) => ({ ...prev, backward: true }));
          break;
        case "ArrowLeft":
          setControls((prev) => ({ ...prev, left: true }));
          break;
        case "ArrowRight":
          setControls((prev) => ({ ...prev, right: true }));
          break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.key) {
        case "ArrowUp":
          setControls((prev) => ({ ...prev, forward: false }));
          break;
        case "ArrowDown":
          setControls((prev) => ({ ...prev, backward: false }));
          break;
        case "ArrowLeft":
          setControls((prev) => ({ ...prev, left: false }));
          break;
        case "ArrowRight":
          setControls((prev) => ({ ...prev, right: false }));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <group>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2, 0.75, 4]} />
          <meshStandardMaterial color="blue" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.5, 0.5]} castShadow>
          <boxGeometry args={[1.5, 0.75, 2]} />
          <meshStandardMaterial color="blue" metalness={0.8} roughness={0.2} />
        </mesh>
        <Wheel position={[1, -0.35, 1.3]} />
        <Wheel position={[-1, -0.35, 1.3]} />
        <Wheel position={[1, -0.35, -1.3]} />
        <Wheel position={[-1, -0.35, -1.3]} />
      </group>
    </mesh>
  );
}

function Wheel({ position }) {
  return (
    <mesh position={position} castShadow>
      <cylinderGeometry
        args={[0.4, 0.4, 0.3, 16]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <meshStandardMaterial color="black" />
    </mesh>
  );
}

function Ground() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    material: { friction: 1 },
  }));

  // Create a grid pattern for the ground
  return (
    <group>
      <mesh ref={ref} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#303030" />
      </mesh>
      <gridHelper args={[100, 100, "#606060", "#404040"]} />
    </group>
  );
}

// Obstacles component
function Obstacles() {
  const obstacles = [
    { position: [10, 1, 10], size: [2, 2, 2] },
    { position: [-10, 1, -10], size: [2, 2, 2] },
    { position: [10, 1, -10], size: [2, 2, 2] },
    { position: [-10, 1, 10], size: [2, 2, 2] },
  ];

  return (
    <>
      {obstacles.map((obstacle, index) => (
        <Box
          key={index}
          position={obstacle.position}
          args={obstacle.size}
          color="red"
        />
      ))}
    </>
  );
}

// Box component for obstacles
function Box({ position, args, color }) {
  const [ref] = useBox(() => ({
    mass: 1,
    position,
    args,
  }));

  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

// Camera follow component
function FollowCamera({ target }) {
  useFrame(({ camera }) => {
    if (target.current) {
      const pos = target.current.position;
      camera.position.x = pos.x + 10;
      camera.position.y = pos.y + 5;
      camera.position.z = pos.z + 10;
      camera.lookAt(pos.x, pos.y, pos.z);
    }
  });
  return null;
}

const CarGame = () => {
  const carRef = useRef();

  return (
    <>
      <Link to="/games">
        <button>Games</button>
      </Link>
      <div style={{ width: "100vw", height: "100vh" }}>
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[10, 10, 10]} />

          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />

          {/* Environment */}
          <Sky sunPosition={[100, 20, 100]} />
          <Stars radius={100} depth={50} count={5000} factor={4} />
          <Environment preset="sunset" />

          {/* Physics World */}
          <Physics gravity={[0, -9.81, 0]}>
            <Car ref={carRef} />
            <Ground />
            <Obstacles />
          </Physics>

          {/* Camera Control */}
          <FollowCamera target={carRef} />
          <OrbitControls target={[0, 0, 0]} />
        </Canvas>

        {/* Controls Instructions */}
        <div style={styles.instructions}>
          <h3>Controls:</h3>
          <p>↑ Forward</p>
          <p>↓ Backward</p>
          <p>← Left</p>
          <p>→ Right</p>
        </div>
      </div>
    </>
  );
};

const styles = {
  instructions: {
    position: "absolute",
    top: "20px",
    left: "20px",
    background: "rgba(0, 0, 0, 0.7)",
    color: "white",
    padding: "20px",
    borderRadius: "10px",
    fontFamily: "Arial, sans-serif",
  },
};

export default CarGame;
