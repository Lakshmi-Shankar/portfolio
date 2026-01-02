"use client";
import { useEffect, useRef } from "react";

export default function ClickSpark({
  sparkColor = "#ec4899",
  sparkCount = 10,
  sparkLength = 40,
  sparkWidth = 1,
  duration = 450,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const sparks = [];

    const spawn = (x, y) => {
      for (let i = 0; i < sparkCount; i++) {
        sparks.push({
          x,
          y,
          angle: (Math.PI * 2 * i) / sparkCount,
          start: performance.now(),
        });
      }
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        const progress = (time - s.start) / duration;

        if (progress >= 1) {
          sparks.splice(i, 1);
          continue;
        }

        const dist = progress * sparkLength;

        const x2 = s.x + Math.cos(s.angle) * dist;
        const y2 = s.y + Math.sin(s.angle) * dist;

        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = sparkWidth;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      requestAnimationFrame(draw);
    };

    window.addEventListener("click", (e) =>
      spawn(e.clientX, e.clientY)
    );

    requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", spawn);
    };
  }, [sparkColor, sparkCount, sparkLength, sparkWidth, duration]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
}
