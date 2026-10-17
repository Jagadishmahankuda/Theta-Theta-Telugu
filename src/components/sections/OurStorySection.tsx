import React from 'react';
import { defaultStorySteps, accentThemes } from '../../data/ourStoryData.js';
import { StoryStep, OurStorySectionProps } from '../../types/ourStory.js';

/**
 * PinIcon Component: Renders a decorative pushpin atop each card
 */
export const PinIcon: React.FC<{ accent: keyof typeof accentThemes }> = ({ accent }) => {
  const theme = accentThemes[accent] || accentThemes.burgundy;
  return (
    <div className="card-pin" aria-hidden="true">
      <div 
        className="pin-head" 
        style={{ backgroundColor: theme.primary }} 
      />
    </div>
  );
};

/**
 * ProcessCard Component: Renders a single milestone card with paper-board styling
 */
export const ProcessCard: React.FC<{
  step: StoryStep;
  index: number;
}> = ({ step, index }) => {
  const rotation = step.rotation || 0;

  return (
    <div 
      className={`story-card-wrapper card-pos-${index} accent-${step.accent}`}
      style={{ transform: `rotate(${rotation}deg)` }}
      id={`story-${step.id}`}
    >
      <PinIcon accent={step.accent} />
      <article className="story-card">
        <div className="story-panel">
          <span className="milestone-badge">{step.stepNumber}</span>
          <h3 className="story-card-title">{step.title}</h3>
          <p className="story-card-desc">{step.description}</p>
        </div>
      </article>
    </div>
  );
};

/**
 * OurStorySection (ProcessBoard) Component
 * Renders the full 5-milestone timeline on ruled paper background
 */
export const OurStorySection: React.FC<OurStorySectionProps> = ({
  steps = defaultStorySteps,
  className = '',
  eyebrow = 'OUR STORY',
  headingLine1 = 'Telugu at Heart.',
  headingLine2 = 'Reimagined for Today.',
  description = 'Five moments that celebrate our roots, our recognition, and the traditions that continue to inspire every plate.',
  quote = 'A cuisine with a story worth sharing.'
}) => {
  const visibleSteps = steps.slice(0, 5);

  return (
    <section className={`our-story-section ${className}`} id="story" aria-label="Our Story">
      <div className="story-container">
        
        {/* Header Eyebrow & Main Heading */}
        <div className="story-header-group">
          <span className="story-eyebrow">{eyebrow}</span>

          <div className="story-heading-divider" aria-hidden="true">
            <img 
              src="assets/theta-theta-telugu/decorative/menu-heading-divider.svg" 
              alt="" 
              className="story-divider-svg" 
            />
          </div>

          <h2 className="story-main-heading">
            <span className="story-heading-line1">{headingLine1}</span>
            <span className="story-heading-line2">{headingLine2}</span>
          </h2>

          <p className="story-intro-desc">{description}</p>
        </div>

        {/* Process Board Canvas with Cards & Connecting Route */}
        <div className="story-board-canvas" role="region" aria-label="Milestones timeline">
          {/* Animated Dashed SVG Route connecting milestones */}
          <svg 
            className="story-timeline-svg" 
            viewBox="0 0 920 1200" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              className="story-route-path"
              d="M 195 140 
                 C 460 140, 460 360, 725 360 
                 C 460 360, 460 590, 195 590 
                 C 460 590, 460 820, 725 820 
                 C 460 820, 460 1050, 195 1050"
            />
          </svg>

          {/* 5 Milestone Story Cards */}
          {visibleSteps.map((step, idx) => (
            <ProcessCard key={step.id} step={step} index={idx} />
          ))}
        </div>

        {/* Closing Quotation */}
        <div className="story-closing-quote">
          <div className="quote-ornament" aria-hidden="true">
            <div className="quote-rule" />
            <div className="quote-dot" />
            <div className="quote-rule" />
          </div>
          <blockquote className="quote-text">
            “{quote}”
          </blockquote>
        </div>

      </div>
    </section>
  );
};

export default OurStorySection;
export { OurStorySection as ProcessBoard };
