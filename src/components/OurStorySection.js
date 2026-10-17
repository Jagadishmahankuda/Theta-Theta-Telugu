/**
 * Theta Theta Telugu — Our Story Section Component
 * 
 * Renders the 5-milestone paper-board timeline connecting our roots,
 * accolades, and culinary journey with an animated SVG route.
 */

import { defaultStorySteps, accentThemes } from '../data/ourStoryData.js';

export class OurStorySection {
  constructor(containerId = 'storyContainer', options = {}) {
    this.containerId = containerId;
    this.steps = options.steps || defaultStorySteps;
    this.eyebrow = options.eyebrow || 'OUR STORY';
    this.headingLine1 = options.headingLine1 || 'Telugu at Heart.';
    this.headingLine2 = options.headingLine2 || 'Reimagined for Today.';
    this.description = options.description || 'Five moments that celebrate our roots, our recognition, and the traditions that continue to inspire every plate.';
    this.quote = options.quote || 'A cuisine with a story worth sharing.';
    this.container = null;
  }

  /**
   * Generates HTML markup for a single milestone card
   */
  createCardMarkup(step, index) {
    const rotation = step.rotation || 0;
    const theme = accentThemes[step.accent] || accentThemes.burgundy;

    return `
      <div class="story-card-wrapper card-pos-${index} accent-${step.accent}" 
           data-index="${index}"
           style="transform: rotate(${rotation}deg);" 
           id="story-${step.id}">
        <!-- Pushpin Icon -->
        <div class="card-pin" aria-hidden="true">
          <div class="pin-head" style="background-color: ${theme.primary};"></div>
        </div>
        <!-- Card Body -->
        <article class="story-card">
          <div class="story-panel">
            <span class="milestone-badge">${step.stepNumber}</span>
            <h3 class="story-card-title">${step.title}</h3>
            <p class="story-card-desc">${step.description}</p>
          </div>
        </article>
      </div>
    `;
  }

  /**
   * Smoothly reveals milestone cards with staggered fade-up when scrolled into view
   */
  observeCards() {
    if (!this.container || typeof window === 'undefined') return;

    const cards = this.container.querySelectorAll('.story-card-wrapper');
    if (!cards.length) return;

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      cards.forEach(card => card.classList.add('is-revealed'));
      return;
    }

    if (!('IntersectionObserver' in window)) {
      cards.forEach(card => card.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const index = parseInt(card.getAttribute('data-index') || '0', 10);
          setTimeout(() => {
            card.classList.add('is-revealed');
          }, index * 120);
          obs.unobserve(card);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.15
    });

    cards.forEach(card => observer.observe(card));
  }

  /**
   * Initializes and renders the component into the target DOM element
   */
  init() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) return;

    const visibleSteps = this.steps.slice(0, 5);

    this.container.innerHTML = `
      <div class="story-container">
        
        <!-- Header Eyebrow & Main Heading -->
        <div class="story-header-group">
          <span class="story-eyebrow">${this.eyebrow}</span>

          <div class="story-heading-divider" aria-hidden="true">
            <img src="assets/theta-theta-telugu/decorative/menu-heading-divider.svg" 
                 alt="" 
                 class="story-divider-svg" />
          </div>

          <h2 class="story-main-heading">
            <span class="story-heading-line1">${this.headingLine1}</span>
            <span class="story-heading-line2">${this.headingLine2}</span>
          </h2>

          <p class="story-intro-desc">${this.description}</p>
        </div>

        <!-- Process Board Canvas with Cards & Connecting Route -->
        <div class="story-board-canvas" role="region" aria-label="Milestones timeline">
          <!-- Animated Dashed SVG Route connecting milestones -->
          <svg class="story-timeline-svg" 
               viewBox="0 0 920 1200" 
               fill="none" 
               xmlns="http://www.w3.org/2000/svg"
               aria-hidden="true">
            <path class="story-route-path"
                  d="M 195 140 
                     C 460 140, 460 360, 725 360 
                     C 460 360, 460 590, 195 590 
                     C 460 590, 460 820, 725 820 
                     C 460 820, 460 1050, 195 1050" />
          </svg>

          <!-- 5 Milestone Story Cards -->
          ${visibleSteps.map((step, idx) => this.createCardMarkup(step, idx)).join('')}
        </div>

        <!-- Closing Quotation -->
        <div class="story-closing-quote">
          <div class="quote-ornament" aria-hidden="true">
            <div class="quote-rule"></div>
            <div class="quote-dot"></div>
            <div class="quote-rule"></div>
          </div>
          <blockquote class="quote-text">
            “${this.quote}”
          </blockquote>
        </div>

      </div>
    `;

    this.observeCards();
  }
}

export function initOurStorySection(containerId = 'storyContainer', options = {}) {
  const story = new OurStorySection(containerId, options);
  story.init();
  return story;
}
