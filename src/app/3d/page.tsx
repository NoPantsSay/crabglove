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
import { Canvas, useFrame } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import Link from "next/link";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import type { Mesh } from "three";

function MyRotatingBox() {
  const BoxMesh = useRef<Mesh>(null);
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

  return (
    <div className="grid grid-rows-[1fr_20px] items-center justify-items-center min-h-screen p-0 pb-0 gap-0 sm:p-0 font-[family-name:var(--font-geist-sans)]">
      <Leva collapsed={true} />
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
            <MyRotatingBox />
          </Center>
          <Grid position={[0, -0.01, 0]} args={gridSize} {...gridConfig} />
        </group>
        <OrbitControls makeDefault />
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport
            axisColors={["#9d4b4b", "#2f7f4f", "#3b5b9d"]}
            labelColor="white"
          />
        </GizmoHelper>
      </Canvas>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <Link
          href="/"
          className="text-wihte-600 hover:text-blue-800 active:font-bold"
        >
          back
        </Link>
      </footer>
    </div>
  );
}
