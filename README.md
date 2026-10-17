# Theta Theta Telugu

🌐 **Live Website:** https://thetathetateluguu.netlify.app/

🚀 [Visit Website](https://thetathetateluguu.netlify.app/)

---
# Theta Theta Telugu — Official Restaurant Website

The official website for **Theta Theta Telugu**, a premium Telugu cuisine restaurant.

## Page Structure

1. **Hero Section (`#hero`)**
   - Full-viewport editorial brand statement: `TRULY TELUGU.`
   - Crisp brand logo and Telugu symbol emblem.
   - Restrained top navigation (`Home`, `Our Story`, `Experience`, `Contact`).
   - Deep terracotta `VIEW MENU` pill button with circular arrow badge (smoothly scrolls to `#menu`).
   - Oversized natural ceramic bowl presentation extending through the bottom edge.
   - Handcrafted botanical line art accents in the background.

2. **Our Menu Section (`#menu`)**
   - Directly follows the Hero Section.
   - Eyebrow label: `OUR MENU` with ornamental divider.
   - Editorial serif heading: *A Taste of* **Telugu Tradition.**
   - Supporting narrative description.
   - **Interactive Category Filter**:
     - Starters (default active)
     - Main Course
     - Beverages
     - Dynamic state switching without page reload.
   - **4-Column Responsive Food Grid**:
     - Circular food presentation (`aspect-ratio: 1`, `border-radius: 50%`, `object-fit: cover`).
     - Dedicated culinary photography for each dish.
     - Fallback for missing assets.

3. **Our Story Section (`#story` / ProcessBoard)**
   - Directly follows Our Menu Section.
   - Warm parchment-like paper background (`#F5EBDD`) with subtle horizontal notebook ruled lines.
   - Eyebrow label: `OUR STORY` with fine divider.
   - Two-line editorial heading:
     *Telugu at Heart.*
     *Reimagined for Today.*
   - **5 Milestone Paper-Board Timeline**:
     - Milestone 01 (Burgundy): *Rooted in Telugu Tradition*
     - Milestone 02 (Gold): *A Place Among India's Best* (Condé Nast Traveller Award)
     - Milestone 03 (Terracotta): *Celebrating New Beginnings* (Travel + Leisure Award)
     - Milestone 04 (Burgundy): *Three Stars, One Culinary Story* (Culinary Culture Co.)
     - Milestone 05 (Gold): *Tradition, Served for Tomorrow*
   - Pushpin icon (`PinIcon`) atop every card.
   - Animated dashed gold-brown SVG path weaving between milestones.
   - Alternating left/right card placements with subtle rotational tilts.
   - Closing quotation: *“A cuisine with a story worth sharing.”*

4. **Gallery Section (`#gallery` / OrbitCoverflow)**
   - Directly follows Our Story Section.
   - Eyebrow label: `OUR GALLERY` with fine divider.
   - Editorial heading: **A Glimpse of** *Telugu.*
   - Supporting narrative: *“A closer look at the flavours, details, and experiences that bring Telugu cuisine to life.”*
   - **Interactive 3D Coverflow Presentation**:
     - Prominent active center card with perspective depth and subtle Y-axis rotation.
     - Neighboring cards to the left and right scaled and rotated smoothly in 3D space.
     - Six local restaurant photographs mapped in exact numerical order:
       1. `1.png` — *Grand Entrance & Signboard* (Entrance & Exterior)
       2. `2.png` — *Main Dining Hall & Ambient Murals* (Interior Architecture)
       3. `3.png` — *Lively Evening Gastronomy* (Dining Experience)
       4. `4.png` — *Twilight at Coffee Sangam* (Night Ambiance)
       5. `5.png` — *Illuminated Stone Pathway* (Architectural Elegance)
       6. `6.png` — *Teak & Cane Dining Chamber* (Artisanal Seating)
   - Category pill badges and titles on subtle dark gradients.
   - Keyboard left/right arrow navigation, touch swipe support, and clickable slide indicators.

## File Organization

```text
src/
├── types/
│   └── ourStory.ts
├── data/
│   ├── menuData.js
│   ├── ourStoryData.js
│   ├── ourStoryData.ts
│   ├── galleryData.js
│   └── galleryData.ts
└── components/
    ├── HeroSection.js
    ├── OurMenuSection.js
    ├── OurStorySection.js
    ├── GallerySection.js
    └── sections/
        ├── OurStorySection.tsx
        └── GallerySection.tsx

styles/
├── hero-section.css
├── our-menu.css
├── our-story.css
└── gallery-section.css

assets/
└── theta-theta-telugu/
    ├── logo/
    ├── food/
    ├── menu/
    ├── icons/
    ├── botanical/
    ├── decorative/
    └── gallery/
        ├── 1.png
        ├── 2.png
        ├── 3.png
        ├── 4.png
        ├── 5.png
        └── 6.png

index.html
server.js
README.md
```

## Running Locally

To run the web application:
```bash
node server.js
```
Then visit: `http://localhost:3000` (or `http://127.0.0.1:3000`).
Alternatively, open `index.html` directly in your browser.
