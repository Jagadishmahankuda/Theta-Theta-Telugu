import React, { useState } from 'react';
import { categories, menuItems, MenuItem, MenuCategory } from '../../data/menuData.js';

export interface OurMenuSectionProps {
  className?: string;
  eyebrow?: string;
  headingPrefix?: string;
  headingHighlight?: string;
  description?: string;
}

export const OurMenuSection: React.FC<OurMenuSectionProps> = ({
  className = '',
  eyebrow = 'OUR MENU',
  headingPrefix = 'A Taste of',
  headingHighlight = 'Telugu Tradition.',
  description = 'From beloved classics to bold new creations, every dish brings the rich flavours of Telugu cuisine to your table.'
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('starters');

  const filteredItems: MenuItem[] = menuItems.filter((item: MenuItem) => item.category === activeCategory);

  return (
    <section className={`our-menu-section ${className}`} id="menu" aria-label="Our Menu">
      <div className="menu-inner-container">
        {/* Section Header */}
        <div className="menu-header-group">
          <span className="menu-eyebrow">{eyebrow}</span>
          <div className="menu-heading-divider" aria-hidden="true">
            <img 
              src="assets/theta-theta-telugu/decorative/menu-heading-divider.svg" 
              alt="" 
              className="heading-divider-svg" 
            />
          </div>
          <h2 className="menu-main-heading">
            <span className="heading-olive">{headingPrefix} </span>
            <span className="heading-terracotta">{headingHighlight}</span>
          </h2>
          <p className="menu-intro-desc">{description}</p>
        </div>

        {/* Category Filter Tabs */}
        <div className="menu-filter-row" role="tablist" aria-label="Menu Categories">
          {categories.map((cat: MenuCategory) => {
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                type="button"
                className={`menu-filter-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                role="tab"
                aria-selected={isActive}
                aria-label={cat.ariaLabel}
              >
                <span className="filter-icon" aria-hidden="true">
                  <img src={cat.icon} alt="" className="filter-icon-img" />
                </span>
                <span className="filter-label">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Food Cards Grid: Displays all 8 on desktop/tablet, hides cards 5-8 on mobile */}
        <div className="menu-grid" id="menuGrid" role="tabpanel" aria-label="Menu Items">
          {filteredItems.map((item: MenuItem, idx: number) => {
            const isMobileHidden = idx >= 4 ? 'menu-card-mobile-hidden' : '';
            return (
              <article 
                key={item.id} 
                className={`menu-card ${isMobileHidden}`} 
                data-category={item.category}
                id={`card-${item.id}`}
                data-index={idx}
              >
                <div className="menu-card-image-wrap">
                  <img 
                    src={encodeURI(item.image)} 
                    alt={item.alt || item.name} 
                    className="menu-card-img" 
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = 'assets/theta-theta-telugu/food/hero-food.png';
                    }}
                  />
                </div>
                <div className="menu-card-content">
                  <h3 className="menu-card-title">{item.name}</h3>
                  <p className="menu-card-desc">{item.description}</p>
                  <div className="menu-card-divider" aria-hidden="true">
                    <img 
                      src="assets/theta-theta-telugu/decorative/menu-card-divider.svg" 
                      alt="" 
                      className="menu-card-divider-svg" 
                    />
                  </div>
                  <div className="menu-card-price">₹{item.price}</div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurMenuSection;
export { type MenuItem, type MenuCategory };
