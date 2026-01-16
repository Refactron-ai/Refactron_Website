'use client';
import React, { useId } from 'react';
import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

interface SparklesProps {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  particleColor?: string;
  speed?: number;
}

export const Sparkles = ({
  id,
  className,
  background = 'transparent',
  minSize = 0.6,
  maxSize = 1.4,
  particleDensity = 100,
  particleColor = '#FFFFFF',
  speed = 1,
}: SparklesProps) => {
  const generatedId = useId();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [particles, setParticles] = useState<any[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (canvasRef.current) {
      setContext(canvasRef.current.getContext('2d'));
    }
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const { offsetWidth, offsetHeight } = canvasRef.current.parentElement!;
      setDimensions({ width: offsetWidth, height: offsetHeight });
      canvasRef.current.width = offsetWidth;
      canvasRef.current.height = offsetHeight;
    }
  }, [canvasRef]);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const particleCount =
      (particleDensity * dimensions.width * dimensions.height) / 100000;
    const newParticles = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * (maxSize - minSize) + minSize,
        speedX: (Math.random() - 0.5) * speed,
        speedY: (Math.random() - 0.5) * speed,
        opacity: Math.random(),
      });
    }
    setParticles(newParticles);
  }, [dimensions, minSize, maxSize, particleDensity, speed]);

  useEffect(() => {
    if (!context || !canvasRef.current) return;

    let animationFrameId: number;

    const render = () => {
      context.clearRect(0, 0, dimensions.width, dimensions.height);

      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0) particle.x = dimensions.width;
        if (particle.x > dimensions.width) particle.x = 0;
        if (particle.y < 0) particle.y = dimensions.height;
        if (particle.y > dimensions.height) particle.y = 0;

        context.globalAlpha = particle.opacity;
        context.fillStyle = particleColor;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [context, particles, dimensions, particleColor]);

  return (
    <canvas
      ref={canvasRef}
      id={id || generatedId}
      className={cn(
        'absolute inset-0 h-full w-full pointer-events-none',
        className
      )}
      style={{ background }}
    />
  );
};
