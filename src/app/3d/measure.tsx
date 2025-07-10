import { Billboard, Circle, Line, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useCallback, useContext, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import { TopRightButtonContext } from "./topRightButtonContext";

function FixedSizeDot({ position }: { position: THREE.Vector3 }) {
  return (
    <Billboard position={position}>
      <Circle args={[0.1, 16]}>
        <meshBasicMaterial color="red" />
      </Circle>
    </Billboard>
  );
}

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

export function Measure() {
  const {
    isMeasure,
    setIsMeasure,
    measurePoints,
    setMeasurePoints,
    setMeasureTextPos,
  } = useContext(TopRightButtonContext);
  const { camera, pointer, raycaster, gl } = useThree();

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

  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (!isMeasure) return;

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
      raycaster,
      plane,
      measurePoints,
      setMeasurePoints,
    ],
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!isMeasure) return;

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
    [
      isMeasure,
      camera,
      pointer,
      raycaster,
      plane,
      measurePoints,
      setMeasurePoints,
    ],
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

export function DrawMeasureIn2D() {
  const { measurePoints, measureTextPos } = useContext(TopRightButtonContext);

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
