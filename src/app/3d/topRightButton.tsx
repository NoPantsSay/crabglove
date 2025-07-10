import { useContext } from "react";

import { TopRightButtonContext } from "./topRightButtonContext";

export function TopRightButton() {
  const {
    showResetButton,
    setResetCamera,
    is3D,
    setIs3D,
    isMeasure,
    setIsMeasure,
  } = useContext(TopRightButtonContext);

  return (
    <div className="absolute top-3 right-3 flex flex-col gap-2 w-fit">
      <button
        type="button"
        className=" bg-gray-700 hover:bg-gray-500 text-xs text-white  py-2 px-4 rounded-md shadow-sm transition-colors"
      >
        选择
      </button>
      <button
        type="button"
        className={` bg-gray-700 hover:bg-gray-500 text-xs ${is3D ? "text-blue-500" : "text-white"} py-2 px-4 rounded-md shadow-sm transition-colors`}
        onClick={() => {
          setIs3D(!is3D);
        }}
      >
        3D
      </button>
      <button
        type="button"
        className={` bg-gray-700 hover:bg-gray-500 text-xs ${isMeasure ? "text-blue-500" : "text-white"}  py-2 px-4 rounded-md shadow-sm transition-colors`}
        onClick={() => {
          setIsMeasure(!isMeasure);
        }}
      >
        测量
      </button>
      {showResetButton && (
        <button
          type="button"
          className=" bg-gray-700 hover:bg-gray-500 text-xs text-white  py-2 px-4 rounded-md shadow-sm transition-colors"
          onClick={() => {
            setResetCamera(true);
          }}
        >
          还原
        </button>
      )}
    </div>
  );
}
