/**
 * Theta Theta Telugu — Our Menu Section Component
 * 
 * Renders the menu section with interactive category filtering,
 * accessible tab controls, and semantic food card generation.
 */

import { categories, menuItems } from '../data/menuData.js';

export class OurMenuSection {
  constructor(containerId = 'menuContainer') {
    this.containerId = containerId;
    this.activeCategory = 'starters';
    this.container = null;
  }

  /**
   * Initializes the menu component into the target DOM element
   */
  init() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) return;

    this.render();
    this.attachEvents();
  }

  /**
   * Generates HTML markup for a single menu card.
   * On mobile, cards after the 4th item have the menu-card-mobile-hidden class.
   */
  createCardMarkup(item, index = 0) {
    const isMobileHidden = index >= 4 ? ' menu-card-mobile-hidden' : '';
    const imageSrc = encodeURI(item.image);
    return `
      <article class="menu-card${isMobileHidden}" data-category="${item.category}" id="card-${item.id}" data-index="${index}">
        <div class="menu-card-image-wrap">
          <img src="${imageSrc}" 
               alt="${item.alt || item.name}" 
               class="menu-card-img" 
               loading="lazy" 
               onerror="this.onerror=null; this.src='assets/theta-theta-telugu/food/hero-food.png';" />
        </div>
        <div class="menu-card-content">
          <h3 class="menu-card-title">${item.name}</h3>
          <p class="menu-card-desc">${item.description}</p>
          <div class="menu-card-divider" aria-hidden="true">
            <img src="assets/theta-theta-telugu/decorative/menu-card-divider.svg" alt="" class="menu-card-divider-svg" />
          </div>
          <div class="menu-card-price">₹${item.price}</div>
        </div>
      </article>
    `;
  }

  /**
   * Generates the category filter buttons
   */
  createFilterButtonsMarkup() {
    return categories.map(cat => {
      const isActive = cat.id === this.activeCategory;
      return `
        <button type="button" 
                class="menu-filter-btn ${isActive ? 'active' : ''}" 
                data-category="${cat.id}"
                role="tab"
                aria-selected="${isActive ? 'true' : 'false'}"
                aria-label="${cat.ariaLabel}">
          <span class="filter-icon" aria-hidden="true">
            <img src="${cat.icon}" alt="" class="filter-icon-img" />
          </span>
          <span class="filter-label">${cat.label}</span>
        </button>
      `;
    }).join('');
  }

  /**
   * Renders the complete menu section structure
   */
  render() {
    if (!this.container) return;

    const filteredItems = menuItems.filter(item => item.category === this.activeCategory);

    this.container.innerHTML = `
      <div class="menu-inner-container">
        <!-- Section Eyebrow, Ornamental Divider, and Heading -->
        <div class="menu-header-group">
          <span class="menu-eyebrow">OUR MENU</span>
          
          <div class="menu-heading-divider" aria-hidden="true">
            <img src="assets/theta-theta-telugu/decorative/menu-heading-divider.svg" alt="" class="heading-divider-svg" />
          </div>

          <h2 class="menu-main-heading">
            <span class="heading-olive">A Taste of</span>
            <span class="heading-terracotta">Telugu Tradition.</span>
          </h2>

          <p class="menu-intro-desc">
            From beloved classics to bold new creations, every dish brings the rich flavours of Telugu cuisine to your table.
          </p>
        </div>

        <!-- Category Filters -->
        <div class="menu-filter-row" role="tablist" aria-label="Menu Categories">
          ${this.createFilterButtonsMarkup()}
        </div>

        <!-- Food Cards Grid -->
        <div class="menu-grid" id="menuGrid" role="tabpanel" aria-label="Menu Items">
          ${filteredItems.map((item, idx) => this.createCardMarkup(item, idx)).join('')}
        </div>
      </div>
    `;
  }

  /**
   * Attaches category filter event listeners
   */
  attachEvents() {
    if (!this.container) return;

    this.container.addEventListener('click', (e) => {
      const btn = e.target.closest('.menu-filter-btn');
      if (!btn) return;

      const category = btn.getAttribute('data-category');
      if (category && category !== this.activeCategory) {
        this.setCategory(category);
      }
    });

    // Keyboard navigation for accessible tabs (Arrow keys)
    this.container.addEventListener('keydown', (e) => {
      const btn = e.target.closest('.menu-filter-btn');
      if (!btn) return;

      const buttons = Array.from(this.container.querySelectorAll('.menu-filter-btn'));
      const index = buttons.indexOf(btn);

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (index + 1) % buttons.length;
        buttons[nextIndex].focus();
        buttons[nextIndex].click();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (index - 1 + buttons.length) % buttons.length;
        buttons[prevIndex].focus();
        buttons[prevIndex].click();
      }
    });
  }

  /**
   * Switches the active category and animates grid update
   */
  setCategory(category) {
    this.activeCategory = category;

    // Update filter buttons visual & semantic state
    const buttons = this.container.querySelectorAll('.menu-filter-btn');
    buttons.forEach(btn => {
      const isTarget = btn.getAttribute('data-category') === category;
      btn.classList.toggle('active', isTarget);
      btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    });

    // Animate and re-render grid
    const grid = this.container.querySelector('#menuGrid');
    if (grid) {
      grid.classList.add('grid-transitioning');
      setTimeout(() => {
        const filteredItems = menuItems.filter(item => item.category === category);
        grid.innerHTML = filteredItems.map((item, idx) => this.createCardMarkup(item, idx)).join('');
        grid.classList.remove('grid-transitioning');
      }, 160);
    }
  }
}

export function initOurMenuSection(containerId = 'menuContainer') {
  const menu = new OurMenuSection(containerId);
  menu.init();
  return menu;
}
