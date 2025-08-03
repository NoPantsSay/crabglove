"use client";

import { Button } from "@headlessui/react";
import clsx from "clsx";
import { useContext } from "react";

import { TopRightButtonContext } from "./topRightButtonContext";

export function TopRightButton() {
  const context = useContext(TopRightButtonContext);
  if (!context) {
    throw new Error(
      "use TopRightButtonContext must be used within a TopRightButtonContext.Provider",
    );
  }

  const {
    showResetButton,
    setResetCamera,
    is3D,
    setIs3D,
    isMeasure,
    setIsMeasure,
  } = context;

  return (
    <div className="absolute top-3 right-3 flex flex-col gap-2 w-fit">
      <Button className=" bg-gray-700 hover:bg-gray-500 text-xs text-white  py-2 px-4 rounded-md shadow-sm transition-colors">
        选择
      </Button>
      <Button
        className={clsx(
          " bg-gray-700 hover:bg-gray-500 text-xs py-2 px-4 rounded-md shadow-sm transition-colors",
          is3D ? "text-blue-500" : "text-white",
        )}
        onClick={() => {
          setIs3D(!is3D);
        }}
      >
        3D
      </Button>
      <Button
        className={clsx(
          " bg-gray-700 hover:bg-gray-500 text-xs py-2 px-4 rounded-md shadow-sm transition-colors",
          isMeasure ? "text-blue-500" : "text-white",
        )}
        onClick={() => {
          setIsMeasure(!isMeasure);
        }}
      >
        测量
      </Button>
      {showResetButton && (
        <Button
          className=" bg-gray-700 hover:bg-gray-500 text-xs text-white  py-2 px-4 rounded-md shadow-sm transition-colors"
          onClick={() => {
            setResetCamera(true);
          }}
        >
          还原
        </Button>
      )}
    </div>
  );
}
