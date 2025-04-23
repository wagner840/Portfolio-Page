'use client';

import { useRef, useEffect } from 'react';
import { useEmoMode } from './emo-toggle-button';

export function BloodEffect() {
  const { isEmoMode } = useEmoMode();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Blood drops properties
  interface BloodDrop {
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
  }
  
  useEffect(() => {
    if (!isEmoMode || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to match window
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();
    
    // Create blood drops
    const bloodDrops: BloodDrop[] = [];
    const dropCount = Math.floor(window.innerWidth / 20); // One drop per 20px of width
    
    for (let i = 0; i < dropCount; i++) {
      bloodDrops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height, // Start above the screen
        size: 2 + Math.random() * 5,
        speed: 1 + Math.random() * 3,
        opacity: 0.7 + Math.random() * 0.3
      });
    }
    
    // Animation function
    const animate = () => {
      if (!isEmoMode) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update each blood drop
      bloodDrops.forEach((drop, index) => {
        // Draw blood drop
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 0, 0, ${drop.opacity})`;
        
        // Create teardrop shape
        ctx.moveTo(drop.x, drop.y);
        ctx.bezierCurveTo(
          drop.x - drop.size, drop.y - drop.size * 2,
          drop.x + drop.size, drop.y - drop.size * 2,
          drop.x, drop.y
        );
        
        ctx.fill();
        
        // Update position
        drop.y += drop.speed;
        
        // Reset position if out of screen
        if (drop.y > canvas.height) {
          drop.y = Math.random() * -100;
          drop.x = Math.random() * canvas.width;
        }
      });
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [isEmoMode]);
  
  if (!isEmoMode) return null;
  
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999
      }}
    />
  );
}
