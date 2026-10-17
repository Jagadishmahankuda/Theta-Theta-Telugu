/**
 * Theta Theta Telugu — Header Component
 * Handles header interactions, smooth scrolling, active state tracking,
 * browser history sync, and accessible mobile menu.
 */

export function initHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  const navLinks = header.querySelectorAll('.header-nav-link, .mobile-nav-link');
  const menuToggle = header.querySelector('.header-menu-toggle');
  const mobileDrawer = header.querySelector('.header-mobile-drawer');
  const reserveBtns = header.querySelectorAll('.header-reserve-btn');

  // Tracked section IDs
  const sectionIds = ['hero', 'menu', 'story', 'gallery'];

  /**
   * Sets the active navigation link across desktop and mobile
   * @param {string} activeId Target section ID without hash
   */
  function setActiveLink(activeId) {
    navLinks.forEach((link) => {
      const target = link.getAttribute('data-section') || link.getAttribute('href')?.replace('#', '');
      const isMatch = target === activeId;
      link.classList.toggle('active', isMatch);
      if (link.hasAttribute('aria-current')) {
        if (isMatch) {
          link.setAttribute('aria-current', 'page');
        } else {
          link.removeAttribute('aria-current');
        }
      }
    });
  }

  /**
   * Smoothly scrolls to section and updates URL without page reload
   * @param {string} targetId Section element ID
   */
  function navigateToSection(targetId) {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    // Smooth scroll
    targetElement.scrollIntoView({ behavior: 'smooth' });

    // Update active visual state immediately
    setActiveLink(targetId);

    // Update URL hash without harsh instant jump
    if (window.history && window.history.pushState) {
      window.history.pushState(null, '', '#' + targetId);
    } else {
      window.location.hash = targetId;
    }

    // Close mobile drawer if open
    closeMobileMenu();
  }

  // Bind click handlers to navigation links
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-section') || link.getAttribute('href')?.replace('#', '');
      if (targetId) {
        navigateToSection(targetId);
      }
    });
  });

  // Mobile menu toggle logic
  function toggleMobileMenu() {
    if (!mobileDrawer || !menuToggle) return;
    const isOpen = mobileDrawer.classList.contains('is-open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function openMobileMenu() {
    if (!mobileDrawer || !menuToggle) return;
    mobileDrawer.classList.add('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    menuToggle.classList.add('is-active');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close Navigation Menu');
  }

  function closeMobileMenu() {
    if (!mobileDrawer || !menuToggle) return;
    mobileDrawer.classList.remove('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    menuToggle.classList.remove('is-active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open Navigation Menu');
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  // Close mobile menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer?.classList.contains('is-open')) {
      closeMobileMenu();
      menuToggle?.focus();
    }
  });

  // Close mobile menu on click outside
  document.addEventListener('click', (e) => {
    if (mobileDrawer?.classList.contains('is-open')) {
      if (!header.contains(e.target)) {
        closeMobileMenu();
      }
    }
  });

  // Reserve a Table Button interaction
  reserveBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      // Check if existing reservation destination exists
      const targetHref = btn.getAttribute('href');
      if (targetHref === '#reserve') {
        e.preventDefault();
        // Since no reservation section exists yet in the codebase,
        // dispatch custom event and gracefully notify or scroll to contact/story
        const reserveEvent = new CustomEvent('theta:reserveClick', {
          bubbles: true,
          detail: { source: 'header' }
        });
        btn.dispatchEvent(reserveEvent);

        const storySection = document.getElementById('story');
        if (storySection) {
          storySection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // IntersectionObserver for scroll-based active navigation update
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.id;
          setActiveLink(currentId);
        }
      });
    }, observerOptions);

    sectionElements.forEach((el) => observer.observe(el));
  }

  // Handle URL hash on initial page load
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash && sectionIds.includes(initialHash)) {
    setActiveLink(initialHash);
  } else {
    setActiveLink('hero');
  }

  // Handle browser back/forward buttons (popstate)
  window.addEventListener('popstate', () => {
    const currentHash = window.location.hash.replace('#', '');
    if (currentHash && sectionIds.includes(currentHash)) {
      setActiveLink(currentHash);
    } else {
      setActiveLink('hero');
    }
  });
}

// Auto-initialize when loaded
if (typeof window !== 'undefined') {
  window.initHeader = initHeader;
}
