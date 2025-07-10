import { useState } from "react";
import type { Vector3 } from "three";

import { TopRightButtonContext } from "./topRightButtonContext";

export function TopRightButtonProvider({
  children,
}: { children: React.ReactNode }) {
  const [showResetButton, setShowResetButton] = useState(false);
  const [resetCamera, setResetCamera] = useState(false);
  const [is3D, setIs3D] = useState(true);
  const [isMeasure, setIsMeasure] = useState(false);
  const [measurePoints, setMeasurePoints] = useState<Vector3[]>([]);
  const [measureTextPos, setMeasureTextPos] = useState<{
    x: number;
    y: number;
  } | null>(null);

  return (
    <TopRightButtonContext.Provider
      value={{
        showResetButton,
        setShowResetButton,
        resetCamera,
        setResetCamera,
        is3D,
        setIs3D,
        isMeasure,
        setIsMeasure,
        measurePoints,
        setMeasurePoints,
        measureTextPos,
        setMeasureTextPos,
      }}
    >
      {children}
    </TopRightButtonContext.Provider>
  );
}
