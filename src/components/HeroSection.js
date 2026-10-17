/**
 * Theta Theta Telugu — Hero Section Component
 * 
 * Manages hero section interactions and dynamic configuration.
 */

export const HeroSectionConfig = {
  foodImage: {
    src: 'assets/bowl.png',
    alt: 'Theta Theta Telugu Signature Artisanal Dish'
  }
};

/**
 * Initializes the Hero Section interactions
 */
export function initHeroSection(customConfig = {}) {
  const config = { ...HeroSectionConfig, ...customConfig };

  // 1. Food Photograph fallback / dynamic configuration
  const foodImgEl = document.getElementById('heroFoodImage');
  if (foodImgEl && config.foodImage?.src) {
    if (foodImgEl.getAttribute('src') !== config.foodImage.src) {
      foodImgEl.src = config.foodImage.src;
    }
    if (config.foodImage.alt) {
      foodImgEl.alt = config.foodImage.alt;
    }
  }

  // 2. Hero Primary CTA (Explore Menu) Smooth Scroll
  const exploreMenuBtn = document.getElementById('heroExploreMenuBtn');
  if (exploreMenuBtn) {
    exploreMenuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const menuSection = document.getElementById('menu');
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

// Auto-initialize when loaded directly in browser scripts
if (typeof window !== 'undefined') {
  window.initHeroSection = initHeroSection;
  window.HeroSectionConfig = HeroSectionConfig;
}
