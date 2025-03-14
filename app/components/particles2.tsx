"use client";
import React, { useRef, useEffect } from "react";
import { useMousePosition } from "@/util/mouse";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
}

export default function Particles2({
  className = "",
  quantity = 60,
  staticity = 40,
  ease = 40,
  refresh = false,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<any[]>([]);
  const mousePosition = useMousePosition();
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const animationFrameId = useRef<number | NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    animate();

    const handleInitialResize = () => {
      initCanvas();
    };
    window.addEventListener("resize", initCanvas);
    window.addEventListener("load", handleInitialResize);

    return () => {
      window.removeEventListener("resize", initCanvas);
      window.removeEventListener("load", handleInitialResize);
      if (animationFrameId.current) {
        if (typeof animationFrameId.current === "number") {
          cancelAnimationFrame(animationFrameId.current);
        } else {
          clearTimeout(animationFrameId.current);
        }
        animationFrameId.current = null;
      }
    };
  }, []);

  useEffect(() => {
    onMouseMove();
  }, [mousePosition.x, mousePosition.y]);

  useEffect(() => {
    initCanvas();
  }, [refresh]);

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  const onMouseMove = () => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const { w, h } = canvasSize.current;
      const x = mousePosition.x - rect.left - w / 2;
      const y = mousePosition.y - rect.top - h / 2;
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
      if (inside) {
        mouse.current.x = x;
        mouse.current.y = y;
      }
    }
  };

  type Circle = {
    x: number;
    y: number;
    translateX: number;
    translateY: number;
    size: number;
    alpha: number;
    targetAlpha: number;
    dx: number;
    dy: number;
    magnetism: number;
    blink?: boolean; // Added for blinking stars
    blinkPhase?: number; // Phase for blinking animation
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current.length = 0;
      canvasSize.current.w = canvasContainerRef.current.offsetWidth || window.innerWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight || window.innerHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
    }
  };

  const circleParams = (): Circle => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const translateX = 0;
    const translateY = 0;
    const size = Math.floor(Math.random() * 1.5) + 0.1; // Smaller size (was 2 + 0.1)
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.8 + 0.2).toFixed(1)); // Brighter (was 0.6 + 0.1)
    const dx = (Math.random() - 0.5) * 0.2;
    const dy = (Math.random() - 0.5) * 0.2;
    const magnetism = 0.1 + Math.random() * 4;
    const blink = Math.random() < 0.3; // 20% chance to blink
    const blinkPhase = Math.random() * Math.PI * 2; // Random phase for blinking
    return { x, y, translateX, translateY, size, alpha, targetAlpha, dx, dy, magnetism, blink, blinkPhase };
  };

  const drawCircle = (circle: Circle, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha } = circle;
      context.current.translate(translateX, translateY);
      context.current.beginPath();
      const increasedSize = size * 2; // Reduced multiplier (was 2.5)
      context.current.arc(x, y, increasedSize, 0, 2 * Math.PI);
      context.current.fillStyle = `rgba(255, 255, 255, ${alpha})`; // Brighter white
      context.current.fill();
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!update) circles.current.push(circle);
    }
  };

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
    }
  };

  const drawParticles = () => {
    clearContext();
    for (let i = 0; i < quantity; i++) {
      const circle = circleParams();
      drawCircle(circle);
    }
  };

  const remapValue = (value: number, start1: number, end1: number, start2: number, end2: number): number => {
    const remapped = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  };

  const animate = () => {
    clearContext();
    const time = Date.now() * 0.001; // Time for blinking animation
    circles.current.forEach((circle: Circle, i: number) => {
      const edge = [
        circle.x + circle.translateX - circle.size,
        canvasSize.current.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        canvasSize.current.h - circle.y - circle.translateY - circle.size,
      ];
      const closestEdge = edge.reduce((a, b) => Math.min(a, b));
      const remapClosestEdge = parseFloat(remapValue(closestEdge, 0, 20, 0, 1).toFixed(2));
      let finalAlpha = circle.alpha;

      // Handle blinking for stars
      if (circle.blink) {
        const blinkSpeed = 1.5; // Adjust speed of blinking
        finalAlpha = circle.targetAlpha * (0.5 + 0.5 * Math.sin(time * blinkSpeed + circle.blinkPhase!));
      } else if (remapClosestEdge > 1) {
        if (circle.alpha < circle.targetAlpha - 0.02) circle.alpha += 0.02;
        else circle.alpha = circle.targetAlpha;
      } else {
        const newAlpha = circle.targetAlpha * remapClosestEdge;
        if (Math.abs(circle.alpha - newAlpha) > 0.01) circle.alpha = newAlpha;
      }

      circle.x += circle.dx;
      circle.y += circle.dy;
      circle.translateX += (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) / ease;
      circle.translateY += (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) / ease;
      if (
        circle.x < -circle.size || circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size || circle.y > canvasSize.current.h + circle.size
      ) {
        circles.current.splice(i, 1);
        const newCircle = circleParams();
        drawCircle(newCircle);
      } else {
        drawCircle({ ...circle, x: circle.x, y: circle.y, translateX: circle.translateX, translateY: circle.translateY, alpha: finalAlpha }, true);
      }
    });
    animationFrameId.current = setTimeout(() => requestAnimationFrame(animate), 33); // ~30 FPS
  };

  return (
    <div className={className} ref={canvasContainerRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}