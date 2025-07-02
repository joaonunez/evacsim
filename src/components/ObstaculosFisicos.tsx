// src/components/ObstaculosFisicos.tsx
import React from "react";
import type { Obstacle } from "../hooks/useObstacles";

interface Props {
  obstacles: Obstacle[];
  worldOffsetX: number;
  canvasWidth: number;
}

const ObstaculosFisicos: React.FC<Props> = ({ obstacles, worldOffsetX, canvasWidth }) => {
  const cx = canvasWidth / 2;

  return (
    <div className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none overflow-hidden z-10">
      {obstacles.map((obs, index) => {
        const screenX = obs.x - worldOffsetX + cx;
        if (screenX + obs.width < 0 || screenX > canvasWidth) return null;

        const color =
          obs.type === 1 ? "bg-red-600" : obs.type === 2 ? "bg-blue-600" : "bg-green-600";

        return (
          <div
            key={index}
            className={`absolute ${color} border border-black`}
            style={{
              left: `${screenX}px`,
              top: `${obs.y}px`,
              width: `${obs.width}px`,
              height: `${obs.height}px`,
            }}
          />
        );
      })}
    </div>
  );
};

export default ObstaculosFisicos;
