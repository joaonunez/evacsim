//src/hooks/useObstacles.ts

import { useState } from 'react';

export interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: number;
}

export const useObstacles = () => {
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [lastX, setLastX] = useState(0);

  const generate = (worldOffsetX: number, canvasWidth: number, canvasHeight: number) => {
    const distanceFromLast = (worldOffsetX + canvasWidth) - lastX;
    if (distanceFromLast < 150) return;

    const type = Math.floor(Math.random() * 3) + 1;
    const obsWidth = type === 1 ? 40 : type === 2 ? 60 : 100;
    const obsHeight = type === 1 ? 20 : type === 2 ? 40 : 60;

    const obsX = worldOffsetX + canvasWidth - 100 + Math.random() * 150;
    const floorY = canvasHeight - 20;
    const obsY = floorY - obsHeight;

    setObstacles(prev => [...prev, { x: obsX, y: obsY, width: obsWidth, height: obsHeight, type }]);
    setLastX(obsX);
  };

  const update = (velocityX: number) => {
    setObstacles(prev => prev.map(obs => ({ ...obs, x: obs.x - velocityX })));
  };

  const filterVisible = (newOffsetX: number) => {
    setObstacles(prev => prev.filter(obs => obs.x + obs.width > newOffsetX - 100));
  };

  const reset = () => {
    setObstacles([]);
    setLastX(0);
  };

  return { obstacles, generate, update, filterVisible, reset };
};
