import { useState } from 'react';

const portfolioItems = [
  {
    id: 'videography',
    title: 'Videography',
    desc: 'Cinematic productions that tell your brand story with breathtaking visuals and compelling narratives.',
    image: '/images/videography.jpg',
    tag: 'Motion',
    color: '#2563eb',
  },
  {
    id: 'photography',
    title: 'Photography',
    desc: 'Stunning editorial and commercial photography that captures emotion, beauty, and brand essence.',
    image: '/images/photography.jpg',
    tag: 'Visual',
    color: '#7c3aed',
  },
  {
    id: 'design',
    title: 'Design',
    desc: 'Bold, modern graphic design solutions — from brand identity to digital assets that stand out.',
    image: '/images/design.jpg',
    tag: 'Creative',
    color: '#0891b2',
  },
  {
    id: 'brochure',
    title: 'Brochure',
    desc: 'Premium printed and digital marketing collateral designed to impress and convert.',
    image: '/images/brochure.jpg',
    tag: 'Print',
    color: '#059669',
  },
];

const contactItems = [
  {
    icon: '📞',
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
    color: '#10b981',
  },
  {
    icon: '💬',
    label: 'WhatsApp',
    value: '+1 (555) 123-4567',
    href: 'https://wa.me/15551234567',
    color: '#25d366',
  },
  {
    icon: '✉️',
    label: 'Email',
    value: 'hello@ascreationspace.com',
    href: 'mailto:hello@ascreationspace.com',
    color: '#3b82f6',
  },
  {
    icon: '📸',
    label: 'Instagram',
    value: '@ascreationspace',
    href: 'https://instagram.com/ascreationspace',
    color: '#e1306c',
  },
  {
    icon: '👥',
    label: 'Facebook',
    value: 'AS Creation Space',
    href: 'https://facebook.com/ascreationspace',
    color: '#1877f2',
  },
  {
    icon: '▶️',
    label: 'YouTube',
    value: 'AS Creation Space',
    href: 'https://youtube.com/@ascreationspace',
    color: '#ff0000',
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    value: 'AS Creation Space',
    href: 'https://linkedin.com/company/ascreationspace',
    color: '#0077b5',
  },
];

