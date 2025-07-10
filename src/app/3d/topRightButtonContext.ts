import { createContext } from "react";
import type { Vector3 } from "three";

export const TopRightButtonContext = createContext({
  showResetButton: false,
  setShowResetButton: (value: boolean) => {},
  resetCamera: false,
  setResetCamera: (value: boolean) => {},
  is3D: true,
  setIs3D: (value: boolean) => {},
  isMeasure: false,
  setIsMeasure: (value: boolean) => {},
  measurePoints: [] as Vector3[],
  setMeasurePoints: (value: Vector3[]) => {},
  measureTextPos: null as { x: number; y: number } | null,
  setMeasureTextPos: (value: { x: number; y: number } | null) => {},
});
