import { useState, useEffect } from 'react';
import ButterflyCursor from './components/ButterflyyCursor';
import HeroSection from './components/HeroSection';
import BiographySection from './components/BiographySection';
import ImaginationPage from './components/ImaginationPage';

type Page = 'home' | 'imagination';

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(onComplete, 600);
          }, 200);
          return 100;
        }
        return prev + Math.random() * 8 + 3;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(135deg, #000510 0%, #000d1f 50%, #001133 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.6s ease',
      }}
    >
      {/* Logo */}
      <div style={{
        fontFamily: "'Cinzel Decorative', cursive",
        fontSize: 'clamp(60px, 12vw, 120px)',
        fontWeight: 900,
        background: 'linear-gradient(135deg, #ffffff 0%, #93c5fd 40%, #3b82f6 100%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        filter: 'drop-shadow(0 0 30px rgba(59,130,246,0.8))',
        marginBottom: '8px',
        animation: 'textGlow 2s ease-in-out infinite',
      }}>
        AS
      </div>
      <div style={{
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: 'clamp(10px, 2vw, 16px)',
        letterSpacing: 'clamp(6px, 1.5vw, 14px)',
        color: 'rgba(147,197,253,0.8)',
        textTransform: 'uppercase',
        marginBottom: '48px',
      }}>
        CREATION SPACE
      </div>

      {/* Progress bar */}
      <div style={{
        width: '200px',
        height: '1px',
        background: 'rgba(59,130,246,0.2)',
        position: 'relative',
        marginBottom: '16px',
      }}>
        <div style={{
          position: 'absolute',
          left: 0, top: 0,
          height: '100%',
          width: `${Math.min(progress, 100)}%`,
          background: 'linear-gradient(90deg, #2563eb, #60a5fa)',
          boxShadow: '0 0 8px rgba(59,130,246,0.8)',
          transition: 'width 0.1s ease',
        }} />
      </div>
      <div style={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: '10px',
        letterSpacing: '3px',
        color: 'rgba(96,165,250,0.5)',
      }}>
        {Math.min(Math.round(progress), 100)}%
      </div>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [transitioning, setTransitioning] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigateTo = (page: Page) => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTimeout(() => setTransitioning(false), 100);
    }, 450);
  };

  // Disable default cursor on home page
  useEffect(() => {
    if (currentPage === 'home') {
      document.body.style.cursor = 'none';
    } else {
      document.body.style.cursor = 'auto';
    }
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [currentPage]);

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <>
      {/* Butterfly cursor only on home page */}
      {currentPage === 'home' && <ButterflyCursor />}

      {/* Page transition overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'linear-gradient(135deg, #000510, #001133)',
          zIndex: 99990,
          pointerEvents: transitioning ? 'all' : 'none',
          opacity: transitioning ? 1 : 0,
          transition: 'opacity 0.45s ease',
        }}
      >
        {transitioning && (
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}>
            <div style={{
              fontFamily: "'Cinzel Decorative', cursive",
              fontSize: '48px',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #ffffff 0%, #93c5fd 40%, #3b82f6 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 20px rgba(59,130,246,0.8))',
            }}>
              AS
            </div>
          </div>
        )}
      </div>

      {/* Pages */}
      <div
        style={{
          opacity: transitioning ? 0 : 1,
          transition: 'opacity 0.45s ease',
        }}
      >
        {currentPage === 'home' ? (
          <main
            style={{
              background: 'linear-gradient(180deg, #000510 0%, #000d1f 100%)',
              minHeight: '100vh',
            }}
          >
            <HeroSection onGetStarted={() => navigateTo('imagination')} />
            <BiographySection onGetStarted={() => navigateTo('imagination')} />
          </main>
        ) : (
          <ImaginationPage onBack={() => navigateTo('home')} />
        )}
      </div>
    </>
  );
}
