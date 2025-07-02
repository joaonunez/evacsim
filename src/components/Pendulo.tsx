import React, { useRef, useEffect, useState } from "react";
import { useParallaxBackground } from "../hooks/useParallaxBackground";
import { useObstacles } from "../hooks/useObstacles";

const Pendulo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedSpeed, setSelectedSpeed] = useState(4); // valor por defecto (×1)
  const [appliedSpeed, setAppliedSpeed] = useState(4); // se usará para movimiento

  // Péndulo y física
  const [theta, setTheta] = useState(Math.PI / 4);
  const [thetaVel, setThetaVel] = useState(0.05); // Movimiento inicial
  const [isRunning, setIsRunning] = useState(true);
  const [isDropped, setIsDropped] = useState(false);
  const [selectedGravity, setSelectedGravity] = useState(0.4); // valor por defecto
  const [appliedGravity, setAppliedGravity] = useState(0.4); // se usará para saltar

  const length = 150;
  const pxToMeters = 1 / 100;
  const lengthMeters = length * pxToMeters;
  const damping = 0.995;

  // Bola y mundo
  const [freeFallY, setFreeFallY] = useState(0);
  const [freeFallVelY, setFreeFallVelY] = useState(0);
  const [velocityX, setVelocityX] = useState(0);
  const [worldOffsetX, setWorldOffsetX] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const jumpStrength = -10;

  // Hooks
  const {
    bgImage,
    update: updateParallax,
    isLoaded,
  } = useParallaxBackground(
    "https://opengameart.org/sites/default/files/background0.png"
  );

  const {
    obstacles,
    generate,
    update: updateObstacles,
    filterVisible,
    reset: resetObstacles,
  } = useObstacles();

  useEffect(() => {
    if (!isLoaded) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const cx = canvas.width / 2;
    const cy = 50;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setVelocityX(-appliedSpeed);
      if (e.key === "ArrowRight") setVelocityX(appliedSpeed);

      if (e.key === "ArrowUp" && !isJumping) {
        setFreeFallVelY(jumpStrength);
        setIsJumping(true);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") setVelocityX(0);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    let reqId: number;
    let frameCount = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fondo
      const newBgOffset = updateParallax(velocityX);
      const bgW = bgImage.current.width;
      for (let i = -1; i <= 1; i++) {
        ctx.drawImage(
          bgImage.current,
          (newBgOffset % bgW) + i * bgW,
          0,
          bgW,
          canvas.height
        );
      }

      if (!isDropped) {
        // Péndulo
        const thetaAcc = (-appliedGravity / length) * Math.sin(theta);

        const newThetaVel = (thetaVel + thetaAcc) * damping;
        const newTheta = theta + newThetaVel;

        setTheta(newTheta);
        setThetaVel(newThetaVel);

        const x = cx + length * Math.sin(newTheta);
        const y = cy + length * Math.cos(newTheta);

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fillStyle = "orange";
        ctx.fill();
        ctx.stroke();
      } else {
        // Modo juego
        const newOffsetX = worldOffsetX - velocityX;
        setWorldOffsetX(newOffsetX);

        const newVelY = freeFallVelY + appliedGravity;
        let newY = freeFallY + newVelY;

        if (frameCount % 40 === 0 && velocityX !== 0) {
          generate(worldOffsetX, canvas.width, canvas.height);
        }

        updateObstacles(velocityX);
        filterVisible(newOffsetX);

        for (const obs of obstacles) {
          const obsScreenX = obs.x - newOffsetX + cx;
          if (
            cx > obsScreenX &&
            cx < obsScreenX + obs.width &&
            newY + 20 > obs.y &&
            newY - 20 < obs.y + obs.height
          ) {
            alert("💥 ¡Perdiste! Choque detectado.");
            handleReset();
            return;
          }
        }

        const floorY = canvas.height - 20;
        if (newY >= floorY) {
          newY = floorY;
          setIsJumping(false);
        }

        setFreeFallY(newY);
        setFreeFallVelY(newVelY);

        ctx.fillStyle = "#444";
        ctx.fillRect(0, floorY, canvas.width, 20);

        ctx.beginPath();
        ctx.arc(cx, newY, 20, 0, Math.PI * 2);
        ctx.fillStyle = "orange";
        ctx.fill();
        ctx.stroke();

        for (const obs of obstacles) {
          const obsScreenX = obs.x - newOffsetX + cx;
          ctx.fillStyle =
            obs.type === 1 ? "red" : obs.type === 2 ? "blue" : "green";
          ctx.fillRect(obsScreenX, obs.y, obs.width, obs.height);
          ctx.strokeStyle = "#000";
          ctx.lineWidth = 2;
          ctx.strokeRect(obsScreenX, obs.y, obs.width, obs.height);
        }

        frameCount++;
      }

      reqId = requestAnimationFrame(animate);
    };

    if (isRunning) {
      reqId = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(reqId);
    };
  }, [
    isRunning,
    theta,
    thetaVel,
    isDropped,
    freeFallY,
    freeFallVelY,
    velocityX,
    worldOffsetX,
    obstacles,
    isJumping,
    isLoaded, // ⚠️ CRUCIAL
  ]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDropped) return;

    const rect = canvasRef.current!.getBoundingClientRect();
    const cx = canvasRef.current!.width / 2;
    const cy = 50;
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const dx = mx - cx;
    const dy = my - cy;
    const angle = Math.atan2(dx, dy);

    setTheta(angle);
    setThetaVel(0);
    setIsRunning(true);
  };

  const handleDrop = () => {
    setIsDropped(true);
    setIsRunning(true);
    setFreeFallY(50 + length);
    setFreeFallVelY(0);
    setWorldOffsetX(0);
    resetObstacles();
  };

  const handleReset = () => {
    setIsDropped(false);
    setTheta(Math.PI / 4);
    setThetaVel(0.05); // mantener movimiento tras reset
    setFreeFallY(0);
    setFreeFallVelY(0);
    setVelocityX(0);
    setWorldOffsetX(0);
    setIsJumping(false);
    resetObstacles();
    setIsRunning(true);
  };

  const linearVelocity = Math.abs(thetaVel) * lengthMeters;
  const linearVelocityKMH = linearVelocity * 60 * 3.6;

  return (
    <div className="flex flex-col items-center mt-8">
      {!isLoaded ? (
        <p className="text-center mt-4">Cargando fondo...</p>
      ) : (
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          className="border"
          onClick={handleClick}
          style={{ background: "#eee" }}
        />
      )}
      {!isDropped && (
        <>
          <p className="mt-4 text-center">
            Haz click para soltar el péndulo desde un ángulo
          </p>
          <p className="mt-2 text-center font-mono">
            Velocidad angular: {thetaVel.toFixed(4)} rad/frame
          </p>
          <p className="mt-1 text-center font-mono">
            Velocidad lineal: {linearVelocityKMH.toFixed(2)} km/h
          </p>
        </>
      )}
      <div className="mt-4 flex gap-4">
        <button
          onClick={handleDrop}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Soltar Bola (Jugar)
        </button>
        <button
          onClick={handleReset}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Reiniciar
        </button>
      </div>
      {isDropped && (
        <p className="mt-2 text-center">
          Usa ← → para moverte y ↑ para saltar. ¡Evita obstáculos!
        </p>
      )}
      <div className="mt-4 flex flex-col items-center gap-2">
        <label className="text-sm font-semibold">Velocidad de avance:</label>
        <select
          value={selectedSpeed}
          onChange={(e) => setSelectedSpeed(parseInt(e.target.value))}
          className="border px-2 py-1 rounded"
        >
          <option value={4}>14.40 km/h (Normal)</option>
          <option value={8}>28.80 km/h (Media)</option>
          <option value={12}>43.20 km/h (Alta)</option>
        </select>

        <label className="text-sm font-semibold mt-2">Gravedad:</label>
        <select
          value={selectedGravity}
          onChange={(e) => setSelectedGravity(parseFloat(e.target.value))}
          className="border px-2 py-1 rounded"
        >
          <option value={0.2}>🌕 Gravedad baja (0.2)</option>
          <option value={0.4}>🌍 Gravedad normal (0.4)</option>
          <option value={0.8}>🔥 Gravedad alta (0.8)</option>
        </select>

        <button
          onClick={() => {
            setAppliedSpeed(selectedSpeed);
            setAppliedGravity(selectedGravity);
          }}
          className="bg-green-600 text-white px-3 py-1 rounded mt-2"
        >
          Aplicar Cambios
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Obstáculos en pantalla: {obstacles.length}
      </p>
    </div>
  );
};

export default Pendulo;
