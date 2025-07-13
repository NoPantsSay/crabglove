"use client";

import { CameraControls, GizmoHelper, GizmoViewport } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useCallback, useContext, useEffect, useRef } from "react";
import * as THREE from "three";

import {
  defaultCameraDistance,
  defaultCameraPostion,
  defaultTarget,
} from "./global";
import { TopRightButtonContext } from "./topRightButtonContext";

export function CustomCameraControls() {
  const context = useContext(TopRightButtonContext);
  if (!context) {
    throw new Error(
      "use TopRightButtonContext must be used within a TopRightButtonContext.Provider",
    );
  }

  const { setShowResetButton, resetCamera, setResetCamera, is3D } = context;

  const { camera } = useThree();
  const controlsRef = useRef<React.ComponentRef<typeof CameraControls>>(null);
  const polarAngleIn3D = useRef<number | null>(null);

  const cameraRef = useRef(camera);
  useEffect(() => {
    cameraRef.current = camera;
  }, [camera]);

  // 相机控制改变回调
  const handleChangeEnd = useCallback(() => {
    if (!controlsRef.current) {
      return;
    }

    const controlsTarget = new THREE.Vector3();
    controlsRef.current.getTarget(controlsTarget);

    const distance = cameraRef.current.position.distanceTo(controlsTarget);
    const diff = Math.abs(distance - defaultCameraDistance);

    if (
      controlsTarget.distanceTo(defaultTarget) > Number.EPSILON * 1000 ||
      diff > Number.EPSILON * 1000
    ) {
      setShowResetButton(true);
    } else {
      setShowResetButton(false);
    }
  }, [setShowResetButton]);

  // 重置相机
  useEffect(() => {
    if (resetCamera) {
      if (!controlsRef.current) {
        return;
      }

      const direction = new THREE.Vector3();
      const postion = defaultTarget
        .clone()
        .add(
          cameraRef.current
            .getWorldDirection(direction)
            .clone()
            .negate()
            .multiplyScalar(defaultCameraDistance),
        );

      controlsRef.current
        .setLookAt(
          postion.x,
          postion.y,
          postion.z,
          defaultTarget.x,
          defaultTarget.y,
          defaultTarget.z,
        )
        .catch((error: unknown) => {
          console.error("setLookAt error:", error);
        });

      setResetCamera(false);
      setShowResetButton(false);
    }
  }, [resetCamera, setResetCamera, setShowResetButton]);

  // 切换2D 3D
  useEffect(() => {
    if (!controlsRef.current) {
      return;
    }

    console.log(JSON.stringify({ is3D }));

    if (is3D) {
      if (polarAngleIn3D.current == null) {
        return;
      }

      controlsRef.current.polarAngle = polarAngleIn3D.current;
      controlsRef.current.minPolarAngle = 0;
      controlsRef.current.maxPolarAngle = Math.PI;

      polarAngleIn3D.current = null;
    } else {
      if (polarAngleIn3D.current != null) {
        return;
      }

      polarAngleIn3D.current = controlsRef.current.polarAngle;

      controlsRef.current.polarAngle = 0;
      controlsRef.current.minPolarAngle = 0;
      controlsRef.current.maxPolarAngle = 0;
    }
  }, [is3D]);

  // 初始化相机位置
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current
        .setLookAt(
          defaultCameraPostion.x,
          defaultCameraPostion.y,
          defaultCameraPostion.z,
          defaultTarget.x,
          defaultTarget.y,
          defaultTarget.z,
        )
        .catch((error: unknown) => {
          console.error("setLookAt error:", error);
        });
    }
  }, []);

  return (
    <>
      <CameraControls
        ref={controlsRef}
        makeDefault
        onChange={handleChangeEnd}
      />
      {is3D && (
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport
            axisColors={["#9d4b4b", "#2f7f4f", "#3b5b9d"]}
            labelColor="white"
          />
        </GizmoHelper>
      )}
    </>
  );
}
