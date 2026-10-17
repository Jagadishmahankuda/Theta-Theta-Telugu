/**
 * Theta Theta Telugu — Gallery Section (OrbitCoverflow) Component
 * 
 * Interactive 3D Coverflow presentation mapping the 6 local restaurant photographs
 * with cinematic auto-swiping carousel, responsive scaling, and accessible controls.
 */

import { galleryItems } from '../data/galleryData.js';

export class GallerySection {
  constructor(containerId = 'galleryContainer', options = {}) {
    this.containerId = containerId;
    this.items = options.items || galleryItems;
    this.eyebrow = options.eyebrow || 'OUR GALLERY';
    this.headingPrefix = options.headingPrefix || 'A Glimpse of';
    this.headingHighlight = options.headingHighlight || 'Telugu.';
    this.description = options.description || 'A closer look at the flavours, details, and experiences that bring Telugu cuisine to life.';
    this.activeIndex = 0;
    this.container = null;
    this.touchStartX = null;
    this.touchStartY = null;

    // Autoplay configuration (3.5s interval, 700ms smooth transition)
    this.autoplayInterval = options.autoplayInterval || 3500;
    this.autoplayTimer = null;
    this.isPaused = false;
    this.isInteracting = false;
    this.motionQuery = null;
    this.handleMotionChange = null;
  }

