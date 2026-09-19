import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Video, Activity, Sparkles, Eye, EyeOff } from 'lucide-react';

export type BackgroundMode = 'video' | 'molecules' | 'minimal';

interface HeroVideoBackgroundProps {
  className?: string;
}

export const HeroVideoBackground: React.FC<HeroVideoBackgroundProps> = ({ className = '' }) => {
  const [mode, setMode] = useState<BackgroundMode>('video');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted] = useState<boolean>(true);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // High-reliability clinical laboratory & molecular research ambient video loop
  // Royalty-free, CDN-hosted, lightweight compressed web-ready video stream
  const videoSources = [
    'https://assets.mixkit.co/videos/preview/mixkit-scientist-working-with-test-tubes-in-a-laboratory-41487-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-doctor-analyzing-a-sample-under-a-microscope-41484-large.mp4'
  ];
  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);

  // Toggle Play / Pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    }
    setIsPlaying(!isPlaying);
  };

  // Switch to next video if error happens
  const handleVideoError = () => {
    if (currentSourceIndex < videoSources.length - 1) {
      setCurrentSourceIndex((prev) => prev + 1);
    } else {
      // Fallback gracefully to kinetic molecular animation
      setMode('molecules');
    }
  };

  // Procedural Canvas Animation for 'molecules' or fallback
  useEffect(() => {
    if (mode !== 'molecules') {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate molecular nodes
    const nodeCount = Math.min(32, Math.floor(width / 35));
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      pulse: number;
      pulseSpeed: number;
      type: 'receptor' | 'ligand' | 'ion';
    }> = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2.5 + 2,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
        type: i % 4 === 0 ? 'receptor' : i % 3 === 0 ? 'ion' : 'ligand',
      });
    }

    let waveOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle pharmacokinetic concentration curve in the background
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(30, 107, 94, 0.07)';
      ctx.lineWidth = 1.5;
      waveOffset += 0.008;

      for (let x = 0; x < width; x += 6) {
        const normalizedX = x / width;
        // Two-compartment PK curve formula: C(t) = A*e^(-alpha*t) + B*e^(-beta*t) with oscillating baseline
        const pkY =
          height * 0.75 -
          Math.sin(normalizedX * Math.PI * 2 + waveOffset) * 22 -
          (Math.exp(-normalizedX * 2.2) * 90 - Math.exp(-normalizedX * 6) * 70);

        if (x === 0) {
          ctx.moveTo(x, pkY);
        } else {
          ctx.lineTo(x, pkY);
        }
      }
      ctx.stroke();

      // 2. Draw molecular bonds (connections between nodes within threshold distance)
      const maxDistance = 115;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.14;
            ctx.strokeStyle = `rgba(30, 107, 94, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // 3. Draw nodes
      for (const node of nodes) {
        // Move
        node.x += node.vx;
        node.y += node.vy;

        // Wrap around borders
        if (node.x < -10) node.x = width + 10;
        if (node.x > width + 10) node.x = -10;
        if (node.y < -10) node.y = height + 10;
        if (node.y > height + 10) node.y = -10;

        node.pulse += node.pulseSpeed;
        const currentR = node.radius + Math.sin(node.pulse) * 0.8;

        // Outer glow
        ctx.beginPath();
        const glowColor =
          node.type === 'receptor'
            ? 'rgba(30, 107, 94, 0.22)'
            : node.type === 'ion'
            ? 'rgba(180, 83, 9, 0.16)'
            : 'rgba(75, 83, 80, 0.18)';
        ctx.fillStyle = glowColor;
        ctx.arc(node.x, node.y, currentR + 3, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.fillStyle =
          node.type === 'receptor'
            ? 'rgba(30, 107, 94, 0.75)'
            : node.type === 'ion'
            ? 'rgba(217, 119, 6, 0.65)'
            : 'rgba(75, 83, 80, 0.6)';
        ctx.arc(node.x, node.y, currentR, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [mode]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* BACKGROUND LAYER 1: Ambient Video */}
      {mode === 'video' && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            ref={videoRef}
            key={videoSources[currentSourceIndex]}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            onError={handleVideoError}
            className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${
              videoLoaded && isPlaying ? 'opacity-25' : 'opacity-10'
            } filter saturate-75 brightness-95 contrast-105`}
          >
            <source src={videoSources[currentSourceIndex]} type="video/mp4" />
          </video>
        </div>
      )}

      {/* BACKGROUND LAYER 2: Molecular Procedural Canvas */}
      {mode === 'molecules' && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 w-full h-full pointer-events-none opacity-80"
        />
      )}

      {/* GRADIENT OVERLAY (Guarantees WCAG AAA contrast for dark text on top) */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-r from-[#F7F6F2]/95 via-[#F7F6F2]/80 to-[#F7F6F2]/90 backdrop-blur-[1px]" />

      {/* SUBTLE MEDICAL GRID PATTERN */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(#1E6B5E 1px, transparent 1px), linear-gradient(90deg, #1E6B5E 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
      />

      {/* FLOATING CONTROLS FOR USER CONVENIENCE */}
      <div className="absolute top-3 right-4 sm:right-6 z-20 flex items-center gap-1.5 p-1 rounded-lg bg-white/80 border border-[#DCD8CF]/80 backdrop-blur-md shadow-xs text-xs">
        <span className="text-[0.68rem] text-[#757D79] font-medium px-1.5 hidden sm:inline">
          Background:
        </span>

        {/* Video Mode */}
        <button
          type="button"
          onClick={() => {
            setMode('video');
            setIsPlaying(true);
            if (videoRef.current) videoRef.current.play().catch(() => {});
          }}
          className={`px-2 py-1 rounded text-[0.7rem] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
            mode === 'video'
              ? 'bg-[#1E6B5E] text-white shadow-xs'
              : 'text-[#4B5350] hover:bg-[#FAF9F5]'
          }`}
          title="Laboratory & Research Video Loop"
        >
          <Video className="w-3 h-3" />
          <span>Lab Video</span>
        </button>

        {/* Molecular Canvas Mode */}
        <button
          type="button"
          onClick={() => setMode('molecules')}
          className={`px-2 py-1 rounded text-[0.7rem] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
            mode === 'molecules'
              ? 'bg-[#1E6B5E] text-white shadow-xs'
              : 'text-[#4B5350] hover:bg-[#FAF9F5]'
          }`}
          title="Interactive Molecular Dynamics Animation"
        >
          <Activity className="w-3 h-3" />
          <span className="hidden sm:inline">Molecular</span>
        </button>

        {/* Minimal Mode */}
        <button
          type="button"
          onClick={() => setMode('minimal')}
          className={`px-2 py-1 rounded text-[0.7rem] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
            mode === 'minimal'
              ? 'bg-[#1E6B5E] text-white shadow-xs'
              : 'text-[#4B5350] hover:bg-[#FAF9F5]'
          }`}
          title="Static Minimal Background"
        >
          <EyeOff className="w-3 h-3" />
          <span className="hidden md:inline">Static</span>
        </button>

        {/* Play / Pause toggle if in video mode */}
        {mode === 'video' && (
          <button
            type="button"
            onClick={togglePlay}
            className="p-1 text-[#4B5350] hover:text-[#1E6B5E] hover:bg-[#FAF9F5] rounded transition-colors ml-0.5"
            title={isPlaying ? 'Pause background video' : 'Play background video'}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
        )}
      </div>
    </div>
  );
};
