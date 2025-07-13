"use client";

import { createContext } from "react";
import type { Vector3 } from "three";

interface TopRightButtonContextType {
  showResetButton: boolean;
  setShowResetButton: (value: boolean) => void;
  resetCamera: boolean;
  setResetCamera: (value: boolean) => void;
  is3D: boolean;
  setIs3D: (value: boolean) => void;
  isMeasure: boolean;
  setIsMeasure: (value: boolean) => void;
  measurePoints: Vector3[];
  setMeasurePoints: (value: Vector3[]) => void;
  measureTextPos: { x: number; y: number } | null;
  setMeasureTextPos: (value: { x: number; y: number } | null) => void;
}

export const TopRightButtonContext =
  createContext<TopRightButtonContextType | null>(null);
