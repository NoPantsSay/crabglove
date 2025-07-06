"use client";

import {
  Box,
  Center,
  GizmoHelper,
  GizmoViewport,
  Grid,
  OrbitControls,
  Sphere,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import Link from "next/link";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import * as THREE from "three";

const defaultTarget = new THREE.Vector3(0, 0, 0);
const defaultCameraVector = new THREE.Vector3(1, 1, 1).normalize();
const defaultCameraDistance: number = 10;
const defaultCameraPostion = defaultTarget
  .clone()
  .add(defaultCameraVector.clone().multiplyScalar(defaultCameraDistance));

const TopRightButtonContext = createContext({
  showResetButton: false,
  setShowResetButton: (value: boolean) => {},
  resetCamera: false,
  setResetCamera: (value: boolean) => {},
});

function CustomRotatingBox() {
  const BoxMesh = useRef<THREE.Mesh>(null);
  const [active, setActive] = useState(false);
  const scale = active ? 1.5 : 1;

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    if (BoxMesh.current) {
      BoxMesh.current.rotation.y = a;
    }
  });

  return (
    <Box
      castShadow
      args={[0.7, 0.7, 0.7]}
      ref={BoxMesh}
      onClick={() => {
        setActive(!active);
      }}
      scale={scale}
    >
      <meshStandardMaterial color="hotpink" />
    </Box>
  );
}

function CustomCameraControls() {
  const { setShowResetButton, resetCamera, setResetCamera } = useContext(
    TopRightButtonContext,
  );

  const { camera } = useThree();
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null);

  const handleChangeEnd = () => {
    if (!controlsRef.current) {
      return;
    }

    const target = controlsRef.current.target;
    const distance = camera.position.distanceTo(target);
    const diff = Math.abs(distance - defaultCameraDistance);

    if (
      target.distanceTo(defaultTarget) > Number.EPSILON * 1000 ||
      diff > Number.EPSILON * 1000
    ) {
      setShowResetButton(true);
    } else {
      setShowResetButton(false);
    }

    console.log(JSON.stringify({ target, distance, diff }));
  };

  useEffect(() => {
    if (resetCamera) {
      if (!controlsRef.current) {
        return;
      }

      const direction = new THREE.Vector3();
      const postion = defaultTarget
        .clone()
        .add(
          camera
            .getWorldDirection(direction)
            .clone()
            .negate()
            .multiplyScalar(defaultCameraDistance),
        );

      camera.position.copy(postion);
      controlsRef.current.target.copy(defaultTarget);

      // console.log(JSON.stringify({ defaultTarget, postion, direction }));

      setResetCamera(false);
      setShowResetButton(false);
    }
  }, [resetCamera, camera, setResetCamera, setShowResetButton]);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      target={defaultTarget}
      onEnd={handleChangeEnd}
    />
  );
}

function TopRightButton() {
  const { showResetButton, setResetCamera } = useContext(TopRightButtonContext);

  return (
    <div className="absolute top-3 right-3 flex flex-col gap-2 w-fit">
      <button
        type="button"
        className=" bg-gray-700 hover:bg-gray-500 text-xs text-white  py-2 px-4 rounded-md shadow-sm transition-colors"
      >
        选择
      </button>
      <button
        type="button"
        className=" bg-gray-700 hover:bg-gray-500 text-xs text-white  py-2 px-4 rounded-md shadow-sm transition-colors"
        onClick={() => {
          toast.success("测量!");
        }}
      >
        测量
      </button>
      {showResetButton && (
        <button
          type="button"
          className=" bg-gray-700 hover:bg-gray-500 text-xs text-white  py-2 px-4 rounded-md shadow-sm transition-colors"
          onClick={() => {
            setResetCamera(true);
          }}
        >
          还原
        </button>
      )}
    </div>
  );
}

export default function Page() {
  const { gridSize, ...gridConfig } = useControls({
    gridSize: [10.5, 10.5],
    cellSize: { value: 1, min: 0, max: 10, step: 0.1 },
    cellThickness: { value: 1, min: 0, max: 5, step: 0.1 },
    cellColor: "#6f6f6f",
    sectionSize: { value: 10, min: 0, max: 10, step: 0.1 },
    sectionThickness: { value: 1.5, min: 0, max: 5, step: 0.1 },
    sectionColor: "#9d4b4b",
    fadeDistance: { value: 25, min: 0, max: 100, step: 1 },
    fadeStrength: { value: 1, min: 0, max: 1, step: 0.1 },
    followCamera: false,
    infiniteGrid: true,
  });

  const [showResetButton, setShowResetButton] = useState(false);
  const [resetCamera, setResetCamera] = useState(false);

  return (
    <TopRightButtonContext.Provider
      value={{
        showResetButton,
        setShowResetButton,
        resetCamera,
        setResetCamera,
      }}
    >
      <div className="relative grid grid-rows-[1fr_20px] items-center justify-items-center h-screen p-0 pb-0 gap-0 sm:p-0 font-sans]">
        <Toaster />
        <Canvas shadows camera={{ position: defaultCameraPostion }}>
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <group position={[0, -0.5, 0]}>
            <Center top position={[-2, 0, 2]}>
              <Sphere
                castShadow
                args={[0.5, 64, 64]}
                onClick={() => {
                  toast.success("This is sphere!");
                }}
              >
                <meshStandardMaterial color="lightblue" />
              </Sphere>
            </Center>
            <Center top position={[2.5, 0, 1]}>
              <CustomRotatingBox />
            </Center>
            <Grid position={[0, -0.01, 0]} args={gridSize} {...gridConfig} />
          </group>
          <CustomCameraControls />
          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport
              axisColors={["#9d4b4b", "#2f7f4f", "#3b5b9d"]}
              labelColor="white"
            />
          </GizmoHelper>
        </Canvas>

        <TopRightButton />

        <Leva collapsed={true} />

        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <Link
            href="/"
            className="text-wihte-600 hover:text-blue-800 active:font-bold"
          >
            back
          </Link>
        </footer>
      </div>
    </TopRightButtonContext.Provider>
  );
}
