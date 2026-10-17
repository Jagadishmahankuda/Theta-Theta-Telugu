import React, { useState, useEffect, useRef, useCallback } from 'react';
import { galleryItems, GalleryItem } from '../../data/galleryData.js';

export interface GallerySectionProps {
  items?: GalleryItem[];
  className?: string;
  eyebrow?: string;
  headingPrefix?: string;
  headingHighlight?: string;
  description?: string;
  autoplayInterval?: number;
}

/**
 * GallerySection (OrbitCoverflow) Component
 * Renders an interactive 3D Coverflow gallery showcasing the restaurant
 * with cinematic auto-swiping carousel, responsive scaling, and accessible controls.
 */
export const GallerySection: React.FC<GallerySectionProps> = ({
  items = galleryItems,
  className = '',
  eyebrow = 'OUR GALLERY',
  headingPrefix = 'A Glimpse of',
  headingHighlight = 'Telugu.',
  description = 'A closer look at the flavours, details, and experiences that bring Telugu cuisine to life.',
  autoplayInterval = 3500
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const isInteracting = useRef(false);

  const total = items.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (idx: number) => {
    setActiveIndex(idx);
  };

  // Continuous Autoplay with Hover/Focus/Touch Pause & Reduced Motion Support
  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;
    }

    if (isPaused) return;

    const intervalId = setInterval(() => {
      if (!isInteracting.current) {
        nextSlide();
      }
    }, autoplayInterval);

    return () => clearInterval(intervalId);
  }, [isPaused, autoplayInterval, nextSlide, activeIndex]);

  // Pause autoplay when document is in background
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPaused(document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch swipe support with interaction pause
  const handleTouchStart = (e: React.TouchEvent) => {
    isInteracting.current = true;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchEndX - touchStartX.current;
      if (Math.abs(diff) > 40) {
        if (diff > 0) prevSlide();
        else nextSlide();
      }
    }
    touchStartX.current = null;
    isInteracting.current = false;
  };

  // Compute 3D Coverflow transform styles
  const getCardStyle = (index: number) => {
    let offset = index - activeIndex;
    // Circular shortest distance for infinite looping
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    const absOffset = Math.abs(offset);

    if (absOffset === 0) {
      return {
        transform: 'translate(-50%, -50%) translateZ(0) scale(1) rotateY(0deg)',
        zIndex: 10,
        opacity: 1,
        pointerEvents: 'auto' as const
      };
    } else if (absOffset === 1) {
      const dir = offset > 0 ? 1 : -1;
      return {
        transform: `translate(calc(-50% + ${dir * 240}px), -50%) translateZ(-120px) scale(0.84) rotateY(${-dir * 26}deg)`,
        zIndex: 8,
        opacity: 0.82,
        pointerEvents: 'auto' as const
      };
    } else if (absOffset === 2) {
      const dir = offset > 0 ? 1 : -1;
      return {
        transform: `translate(calc(-50% + ${dir * 420}px), -50%) translateZ(-240px) scale(0.68) rotateY(${-dir * 38}deg)`,
        zIndex: 5,
        opacity: 0.45,
        pointerEvents: 'auto' as const
      };
    } else {
      const dir = offset > 0 ? 1 : -1;
      return {
        transform: `translate(calc(-50% + ${dir * 520}px), -50%) translateZ(-350px) scale(0.5)`,
        zIndex: 1,
        opacity: 0,
        pointerEvents: 'none' as const
      };
    }
  };

  return (
    <section 
      className={`gallery-section ${className}`} 
      id="gallery" 
      aria-label="Restaurant Gallery"
      ref={containerRef}
      tabIndex={0}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(e) => {
        if (!containerRef.current?.contains(e.relatedTarget as Node)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="gallery-container">
        
        {/* Header Eyebrow & Main Heading */}
        <div className="gallery-header-group">
          <span className="gallery-eyebrow">{eyebrow}</span>

          <div className="gallery-heading-divider" aria-hidden="true">
            <img 
              src="assets/theta-theta-telugu/decorative/menu-heading-divider.svg" 
              alt="" 
              className="gallery-divider-svg" 
            />
          </div>

          <h2 className="gallery-main-heading">
            <span className="heading-olive">{headingPrefix} </span>
            <span className="heading-burgundy">{headingHighlight}</span>
          </h2>

          <p className="gallery-intro-desc">{description}</p>
        </div>

        {/* 3D Orbit Coverflow Carousel */}
        <div 
          className="gallery-coverflow-wrap"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="region"
          aria-label="3D Restaurant Photo Gallery"
        >
          <div className="gallery-coverflow-stage">
            {items.map((item, idx) => {
              const isActive = idx === activeIndex;
              const cardStyle = getCardStyle(idx);

              return (
                <div
                  key={item.id}
                  className={`gallery-card ${isActive ? 'is-active' : ''}`}
                  style={cardStyle}
                  onClick={() => !isActive && goToSlide(idx)}
                  role="group"
                  aria-label={`${item.category}: ${item.title}`}
                  aria-roledescription="slide"
                  aria-hidden={Math.abs(idx - activeIndex) > 2 ? 'true' : 'false'}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="gallery-card-img"
                    loading={idx <= 2 ? 'eager' : 'lazy'}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.tried) {
                        target.dataset.tried = '1';
                        target.src = item.fallbackImage || `assets/${idx + 1}.png`;
                      }
                    }}
                  />
                  <div className="gallery-card-overlay">
                    <span className="gallery-card-badge">{item.category}</span>
                    <h3 className="gallery-card-title">{item.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls: Prev, Next & Indicators */}
        <div className="gallery-controls-row">
          <button 
            type="button" 
            className="gallery-nav-btn" 
            onClick={prevSlide}
            aria-label="Previous gallery image"
          >
            <svg viewBox="0 0 24 24">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="gallery-indicators" role="tablist" aria-label="Gallery slide controls">
            {items.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                className={`gallery-indicator-dot ${idx === activeIndex ? 'active' : ''}`}
                onClick={() => goToSlide(idx)}
                role="tab"
                aria-selected={idx === activeIndex}
                aria-label={`Go to slide ${idx + 1}: ${item.title}`}
              />
            ))}
          </div>

          <button 
            type="button" 
            className="gallery-nav-btn" 
            onClick={nextSlide}
            aria-label="Next gallery image"
          >
            <svg viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
};

export default GallerySection;
export { GallerySection as OrbitCoverflow };
