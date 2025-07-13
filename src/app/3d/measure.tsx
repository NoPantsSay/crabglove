"use client";

import { Billboard, Circle, Line, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useCallback, useContext, useEffect, useMemo } from "react";
import * as THREE from "three";

import { TopRightButtonContext } from "./topRightButtonContext";

// 画点
function FixedSizeDot({ position }: { position: THREE.Vector3 }) {
  return (
    <Billboard position={position}>
      <Circle args={[0.1, 16]}>
        <meshBasicMaterial color="red" />
      </Circle>
    </Billboard>
  );
}

// 画线
function FixedSizeLineTextDot({
  point1,
  point2,
}: { point1: THREE.Vector3; point2: THREE.Vector3 }) {
  return (
    <group>
      <Line points={[point1, point2]} color="red" lineWidth={1} />
      <FixedSizeDot position={point1} />
      <FixedSizeDot position={point2} />
    </group>
  );
}

// 在Canvas里使用 画3d的点和线
export function Measure() {
  const context = useContext(TopRightButtonContext);
  if (!context) {
    throw new Error(
      "use TopRightButtonContext must be used within a TopRightButtonContext.Provider",
    );
  }

  const {
    isMeasure,
    setIsMeasure,
    measurePoints,
    setMeasurePoints,
    setMeasureTextPos,
  } = context;

  const { camera, pointer, gl } = useThree();

  // 更新在Canvas上2d的坐标
  useFrame((state, delta) => {
    if (measurePoints.length !== 2) {
      setMeasureTextPos(null);
      return;
    }

    const midpoint = measurePoints[0]
      .clone()
      .add(measurePoints[1])
      .multiplyScalar(0.5)
      .project(camera);

    if (
      midpoint.x >= -1 &&
      midpoint.x <= 1 &&
      midpoint.y >= -1 &&
      midpoint.y <= 1 &&
      midpoint.z >= -1 &&
      midpoint.z <= 1
    ) {
      const x = (midpoint.x * 0.5 + 0.5) * 100;
      const y = (-midpoint.y * 0.5 + 0.5) * 100;
      setMeasureTextPos({ x, y });
    } else {
      setMeasureTextPos(null);
    }
  });

  // 改变鼠标光标
  useEffect(() => {
    if (isMeasure) {
      setMeasurePoints([]);
      gl.domElement.style.cursor = "crosshair";
    } else {
      gl.domElement.style.cursor = "default";
    }
  }, [isMeasure, gl, setMeasurePoints]);

  const plane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
    [],
  );

  // 鼠标点击
  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (!isMeasure) return;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(pointer, camera);

      const intersection = new THREE.Vector3();
      const ray = raycaster.ray;
      if (ray.intersectPlane(plane, intersection)) {
        if (measurePoints.length === 2) {
          setMeasurePoints([measurePoints[0], intersection]);
          setIsMeasure(false);
        } else if (measurePoints.length === 1) {
          setMeasurePoints([intersection, intersection]);
        } else {
          setMeasurePoints([intersection]);
        }
      }
    },
    [
      isMeasure,
      setIsMeasure,
      camera,
      pointer,
      plane,
      measurePoints,
      setMeasurePoints,
    ],
  );

  // 鼠标移动
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!isMeasure) return;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(pointer, camera);

      const intersection = new THREE.Vector3();

      const ray = raycaster.ray;
      if (ray.intersectPlane(plane, intersection)) {
        if (measurePoints.length === 2) {
          setMeasurePoints([measurePoints[0], intersection]);
        } else {
          setMeasurePoints([intersection]);
        }
      }
    },
    [isMeasure, camera, pointer, plane, measurePoints, setMeasurePoints],
  );

  useEffect(() => {
    gl.domElement.addEventListener("click", handleClick);
    gl.domElement.addEventListener("mousemove", handleMouseMove);

    return () => {
      gl.domElement.removeEventListener("click", handleClick);
      gl.domElement.removeEventListener("mousemove", handleMouseMove);
    };
  }, [gl, handleClick, handleMouseMove]);

  if (measurePoints.length === 1 && isMeasure) {
    return <FixedSizeDot position={measurePoints[0]} />;
  }
  if (measurePoints.length === 2) {
    return (
      <FixedSizeLineTextDot
        point1={measurePoints[0]}
        point2={measurePoints[1]}
      />
    );
  }

  return null;
}

// // 在Canvas外使用 画两点的距离
export function DrawMeasureIn2D() {
  const context = useContext(TopRightButtonContext);
  if (!context) {
    throw new Error(
      "use TopRightButtonContext must be used within a TopRightButtonContext.Provider",
    );
  }

  const { measurePoints, measureTextPos } = context;

  const distance = useMemo(() => {
    if (measurePoints.length === 2) {
      return measurePoints[0].distanceTo(measurePoints[1]);
    }

    return 0;
  }, [measurePoints]);

  if (measureTextPos) {
    return (
      <div
        className="absolute bg-white text-red-500 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          top: `${measureTextPos.y.toFixed(2)}%`,
          left: `${measureTextPos.x.toFixed(2)}%`,
        }}
      >
        {distance.toFixed(2)}
      </div>
    );
  }

  return null;
}
