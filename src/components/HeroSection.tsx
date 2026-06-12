import { useEffect, useRef } from 'react';

interface FloatingParticle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
}

export default function HeroSection({ onGetStarted }: { onGetStarted: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<FloatingParticle[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Init particles
    const colors = ['rgba(59,130,246,', 'rgba(96,165,250,', 'rgba(147,197,253,', 'rgba(37,99,235,'];
    particlesRef.current = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.6 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let ribbonOffset = 0;

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw ribbons
      ribbonOffset += 0.003;
      const ribbons = [
        { y: canvas.height * 0.3, amplitude: 80, freq: 0.003, color: 'rgba(59,130,246,0.08)', width: 120 },
        { y: canvas.height * 0.5, amplitude: 60, freq: 0.004, color: 'rgba(37,99,235,0.06)', width: 80 },
        { y: canvas.height * 0.7, amplitude: 100, freq: 0.002, color: 'rgba(96,165,250,0.07)', width: 100 },
      ];

      ribbons.forEach(r => {
        ctx.beginPath();
        ctx.moveTo(0, r.y);
        for (let x = 0; x <= canvas.width; x += 5) {
          const y = r.y + Math.sin(x * r.freq + ribbonOffset) * r.amplitude;
          ctx.lineTo(x, y);
        }
        ctx.lineWidth = r.width;
        ctx.strokeStyle = r.color;
        ctx.stroke();
      });

      // Draw particles
      particlesRef.current.forEach(p => {
        p.y -= p.speed;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        grad.addColorStop(0, `${p.color}${p.opacity * 0.5})`);
        grad.addColorStop(1, `${p.color}0)`);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // Light streaks
      const streakTime = Date.now() * 0.001;
      for (let i = 0; i < 3; i++) {
        const progress = ((streakTime * 0.3 + i * 0.33) % 1);
        const x = progress * canvas.width * 1.5 - canvas.width * 0.25;
        const y = canvas.height * (0.2 + i * 0.3);
        const len = 200 + i * 80;
        const grad = ctx.createLinearGradient(x - len, y, x + len, y + 20);
        grad.addColorStop(0, 'rgba(59,130,246,0)');
        grad.addColorStop(0.5, `rgba(96,165,250,${0.3 - i * 0.05})`);
        grad.addColorStop(1, 'rgba(59,130,246,0)');
        ctx.beginPath();
        ctx.moveTo(x - len, y);
        ctx.lineTo(x + len, y + 20);
        ctx.lineWidth = 2 - i * 0.3;
        ctx.strokeStyle = grad;
        ctx.stroke();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 20% 50%, rgba(37,99,235,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(59,130,246,0.1) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(29,78,216,0.12) 0%, transparent 60%), linear-gradient(135deg, #000510 0%, #000d1f 40%, #001133 70%, #000820 100%)',
      }}
    >
      {/* Canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />

      {/* Ambient orbs */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
        <div
          className="orb absolute"
          style={{
            width: '600px', height: '600px',
            left: '-200px', top: '-200px',
            background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)',
            animation: 'float 10s ease-in-out infinite',
          }}
        />
        <div
          className="orb absolute"
          style={{
            width: '500px', height: '500px',
            right: '-150px', top: '20%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
            animation: 'float 14s ease-in-out infinite',
            animationDelay: '-5s',
          }}
        />
        <div
          className="orb absolute"
          style={{
            width: '400px', height: '400px',
            left: '30%', bottom: '-100px',
            background: 'radial-gradient(circle, rgba(29,78,216,0.18) 0%, transparent 70%)',
            animation: 'float 12s ease-in-out infinite',
            animationDelay: '-3s',
          }}
        />
      </div>

      {/* Decorative grid lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          zIndex: 1,
        }}
      />

      {/* Floating butterflies in background */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        {/* Butterfly 1 */}
        <div
          className="absolute animate-float-butterfly animate-glow-pulse"
          style={{ left: '10%', top: '20%' }}
        >
          <ButterflyDecor size={60} opacity={0.6} />
        </div>
        {/* Butterfly 2 */}
        <div
          className="absolute animate-float-butterfly2 animate-glow-pulse"
          style={{ right: '12%', top: '30%', animationDelay: '-4s' }}
        >
          <ButterflyDecor size={45} opacity={0.5} />
        </div>
        {/* Butterfly 3 */}
        <div
          className="absolute"
          style={{
            left: '25%', bottom: '25%',
            animation: 'floatButterfly 18s ease-in-out infinite',
            animationDelay: '-8s',
          }}
        >
          <ButterflyDecor size={35} opacity={0.4} />
        </div>
      </div>

      {/* Main content */}
      <div className="relative flex flex-col items-center justify-center text-center px-4" style={{ zIndex: 3 }}>
        {/* Decorative ring */}
        <div
          className="absolute"
          style={{
            width: '500px', height: '500px',
            border: '1px solid rgba(59,130,246,0.1)',
            borderRadius: '50%',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'rotateGlow 30s linear infinite',
          }}
        />
        <div
          className="absolute"
          style={{
            width: '700px', height: '700px',
            border: '1px solid rgba(59,130,246,0.05)',
            borderRadius: '50%',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'rotateGlow 45s linear infinite reverse',
          }}
        />

        {/* Logo "AS" */}
        <div
          className="animate-fade-in-up"
          style={{
            fontFamily: "'Cinzel Decorative', cursive",
            fontSize: 'clamp(80px, 18vw, 200px)',
            fontWeight: 900,
            lineHeight: 0.9,
            color: 'transparent',
            background: 'linear-gradient(135deg, #ffffff 0%, #93c5fd 30%, #3b82f6 60%, #60a5fa 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            textShadow: 'none',
            filter: 'drop-shadow(0 0 30px rgba(59,130,246,0.8)) drop-shadow(0 0 80px rgba(59,130,246,0.4))',
            letterSpacing: '-0.02em',
            marginBottom: '8px',
          }}
        >
          AS
        </div>

        {/* Divider line */}
        <div
          className="animate-fade-in-up"
          style={{
            animationDelay: '0.2s',
            opacity: 0,
            width: 'clamp(200px, 40vw, 500px)',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.8), rgba(59,130,246,1), rgba(96,165,250,0.8), transparent)',
            margin: '12px auto',
            boxShadow: '0 0 10px rgba(59,130,246,0.8)',
          }}
        />

        {/* "CREATION SPACE" text */}
        <div
          className="animate-fade-in-up"
          style={{
            animationDelay: '0.4s',
            opacity: 0,
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: 'clamp(14px, 3.5vw, 42px)',
            fontWeight: 300,
            letterSpacing: 'clamp(8px, 2vw, 20px)',
            color: 'rgba(147,197,253,0.95)',
            textTransform: 'uppercase',
            textShadow: '0 0 20px rgba(59,130,246,0.6), 0 0 40px rgba(59,130,246,0.3)',
          }}
        >
          CREATION SPACE
        </div>

        {/* Tagline */}
        <div
          className="animate-fade-in-up mt-8"
          style={{
            animationDelay: '0.7s',
            opacity: 0,
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: 'clamp(11px, 1.5vw, 16px)',
            fontWeight: 400,
            letterSpacing: '4px',
            color: 'rgba(96,165,250,0.6)',
            textTransform: 'uppercase',
          }}
        >
          WHERE VISION BECOMES ART
        </div>

        {/* CTA Buttons */}
        <div
          className="flex gap-6 mt-12 animate-fade-in-up"
          style={{ animationDelay: '1s', opacity: 0 }}
        >
          <button
            onClick={() => {
              document.getElementById('biography')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="glass-card px-8 py-3 rounded-full"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '14px',
              letterSpacing: '3px',
              fontWeight: 600,
              color: 'rgba(147,197,253,0.9)',
              textTransform: 'uppercase',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.15)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(59,130,246,0.5)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = '';
              (e.currentTarget as HTMLElement).style.borderColor = '';
            }}
          >
            Explore
          </button>
          <button
            onClick={onGetStarted}
            className="get-started-btn px-8 py-3 rounded-full"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '14px',
              letterSpacing: '3px',
              fontWeight: 600,
              color: '#ffffff',
              textTransform: 'uppercase',
            }}
          >
            Our Work
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 3 }}
      >
        <span
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: '11px',
            letterSpacing: '4px',
            color: 'rgba(96,165,250,0.5)',
            textTransform: 'uppercase',
          }}
        >
          Scroll Down
        </span>
        <div className="animate-scroll-bounce flex flex-col items-center gap-1">
          <div
            style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, rgba(59,130,246,0.8), transparent)',
              boxShadow: '0 0 6px rgba(59,130,246,0.6)',
            }}
          />
          <div
            style={{
              width: '6px', height: '6px',
              borderRadius: '50%',
              background: 'rgba(59,130,246,0.8)',
              boxShadow: '0 0 8px rgba(59,130,246,0.8)',
            }}
          />
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-8 left-8" style={{ zIndex: 3 }}>
        <div style={{ width: '30px', height: '2px', background: 'rgba(59,130,246,0.5)', marginBottom: '4px' }} />
        <div style={{ width: '2px', height: '30px', background: 'rgba(59,130,246,0.5)' }} />
      </div>
      <div className="absolute top-8 right-8" style={{ zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <div style={{ width: '30px', height: '2px', background: 'rgba(59,130,246,0.5)', marginBottom: '4px' }} />
        <div style={{ width: '2px', height: '30px', background: 'rgba(59,130,246,0.5)', alignSelf: 'flex-end' }} />
      </div>

      {/* Nav bar */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-10 py-6"
        style={{ zIndex: 10 }}
      >
        <div style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '12px',
          letterSpacing: '4px',
          color: 'rgba(96,165,250,0.6)',
          textTransform: 'uppercase',
        }}>
          AS Creation Space
        </div>
        <div style={{ display: 'flex', gap: '32px' }}>
          {['Home', 'About', 'Work'].map(link => (
            <button
              key={link}
              onClick={() => link === 'About' && document.getElementById('biography')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: '12px',
                letterSpacing: '3px',
                color: 'rgba(96,165,250,0.5)',
                textTransform: 'uppercase',
                background: 'none',
                border: 'none',
                transition: 'color 0.3s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(147,197,253,0.9)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(96,165,250,0.5)')}
            >
              {link}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ButterflyDecor({ size, opacity }: { size: number; opacity: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      style={{ opacity }}
    >
      <ellipse cx="30" cy="28" rx="22" ry="14"
        fill="rgba(59, 130, 246, 0.5)"
        stroke="rgba(147, 197, 253, 0.8)" strokeWidth="1"
        style={{ animation: 'wingFlap 0.3s ease-in-out infinite alternate', transformOrigin: '40px 40px' }}
      />
      <ellipse cx="50" cy="28" rx="22" ry="14"
        fill="rgba(59, 130, 246, 0.5)"
        stroke="rgba(147, 197, 253, 0.8)" strokeWidth="1"
        style={{ animation: 'wingFlap 0.3s ease-in-out infinite alternate-reverse', transformOrigin: '40px 40px' }}
      />
      <ellipse cx="28" cy="48" rx="16" ry="10"
        fill="rgba(37, 99, 235, 0.4)"
        stroke="rgba(147, 197, 253, 0.6)" strokeWidth="1"
        style={{ animation: 'wingFlap 0.3s ease-in-out infinite alternate', transformOrigin: '40px 40px' }}
      />
      <ellipse cx="52" cy="48" rx="16" ry="10"
        fill="rgba(37, 99, 235, 0.4)"
        stroke="rgba(147, 197, 253, 0.6)" strokeWidth="1"
        style={{ animation: 'wingFlap 0.3s ease-in-out infinite alternate-reverse', transformOrigin: '40px 40px' }}
      />
      <ellipse cx="40" cy="40" rx="3" ry="12" fill="rgba(219, 234, 254, 0.8)" />
      <line x1="38" y1="28" x2="32" y2="18" stroke="rgba(191, 219, 254, 0.7)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="42" y1="28" x2="48" y2="18" stroke="rgba(191, 219, 254, 0.7)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="32" cy="18" r="2" fill="rgba(191, 219, 254, 0.8)" />
      <circle cx="48" cy="18" r="2" fill="rgba(191, 219, 254, 0.8)" />
    </svg>
  );
}