  init() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) return;

    this.render();
    this.updateCardTransforms();
    this.attachEvents();
    this.startAutoplay();
  }

  /**
   * Generates initial HTML structure
   */
  render() {
    this.container.innerHTML = `
      <div class="gallery-container">
        
        <!-- Header Eyebrow & Main Heading -->
        <div class="gallery-header-group">
          <span class="gallery-eyebrow">${this.eyebrow}</span>

          <div class="gallery-heading-divider" aria-hidden="true">
            <img src="assets/theta-theta-telugu/decorative/menu-heading-divider.svg" 
                 alt="" 
                 class="gallery-divider-svg" />
          </div>

          <h2 class="gallery-main-heading">
            <span class="heading-olive">${this.headingPrefix} </span>
            <span class="heading-burgundy">${this.headingHighlight}</span>
          </h2>

          <p class="gallery-intro-desc">${this.description}</p>
        </div>

        <!-- 3D Orbit Coverflow Stage -->
        <div class="gallery-coverflow-wrap" id="galleryStageWrap" role="region" aria-label="3D Restaurant Photo Gallery">
          <div class="gallery-coverflow-stage" id="galleryStage">
            ${this.items.map((item, idx) => `
              <div class="gallery-card" 
                   data-index="${idx}" 
                   id="gal-card-${idx}"
                   tabindex="0"
                   role="group"
                   aria-label="${item.category}: ${item.title}">
                <img src="${item.image}" 
                     alt="${item.alt}" 
                     class="gallery-card-img" 
                     loading="${idx <= 2 ? 'eager' : 'lazy'}"
                     onerror="if (!this.dataset.tried) { this.dataset.tried = '1'; this.src = '${item.fallbackImage || 'assets/' + (idx + 1) + '.png'}'; }" />
                <div class="gallery-card-overlay">
                  <span class="gallery-card-badge">${item.category}</span>
                  <h3 class="gallery-card-title">${item.title}</h3>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Controls: Prev, Next & Indicators -->
        <div class="gallery-controls-row">
          <button type="button" class="gallery-nav-btn" id="galBtnPrev" aria-label="Previous gallery image">
            <svg viewBox="0 0 24 24">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          <div class="gallery-indicators" role="tablist" aria-label="Gallery slide controls" id="galleryIndicators">
            ${this.items.map((item, idx) => `
              <button type="button" 
                      class="gallery-indicator-dot ${idx === 0 ? 'active' : ''}" 
                      data-index="${idx}"
                      role="tab"
                      aria-selected="${idx === 0 ? 'true' : 'false'}"
                      aria-label="Go to slide ${idx + 1}: ${item.title}"></button>
            `).join('')}
          </div>

          <button type="button" class="gallery-nav-btn" id="galBtnNext" aria-label="Next gallery image">
            <svg viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    `;
  }

  /**
   * Applies mathematical 3D Coverflow transforms to all cards
   */
  updateCardTransforms() {
    const total = this.items.length;
    const cards = this.container.querySelectorAll('.gallery-card');
    const width = window.innerWidth;
    const isSmallMobile = width <= 480;
    const isMobile = width <= 768;
    const isTablet = width <= 1024 && width > 768;

    cards.forEach((card, idx) => {
      let offset = idx - this.activeIndex;
      // Circular wrapping calculation for seamless infinite loop
      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;

      const absOffset = Math.abs(offset);
      card.classList.toggle('is-active', absOffset === 0);

      if (absOffset === 0) {
        // Active Center Card: Visually dominant, centered
        card.style.transform = 'translate(-50%, -50%) translateZ(0) scale(1) rotateY(0deg)';
        card.style.zIndex = '10';
        card.style.opacity = '1';
        card.style.pointerEvents = 'auto';
        card.removeAttribute('aria-hidden');
      } else if (absOffset === 1) {
        // Immediate Neighbors (Left / Right)
        const dir = offset > 0 ? 1 : -1;
        const spacing = isSmallMobile ? Math.min(135, width * 0.32) : (isMobile ? 180 : (isTablet ? 220 : 250));
        const rot = isSmallMobile ? 14 : (isMobile ? 18 : 28);
        const scale = isSmallMobile ? 0.86 : 0.84;
        card.style.transform = `translate(calc(-50% + ${dir * spacing}px), -50%) translateZ(-110px) scale(${scale}) rotateY(${-dir * rot}deg)`;
        card.style.zIndex = '8';
        card.style.opacity = isSmallMobile ? '0.78' : '0.82';
        card.style.pointerEvents = 'auto';
        card.removeAttribute('aria-hidden');
      } else if (absOffset === 2) {
        // Outer Cards
        const dir = offset > 0 ? 1 : -1;
        const spacing = isSmallMobile ? Math.min(210, width * 0.52) : (isMobile ? 310 : (isTablet ? 380 : 430));
        const rot = isSmallMobile ? 22 : (isMobile ? 26 : 38);
        card.style.transform = `translate(calc(-50% + ${dir * spacing}px), -50%) translateZ(-240px) scale(0.68) rotateY(${-dir * rot}deg)`;
        card.style.zIndex = '5';
        card.style.opacity = isSmallMobile ? '0.1' : (isMobile ? '0.2' : '0.45');
        card.style.pointerEvents = 'auto';
        card.removeAttribute('aria-hidden');
      } else {
        // Far hidden cards in 3D orbit
        const dir = offset > 0 ? 1 : -1;
        card.style.transform = `translate(calc(-50% + ${dir * 520}px), -50%) translateZ(-350px) scale(0.5)`;
        card.style.zIndex = '1';
        card.style.opacity = '0';
        card.style.pointerEvents = 'none';
        card.setAttribute('aria-hidden', 'true');
      }
    });

    // Update indicator dots
    const dots = this.container.querySelectorAll('.gallery-indicator-dot');
    dots.forEach((dot, idx) => {
      const isActive = idx === this.activeIndex;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  /**
   * Starts the automatic continuous swiping timer
   */
  startAutoplay() {
    this.stopAutoplay();
    if (this.isPaused || this.isInteracting) return;

    // Respect prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }
    }

    this.autoplayTimer = setInterval(() => {
      if (!this.isPaused && !this.isInteracting) {
        this.next(true);
      }
    }, this.autoplayInterval);
  }

  /**
   * Stops the automatic swiping timer
   */
  stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  /**
   * Pauses autoplay during hover or focus
   */
  pauseAutoplay() {
    this.isPaused = true;
    this.stopAutoplay();
  }

  /**
   * Resumes autoplay after hover or focus leaves
   */
  resumeAutoplay() {
    this.isPaused = false;
    this.startAutoplay();
  }

  /**
   * Resets autoplay interval after manual user action
   */
  restartAutoplayTimer() {
    this.stopAutoplay();
    if (!this.isPaused && !this.isInteracting) {
      this.startAutoplay();
    }
  }

  /**
   * Navigation methods
   */
  next(isFromAutoplay = false) {
    this.activeIndex = (this.activeIndex + 1) % this.items.length;
    this.updateCardTransforms();
    if (!isFromAutoplay) {
      this.restartAutoplayTimer();
    }
  }

  prev() {
    this.activeIndex = (this.activeIndex - 1 + this.items.length) % this.items.length;
    this.updateCardTransforms();
    this.restartAutoplayTimer();
  }

  goTo(index) {
    if (index >= 0 && index < this.items.length) {
      this.activeIndex = index;
      this.updateCardTransforms();
      this.restartAutoplayTimer();
    }
  }

  /**
   * Event listeners for interaction, accessibility, and autoplay control
   */
  attachEvents() {
    const prevBtn = this.container.querySelector('#galBtnPrev');
    const nextBtn = this.container.querySelector('#galBtnNext');
    const stageWrap = this.container.querySelector('#galleryStageWrap');
    const indicatorsWrap = this.container.querySelector('#galleryIndicators');

    if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
    if (nextBtn) nextBtn.addEventListener('click', () => this.next());

    // Pause on hover over carousel stage or controls
    if (stageWrap) {
      stageWrap.addEventListener('mouseenter', () => this.pauseAutoplay());
      stageWrap.addEventListener('mouseleave', () => this.resumeAutoplay());

      // Click on adjacent card to rotate to it
      stageWrap.addEventListener('click', (e) => {
        const card = e.target.closest('.gallery-card');
        if (!card) return;
        const idx = parseInt(card.getAttribute('data-index'), 10);
        if (!isNaN(idx) && idx !== this.activeIndex) {
          this.goTo(idx);
        }
      });

      // Touch swipe gestures with autoplay pause
      stageWrap.addEventListener('touchstart', (e) => {
        this.isInteracting = true;
        this.stopAutoplay();
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
      }, { passive: true });

      stageWrap.addEventListener('touchend', (e) => {
        if (this.touchStartX !== null) {
          const touchEndX = e.changedTouches[0].clientX;
          const diffX = touchEndX - this.touchStartX;
          if (Math.abs(diffX) > 40) {
            if (diffX > 0) this.prev();
            else this.next();
          }
        }
        this.touchStartX = null;
        this.touchStartY = null;
        this.isInteracting = false;
        this.restartAutoplayTimer();
      }, { passive: true });
    }

    // Pause on focus within gallery, resume on blur
    this.container.addEventListener('focusin', () => this.pauseAutoplay());
    this.container.addEventListener('focusout', (e) => {
      if (!this.container.contains(e.relatedTarget)) {
        this.resumeAutoplay();
      }
    });

    // Pause autoplay when browser tab is inactive / hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stopAutoplay();
      } else {
        this.resumeAutoplay();
      }
    });

    // Click indicator dots
    if (indicatorsWrap) {
      indicatorsWrap.addEventListener('click', (e) => {
        const dot = e.target.closest('.gallery-indicator-dot');
        if (!dot) return;
        const idx = parseInt(dot.getAttribute('data-index'), 10);
        if (!isNaN(idx)) this.goTo(idx);
      });
    }

    // Global keyboard arrow controls when gallery section is visible
    window.addEventListener('keydown', (e) => {
      const section = document.getElementById('gallery');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const isVisibleInView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!isVisibleInView) return;

      if (e.key === 'ArrowRight') {
        this.next();
      } else if (e.key === 'ArrowLeft') {
        this.prev();
      }
    });

    // Resize recalculation
    window.addEventListener('resize', () => {
      this.updateCardTransforms();
    });

    // prefers-reduced-motion listener
    if (typeof window !== 'undefined' && window.matchMedia) {
      this.motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.handleMotionChange = (e) => {
        if (e.matches) {
          this.stopAutoplay();
        } else {
          this.resumeAutoplay();
        }
      };
      if (this.motionQuery.addEventListener) {
        this.motionQuery.addEventListener('change', this.handleMotionChange);
      } else if (this.motionQuery.addListener) {
        this.motionQuery.addListener(this.handleMotionChange);
      }
    }
  }

  /**
   * Cleanup method to prevent leaks
   */
  destroy() {
    this.stopAutoplay();
    if (this.motionQuery && this.handleMotionChange) {
      if (this.motionQuery.removeEventListener) {
        this.motionQuery.removeEventListener('change', this.handleMotionChange);
      } else if (this.motionQuery.removeListener) {
        this.motionQuery.removeListener(this.handleMotionChange);
      }
    }
  }
}

export function initGallerySection(containerId = 'galleryContainer', options = {}) {
  const gallery = new GallerySection(containerId, options);
  gallery.init();
  return gallery;
}

if (typeof window !== 'undefined') {
  window.initGallerySection = initGallerySection;
  window.GallerySection = GallerySection;
}
