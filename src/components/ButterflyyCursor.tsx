import { useEffect, useRef, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  dx: number;
  dy: number;
}

export default function ButterflyCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const posRef = useRef({ x: -200, y: -200 });
  const animFrameRef = useRef<number>(0);
  const particleIdRef = useRef(0);
  const trailTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const colors = ['#60a5fa', '#3b82f6', '#93c5fd', '#bfdbfe', '#2563eb'];

    const moveCursor = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }

      // Add trail particle
      if (trailTimerRef.current) clearTimeout(trailTimerRef.current);
      trailTimerRef.current = setTimeout(() => {
        const id = particleIdRef.current++;
        const size = Math.random() * 5 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;
        setParticles(prev => [
          ...prev.slice(-25),
          {
            id,
            x: e.clientX + offsetX,
            y: e.clientY + offsetY,
            size,
            color,
            dx: (Math.random() - 0.5) * 30,
            dy: (Math.random() - 0.5) * 30,
          }
        ]);
      }, 20);
    };

    const handleClick = (e: MouseEvent) => {
      const burst: Particle[] = [];
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const id = particleIdRef.current++;
        burst.push({
          id,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          dx: Math.cos(angle) * (Math.random() * 60 + 20),
          dy: Math.sin(angle) * (Math.random() * 60 + 20),
        });
      }
      setParticles(prev => [...prev.slice(-20), ...burst]);

      // Create burst ring
      const ring = document.createElement('div');
      ring.className = 'click-burst';
      ring.style.left = `${e.clientX - 20}px`;
      ring.style.top = `${e.clientY - 20}px`;
      ring.style.width = '40px';
      ring.style.height = '40px';
      ring.style.border = '2px solid rgba(96, 165, 250, 0.8)';
      document.body.appendChild(ring);
      setTimeout(() => ring.remove(), 600);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('click', handleClick);
    document.addEventListener('mouseover', handleMouseOver);

    // Clean up particles
    const cleanupInterval = setInterval(() => {
      setParticles(prev => prev.slice(-20));
    }, 1000);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mouseover', handleMouseOver);
      clearInterval(cleanupInterval);
      if (trailTimerRef.current) clearTimeout(trailTimerRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <>
      {/* Butterfly cursor */}
      <div
        ref={cursorRef}
        className="butterfly-cursor"
        style={{
          position: 'fixed',
          left: '-200px',
          top: '-200px',
          transform: 'translate(-50%, -50%)',
          zIndex: 99999,
          pointerEvents: 'none',
        }}
      >
        <svg
          width={isHovering ? 48 : 36}
          height={isHovering ? 48 : 36}
          viewBox="0 0 80 80"
          style={{
            filter: isHovering
              ? 'drop-shadow(0 0 12px #3b82f6) drop-shadow(0 0 30px #60a5fa) drop-shadow(0 0 50px #2563eb)'
              : 'drop-shadow(0 0 6px #3b82f6) drop-shadow(0 0 15px #60a5fa)',
            transition: 'width 0.2s ease, height 0.2s ease, filter 0.2s ease',
          }}
        >
          {/* Left wing top */}
          <ellipse
            cx="30" cy="28"
            rx="22" ry="14"
            fill="rgba(59, 130, 246, 0.7)"
            stroke="rgba(147, 197, 253, 0.9)"
            strokeWidth="1"
            style={{ animation: 'wingFlap 0.2s ease-in-out infinite alternate', transformOrigin: '40px 40px' }}
          />
          {/* Right wing top */}
          <ellipse
            cx="50" cy="28"
            rx="22" ry="14"
            fill="rgba(59, 130, 246, 0.7)"
            stroke="rgba(147, 197, 253, 0.9)"
            strokeWidth="1"
            style={{ animation: 'wingFlap 0.2s ease-in-out infinite alternate-reverse', transformOrigin: '40px 40px' }}
          />
          {/* Left wing bottom */}
          <ellipse
            cx="28" cy="48"
            rx="16" ry="10"
            fill="rgba(37, 99, 235, 0.6)"
            stroke="rgba(147, 197, 253, 0.7)"
            strokeWidth="1"
            style={{ animation: 'wingFlap 0.2s ease-in-out infinite alternate', transformOrigin: '40px 40px' }}
          />
          {/* Right wing bottom */}
          <ellipse
            cx="52" cy="48"
            rx="16" ry="10"
            fill="rgba(37, 99, 235, 0.6)"
            stroke="rgba(147, 197, 253, 0.7)"
            strokeWidth="1"
            style={{ animation: 'wingFlap 0.2s ease-in-out infinite alternate-reverse', transformOrigin: '40px 40px' }}
          />
          {/* Wing patterns */}
          <circle cx="30" cy="28" r="4" fill="rgba(191, 219, 254, 0.5)" />
          <circle cx="50" cy="28" r="4" fill="rgba(191, 219, 254, 0.5)" />
          {/* Body */}
          <ellipse cx="40" cy="40" rx="3" ry="12" fill="rgba(219, 234, 254, 0.9)" />
          {/* Antennae */}
          <line x1="38" y1="28" x2="32" y2="18" stroke="rgba(191, 219, 254, 0.8)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="42" y1="28" x2="48" y2="18" stroke="rgba(191, 219, 254, 0.8)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="32" cy="18" r="2" fill="rgba(191, 219, 254, 0.9)" />
          <circle cx="48" cy="18" r="2" fill="rgba(191, 219, 254, 0.9)" />
        </svg>
      </div>

      {/* Particle trail */}
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            '--dx': `${p.dx}px`,
            '--dy': `${p.dy}px`,
          } as React.CSSProperties}
        />
      ))}
    </>
  );
}
