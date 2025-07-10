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
import { useContext, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import * as THREE from "three";

import { DrawMeasureIn2D, Measure } from "./measure";
import { TopRightButton } from "./topRightButton";
import { TopRightButtonContext } from "./topRightButtonContext";
import { TopRightButtonProvider } from "./topRightButtonProvider";

const defaultTarget = new THREE.Vector3(0, 0, 0);
const defaultCameraVector = new THREE.Vector3(1, 1, 1).normalize();
const defaultCameraDistance: number = 10;
const defaultCameraPostion = defaultTarget
  .clone()
  .add(defaultCameraVector.clone().multiplyScalar(defaultCameraDistance));

function CustomRotatingBox() {
  const BoxMesh = useRef<React.ComponentRef<typeof Box>>(null);
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

    // console.log(JSON.stringify({ target, distance, diff }));
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

export default function Page() {
  const { gridSize, ...gridConfig } = useControls({
    gridSize: [100.5, 100.5],
    cellSize: { value: 1, min: 0, max: 10, step: 0.1 },
    cellThickness: { value: 1, min: 0, max: 5, step: 0.1 },
    cellColor: "#6f6f6f",
    sectionSize: { value: 10, min: 0, max: 10, step: 0.1 },
    sectionThickness: { value: 1.5, min: 0, max: 5, step: 0.1 },
    sectionColor: "#9d4b4b",
    fadeDistance: { value: 100, min: 0, max: 100, step: 1 },
    fadeStrength: { value: 1, min: 0, max: 1, step: 0.1 },
    followCamera: false,
    infiniteGrid: false,
  });

  return (
    <TopRightButtonProvider>
      <div className="grid grid-rows-[1fr_20px] items-center justify-items-center h-screen p-0 pb-0 gap-0 sm:p-0 font-sans]">
        <div className="relative flex flex-col h-full w-full">
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
            <group position={[0, 0, 0]}>
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
              <Grid
                position={[0, 0, 0]}
                args={gridSize}
                {...gridConfig}
                side={THREE.DoubleSide}
              />
            </group>
            <CustomCameraControls />
            <Measure />
            <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
              <GizmoViewport
                axisColors={["#9d4b4b", "#2f7f4f", "#3b5b9d"]}
                labelColor="white"
              />
            </GizmoHelper>
          </Canvas>

          <DrawMeasureIn2D />

          <TopRightButton />

          <Leva collapsed={true} />
        </div>

        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <Link
            href="/"
            className="text-wihte-600 hover:text-blue-800 active:font-bold"
          >
            back
          </Link>
        </footer>
      </div>
    </TopRightButtonProvider>
  );
}
