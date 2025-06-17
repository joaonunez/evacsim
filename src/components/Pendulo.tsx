// src/components/Pendulo.tsx
import React, { useRef, useEffect, useState } from 'react';

const Pendulo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [theta, setTheta] = useState(Math.PI / 4); // 45°
  const [thetaVel, setThetaVel] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [isDropped, setIsDropped] = useState(false); // NUEVO estado

  const length = 150;
  const pxToMeters = 1 / 100;
  const lengthMeters = length * pxToMeters;

  const g = 0.4;
  const damping = 0.995;

  // Estado para la caída libre
  const [freeFallY, setFreeFallY] = useState(0);
  const [freeFallVel, setFreeFallVel] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const cx = canvas.width / 2;
    const cy = 50;

    let reqId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#eee';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (!isDropped) {
        // Péndulo normal
        const thetaAcc = (-g / length) * Math.sin(theta);
        const newThetaVel = (thetaVel + thetaAcc) * damping;
        const newTheta = theta + newThetaVel;

        setTheta(newTheta);
        setThetaVel(newThetaVel);

        const x = cx + length * Math.sin(newTheta);
        const y = cy + length * Math.cos(newTheta);

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fillStyle = 'orange';
        ctx.fill();
        ctx.stroke();
      } else {
        // Bola en caída libre
        const newVel = freeFallVel + g;
        const newY = freeFallY + newVel;

        // Piso en y=canvas.height - 20 (radio)
        if (newY >= canvas.height - 20) {
          setFreeFallY(canvas.height - 20);
          setFreeFallVel(0);
        } else {
          setFreeFallY(newY);
          setFreeFallVel(newVel);
        }

        ctx.beginPath();
        ctx.arc(cx, newY, 20, 0, Math.PI * 2);
        ctx.fillStyle = 'orange';
        ctx.fill();
        ctx.stroke();
      }

      reqId = requestAnimationFrame(animate);
    };

    if (isRunning) {
      reqId = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(reqId);
  }, [isRunning, theta, thetaVel, isDropped, freeFallY, freeFallVel]);

  // Click para reanudar péndulo normal desde ángulo
  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDropped) return; // Si está caído, ignora

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

  // Velocidad lineal en m/s y km/h solo si no está caído
  const linearVelocity = Math.abs(thetaVel) * lengthMeters;
  const linearVelocityMS = linearVelocity * 60;
  const linearVelocityKMH = linearVelocityMS * 3.6;

  // Botón soltar: cambia a caída libre
  const handleDrop = () => {
    setIsDropped(true);
    setIsRunning(true);
    setFreeFallY(50 + length); // empieza desde la punta del hilo
    setFreeFallVel(0);
  };

  // Botón reiniciar: restablece todo
  const handleReset = () => {
    setIsDropped(false);
    setIsRunning(false);
    setTheta(Math.PI / 4);
    setThetaVel(0);
    setFreeFallY(0);
    setFreeFallVel(0);
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        className="border"
        onClick={handleClick}
        style={{ background: '#eee' }}
      />
      <p className="mt-4 text-center">
        Haz click para soltar el péndulo desde un ángulo
      </p>
      {!isDropped && (
        <>
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
          Soltar Bola
        </button>
        <button
          onClick={handleReset}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
};

export default Pendulo;
