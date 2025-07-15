"use client";
import * as THREE from "three";

export const defaultTarget = new THREE.Vector3(0, 0, 0);
export const defaultCameraVector = new THREE.Vector3(1, 1, 1).normalize();
export const defaultCameraDistance: number = 10;
export const defaultCameraPostion = defaultTarget
  .clone()
  .add(defaultCameraVector.clone().multiplyScalar(defaultCameraDistance));
