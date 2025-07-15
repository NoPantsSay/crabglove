"use client";

import { Box, Center, Grid, Sphere } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import Link from "next/link";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import * as THREE from "three";

import { D3CameraControls } from "./components/3dCameraControls";
import { DrawMeasureIn2D, Measure } from "./components/measure";
import { TopRightButton } from "./components/topRightButton";
import { TopRightButtonProvider } from "./components/topRightButtonProvider";

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
    <div className="flex flex-col items-center justify-items-center font-sans">
      <TopRightButtonProvider>
        <div className="relative flex flex-col">
          <Toaster />
          <Canvas shadows>
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
            <D3CameraControls />
            <Measure />
          </Canvas>

          <DrawMeasureIn2D />

          <TopRightButton />

          <Leva collapsed={true} />
        </div>
      </TopRightButtonProvider>

      <Link
        href="/"
        className="text-white-600 hover:text-blue-800 active:font-bold"
      >
        back
      </Link>
    </div>
  );
}