export default function ImaginationPage({ onBack }: { onBack: () => void }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Videography', 'Photography', 'Design', 'Brochure'];

  const filtered = activeFilter === 'All'
    ? portfolioItems
    : portfolioItems.filter(p => p.title === activeFilter);

  return (
    <div className="imagination-page min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav style={{
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#6b7280',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'color 0.2s',
              background: 'none',
              border: 'none',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#1e40af')}
            onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Home
          </button>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px', height: '36px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 800,
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '-0.5px',
            }}>
              AS
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827', lineHeight: 1 }}>
                AS IMAGINATION
              </div>
              <div style={{ fontSize: '10px', color: '#9ca3af', letterSpacing: '2px', textTransform: 'uppercase' }}>
                Portfolio
              </div>
            </div>
          </div>

          {/* Nav links */}
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Work', 'About', 'Contact'].map(link => (
              <a
                key={link}
                href={link === 'Contact' ? '#contact' : '#portfolio'}
                style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#1e40af')}
                onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%)',
        padding: '80px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.03) 0%, transparent 40%)',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontSize: '11px', letterSpacing: '5px', textTransform: 'uppercase',
            color: 'rgba(147,197,253,0.8)', marginBottom: '16px',
            fontFamily: 'Inter, sans-serif',
          }}>
            Creative Portfolio
          </div>
          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 800,
            color: '#ffffff',
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '-1px',
            marginBottom: '16px',
            lineHeight: 1,
          }}>
            AS IMAGINATION
          </h1>
          <p style={{
            fontSize: '16px',
            color: 'rgba(219,234,254,0.8)',
            fontFamily: 'Inter, sans-serif',
            maxWidth: '480px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Explore our curated portfolio of visual excellence — from cinematic films to stunning photography and brand design.
          </p>
        </div>
      </div>

      {/* Portfolio section */}
      <section id="portfolio" style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Filter tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '48px',
        }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: '8px 20px',
                borderRadius: '100px',
                fontSize: '13px',
                fontWeight: 600,
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.5px',
                border: '1px solid',
                transition: 'all 0.2s ease',
                background: activeFilter === f ? '#1e40af' : 'transparent',
                color: activeFilter === f ? '#ffffff' : '#6b7280',
                borderColor: activeFilter === f ? '#1e40af' : '#e5e7eb',
              }}
              onMouseEnter={e => {
                if (activeFilter !== f) {
                  (e.currentTarget as HTMLElement).style.borderColor = '#1e40af';
                  (e.currentTarget as HTMLElement).style.color = '#1e40af';
                }
              }}
              onMouseLeave={e => {
                if (activeFilter !== f) {
                  (e.currentTarget as HTMLElement).style.borderColor = '#e5e7eb';
                  (e.currentTarget as HTMLElement).style.color = '#6b7280';
                }
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '28px',
        }}>
          {filtered.map(item => (
            <div
              key={item.id}
              className="portfolio-card"
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)',
                border: '1px solid #f3f4f6',
                overflow: 'hidden',
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', overflow: 'hidden', height: '220px' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.5s ease',
                  }}
                />
                {/* Tag */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: item.color,
                  color: '#fff',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  padding: '4px 10px',
                  borderRadius: '100px',
                  fontFamily: 'Inter, sans-serif',
                  textTransform: 'uppercase',
                }}>
                  {item.tag}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '24px' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#111827',
                  fontFamily: 'Inter, sans-serif',
                  marginBottom: '8px',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '13px',
                  color: '#6b7280',
                  fontFamily: 'Inter, sans-serif',
                  lineHeight: 1.6,
                  marginBottom: '20px',
                }}>
                  {item.desc}
                </p>
                <button
                  className="view-work-btn"
                  style={{
                    background: item.color,
                    color: '#ffffff',
                    border: 'none',
                    padding: '9px 20px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '1px',
                    fontFamily: 'Inter, sans-serif',
                    textTransform: 'uppercase',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  View Work
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Footer */}
      <footer id="contact" style={{
        background: '#111827',
        padding: '80px 24px 40px',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 800,
              color: '#ffffff',
              fontFamily: 'Inter, sans-serif',
              marginBottom: '12px',
            }}>
              Let's Work Together
            </h2>
            <p style={{
              fontSize: '15px',
              color: '#9ca3af',
              fontFamily: 'Inter, sans-serif',
              maxWidth: '400px',
              margin: '0 auto',
            }}>
              Ready to bring your vision to life? Get in touch and let's create something extraordinary.
            </p>
          </div>

          {/* Contact grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '60px',
          }}>
            {contactItems.map(item => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '24px 16px',
                  background: '#1f2937',
                  borderRadius: '12px',
                  border: '1px solid #374151',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                  gap: '8px',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = '#1f2937';
                  el.style.borderColor = item.color;
                  el.style.transform = 'translateY(-6px)';
                  el.style.boxShadow = `0 8px 24px ${item.color}30`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = '#1f2937';
                  el.style.borderColor = '#374151';
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '44px', height: '44px',
                  borderRadius: '10px',
                  background: `${item.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  border: `1px solid ${item.color}30`,
                }}>
                  {item.icon}
                </div>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: item.color,
                  fontFamily: 'Inter, sans-serif',
                }}>
                  {item.label}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: '#6b7280',
                  fontFamily: 'Inter, sans-serif',
                  wordBreak: 'break-all',
                }}>
                  {item.value}
                </div>
              </a>
            ))}
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: '1px solid #1f2937',
            paddingTop: '32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <div style={{
                width: '32px', height: '32px',
                borderRadius: '6px',
                background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 800,
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
              }}>
                AS
              </div>
              <span style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#9ca3af',
                fontFamily: 'Inter, sans-serif',
              }}>
                AS Creation Space
              </span>
            </div>
            <p style={{
              fontSize: '12px',
              color: '#4b5563',
              fontFamily: 'Inter, sans-serif',
            }}>
              © {new Date().getFullYear()} AS Creation Space. All rights reserved. Crafted with passion.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
