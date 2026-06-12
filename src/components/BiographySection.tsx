import { useEffect, useRef, useState } from 'react';

const features = [
  {
    icon: '🎯',
    title: 'Creative Direction',
    desc: 'Visionary leadership for brand narratives',
  },
  {
    icon: '🎬',
    title: 'Visual Storytelling',
    desc: 'Cinematic imagery that captivates audiences',
  },
  {
    icon: '📊',
    title: 'Brand Strategy',
    desc: 'Data-driven creative intelligence',
  },
  {
    icon: '✨',
    title: 'Motion Design',
    desc: 'Dynamic animations that breathe life into brands',
  },
  {
    icon: '🏆',
    title: 'Client Satisfaction',
    desc: '100% commitment to excellence',
  },
];

export default function BiographySection({ onGetStarted }: { onGetStarted: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="biography"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #000820 0%, #000d1f 40%, #000510 100%)',
      }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <div style={{
          position: 'absolute', width: '800px', height: '800px',
          borderRadius: '50%', right: '-200px', top: '-200px',
          background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', width: '600px', height: '600px',
          borderRadius: '50%', left: '-100px', bottom: '-100px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(59,130,246,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.025) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto" style={{ zIndex: 1 }}>
        {/* Section header */}
        <div
          className="text-center mb-20"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease',
          }}
        >
          <div style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: '11px',
            letterSpacing: '6px',
            color: 'rgba(96,165,250,0.6)',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}>
            — Meet the Creator —
          </div>
          <div style={{
            width: '60px', height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.8), transparent)',
            margin: '0 auto',
          }} />
        </div>

        {/* Main bio layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left: Portrait */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-50px)',
              transition: 'all 1s ease 0.2s',
            }}
          >
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Orbit ring */}
                <div style={{
                  position: 'absolute', inset: '-30px',
                  border: '1px solid rgba(59,130,246,0.15)',
                  borderRadius: '50%',
                  animation: 'rotateGlow 20s linear infinite',
                }} />
                <div style={{
                  position: 'absolute', inset: '-60px',
                  border: '1px solid rgba(59,130,246,0.08)',
                  borderRadius: '50%',
                  animation: 'rotateGlow 35s linear infinite reverse',
                }} />

                {/* Blob frame with portrait */}
                <div
                  className="blob-frame"
                  style={{
                    width: 'clamp(280px, 40vw, 380px)',
                    height: 'clamp(320px, 45vw, 440px)',
                    position: 'relative',
                  }}
                >
                  <img
                    src="/images/portrait.jpg"
                    alt="AS – Creative Director"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  {/* Overlay gradient */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, transparent 60%, rgba(0,8,32,0.6) 100%)',
                  }} />
                </div>

                {/* Floating badge */}
                <div
                  className="glass-card absolute -bottom-6 -right-4 px-5 py-3 rounded-xl"
                  style={{ boxShadow: '0 0 20px rgba(59,130,246,0.3)' }}
                >
                  <div style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '11px',
                    color: 'rgba(96,165,250,0.9)',
                    letterSpacing: '2px',
                  }}>
                    8+ YEARS
                  </div>
                  <div style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: '13px',
                    color: 'rgba(147,197,253,0.7)',
                    letterSpacing: '1px',
                  }}>
                    of Creative Excellence
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Bio content */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(50px)',
              transition: 'all 1s ease 0.4s',
            }}
          >
            <div style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '12px',
              letterSpacing: '5px',
              color: 'rgba(96,165,250,0.6)',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              About Me
            </div>

            <h2 style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.1,
              marginBottom: '8px',
              background: 'linear-gradient(135deg, #ffffff 0%, #93c5fd 60%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              ARYAN SHARMA
            </h2>

            <div style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '16px',
              letterSpacing: '3px',
              color: 'rgba(96,165,250,0.7)',
              marginBottom: '28px',
              textTransform: 'uppercase',
            }}>
              Founder & Creative Director
            </div>

            <div style={{
              width: '50px', height: '2px',
              background: 'linear-gradient(90deg, rgba(59,130,246,0.8), transparent)',
              marginBottom: '28px',
              boxShadow: '0 0 8px rgba(59,130,246,0.6)',
            }} />

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              lineHeight: 1.8,
              color: 'rgba(148,163,184,0.85)',
              marginBottom: '20px',
            }}>
              Welcome to <span style={{ color: 'rgba(147,197,253,0.9)', fontWeight: 600 }}>AS Creation Space</span> — where imagination transcends boundaries and creativity knows no limits. I'm a passionate visual storyteller dedicated to crafting immersive brand experiences that leave lasting impressions.
            </p>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              lineHeight: 1.8,
              color: 'rgba(148,163,184,0.75)',
              marginBottom: '20px',
            }}>
              My creative vision is rooted in the belief that every brand has an extraordinary story waiting to be told. Through the fusion of cinematography, design, and strategic thinking, I transform visions into compelling visual narratives that connect deeply with audiences.
            </p>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              lineHeight: 1.8,
              color: 'rgba(148,163,184,0.75)',
              marginBottom: '36px',
            }}>
              With over 8 years of experience spanning videography, photography, graphic design, and brand strategy, I've collaborated with leading brands across industries, delivering work that not only looks stunning but drives real results.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { num: '200+', label: 'Projects' },
                { num: '50+', label: 'Brands' },
                { num: '8+', label: 'Years' },
              ].map(stat => (
                <div key={stat.label} className="text-center glass-card rounded-xl py-4">
                  <div style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: 'clamp(20px, 3vw, 32px)',
                    fontWeight: 700,
                    color: 'rgba(96,165,250,0.9)',
                    textShadow: '0 0 15px rgba(59,130,246,0.5)',
                  }}>
                    {stat.num}
                  </div>
                  <div style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: '12px',
                    letterSpacing: '3px',
                    color: 'rgba(148,163,184,0.6)',
                    textTransform: 'uppercase',
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 1s ease 0.6s',
            marginBottom: '60px',
          }}
        >
          <div className="text-center mb-12">
            <div style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '12px',
              letterSpacing: '5px',
              color: 'rgba(96,165,250,0.6)',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}>
              Core Expertise
            </div>
            <div style={{
              width: '40px', height: '1px',
              background: 'rgba(59,130,246,0.6)',
              margin: '0 auto',
            }} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="feature-card rounded-2xl p-6 text-center"
                style={{
                  transitionDelay: `${i * 0.1}s`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s ease ${0.8 + i * 0.1}s`,
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{f.icon}</div>
                <div style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  color: 'rgba(147,197,253,0.9)',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                }}>
                  {f.title}
                </div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  color: 'rgba(148,163,184,0.6)',
                  lineHeight: 1.5,
                }}>
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GET STARTED button */}
        <div
          className="flex flex-col items-center gap-6"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease 1.2s',
          }}
        >
          <div style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: '12px',
            letterSpacing: '4px',
            color: 'rgba(96,165,250,0.5)',
            textTransform: 'uppercase',
            textAlign: 'center',
          }}>
            Ready to create something extraordinary?
          </div>
          <button
            onClick={onGetStarted}
            className="get-started-btn relative group"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 'clamp(14px, 2vw, 18px)',
              fontWeight: 700,
              letterSpacing: 'clamp(4px, 1vw, 8px)',
              color: '#ffffff',
              padding: 'clamp(16px, 2.5vw, 24px) clamp(40px, 6vw, 80px)',
              borderRadius: '100px',
              textTransform: 'uppercase',
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>GET STARTED</span>
            {/* Animated shimmer */}
            <div
              className="absolute inset-0 rounded-full animate-shimmer"
              style={{ borderRadius: '100px' }}
            />
          </button>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div style={{ width: '40px', height: '1px', background: 'rgba(59,130,246,0.3)' }} />
            <span style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '11px',
              letterSpacing: '3px',
              color: 'rgba(96,165,250,0.4)',
              textTransform: 'uppercase',
            }}>
              Explore our portfolio
            </span>
            <div style={{ width: '40px', height: '1px', background: 'rgba(59,130,246,0.3)' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
