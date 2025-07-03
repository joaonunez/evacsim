//src/hooks/useParallaxBackground.ts
import { useRef, useState, useEffect } from 'react';

export const useParallaxBackground = (imageUrl: string) => {
  const bgImage = useRef<HTMLImageElement>(new Image());
  const [bgOffset, setBgOffset] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = bgImage.current;
    img.onload = () => setIsLoaded(true);
    img.src = imageUrl;
  }, [imageUrl]);

  const update = (velocityX: number) => {
    const newOffset = bgOffset - velocityX * 0.5;
    setBgOffset(newOffset);
    return newOffset;
  };

  return { bgImage, bgOffset, update, isLoaded };
};
