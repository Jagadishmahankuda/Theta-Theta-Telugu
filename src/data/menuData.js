/**
 * Theta Theta Telugu — Structured Menu Data Source
 * 
 * 16 Curated Dishes across Starters, Beverages, and Main Course.
 * All image assets mapped from local assets/menu directories.
 */

export const categories = [
  {
    id: 'starters',
    label: 'Starters',
    icon: 'assets/theta-theta-telugu/icons/icon-starters.svg',
    ariaLabel: 'Filter by Starters'
  },
  {
    id: 'main-course',
    label: 'Main Course',
    icon: 'assets/theta-theta-telugu/icons/icon-main-course.svg',
    ariaLabel: 'Filter by Main Course'
  },
  {
    id: 'beverages',
    label: 'Beverages',
    icon: 'assets/theta-theta-telugu/icons/icon-beverages.svg',
    ariaLabel: 'Filter by Beverages'
  }
];

export const menuItems = [
  // --- Starters (8 Items) ---
  {
    id: 'baby-corn-chilli',
    name: 'Baby Corn Chilli',
    category: 'starters',
    description: 'Crisp baby corn tossed with bell peppers, green chillies & fresh herbs',
    price: 340,
    image: 'assets/menu/starters/Baby Corn Chilli.jpg',
    alt: 'Crispy Baby Corn Chilli tossed with bell peppers and green chillies'
  },
  {
    id: 'cheese-corn-balls',
    name: 'Cheese Corn Balls',
    category: 'starters',
    description: 'Golden crispy spheres stuffed with molten cheese and sweet corn',
    price: 360,
    image: 'assets/menu/starters/Cheese Corn Balls.jpg',
    alt: 'Golden crispy cheese corn balls'
  },
  {
    id: 'chicken-65',
    name: 'Chicken 65',
    category: 'starters',
    description: 'Spiced South Indian fried chicken bites with curry leaves & fiery chillies',
    price: 460,
    image: 'assets/menu/starters/Chicken 65.jpg',
    alt: 'Traditional spicy Chicken 65 with curry leaves'
  },
  {
    id: 'paneer-65',
    name: 'Paneer 65',
    category: 'starters',
    description: 'Succulent paneer cubes marinated and fried in regional aromatic spices',
    price: 390,
    image: 'assets/menu/starters/Paneer 65.jpg',
    alt: 'Crispy marinated Paneer 65'
  },
  {
    id: 'prawns-koliwada',
    name: 'Prawns Koliwada',
    category: 'starters',
    description: 'Crispy batter-fried prawns seasoned with carom seeds, ginger & coastal spices',
    price: 580,
    image: 'assets/menu/starters/Prawns Koliwada.jpg',
    alt: 'Crispy coastal Prawns Koliwada served with lemon'
  },
  {
    id: 'veg-momos-steamed',
    name: 'Veg Momos Steamed',
    category: 'starters',
    description: 'Handcrafted delicate steamed dumplings stuffed with finely minced garden vegetables',
    price: 290,
    image: 'assets/menu/starters/Veg Momos Steamed.jpg',
    alt: 'Steamed vegetable momos served with dipping sauce'
  },
  {
    id: 'veg-nuggets',
    name: 'Veg Nuggets',
    category: 'starters',
    description: 'Crunchy golden breaded vegetable fritters infused with fragrant herbs',
    price: 280,
    image: 'assets/menu/starters/Veg Nuggets.jpg',
    alt: 'Crunchy golden vegetable nuggets'
  },
  {
    id: 'veg-spring-roll',
    name: 'Veg Spring Roll',
    category: 'starters',
    description: 'Crispy golden rolls packed with lightly spiced stir-fried vegetables',
    price: 320,
    image: 'assets/menu/starters/Veg Spring Roll.jpg',
    alt: 'Crispy vegetable spring rolls'
  },

  // --- Beverages (4 Items, folder: bevarages) ---
  {
    id: 'apple-juice',
    name: 'Apple Juice',
    category: 'beverages',
    description: 'Freshly pressed crisp orchard apples chilled to sweet perfection',
    price: 180,
    image: 'assets/menu/bevarages/Apple Juice.jpg',
    alt: 'Freshly pressed chilled apple juice in glass'
  },
  {
    id: 'cappuccino-frappe',
    name: 'Cappuccino Frappe',
    category: 'beverages',
    description: 'Blended espresso with chilled whole milk, crushed ice & velvety coffee foam',
    price: 240,
    image: 'assets/menu/bevarages/Cappuccino Frappe.jpg',
    alt: 'Chilled cappuccino frappe topped with coffee cream'
  },
  {
    id: 'espresso',
    name: 'Espresso',
    category: 'beverages',
    description: 'Bold artisanal roast single-shot espresso with rich golden-brown crema',
    price: 150,
    image: 'assets/menu/bevarages/Espresso.jpg',
    alt: 'Rich aromatic dark espresso shot'
  },
  {
    id: 'kiwi-mojito',
    name: 'Kiwi Mojito',
    category: 'beverages',
    description: 'Muddled fresh kiwi, garden mint, zesty lime & sparkling soda over ice',
    price: 220,
    image: 'assets/menu/bevarages/Kiwi Mojito.jpg',
    alt: 'Vibrant sparkling kiwi mojito with fresh mint and lime'
  },

  // --- Main Course (4 Items, folder: main course) ---
  {
    id: 'butter-chicken',
    name: 'Butter Chicken',
    category: 'main-course',
    description: 'Tender chicken slow-cooked in a rich, buttery tomato and cashew gravy',
    price: 540,
    image: 'assets/menu/main course/Butter Chicken.jpg',
    alt: 'Creamy slow-cooked butter chicken garnished with butter and coriander'
  },
  {
    id: 'dal-makhani',
    name: 'Dal Makhani',
    category: 'main-course',
    description: 'Whole black lentils and kidney beans slow-simmered overnight with dairy butter',
    price: 420,
    image: 'assets/menu/main course/Dal Makhani.jpg',
    alt: 'Slow-simmered creamy dal makhani with cream swirl'
  },
  {
    id: 'kadai-paneer',
    name: 'Kadai Paneer',
    category: 'main-course',
    description: 'Fresh paneer cubes and crisp bell peppers tossed in robust freshly ground kadai spices',
    price: 460,
    image: 'assets/menu/main course/Kadai Paneer.jpg',
    alt: 'Aromatic kadai paneer with bell peppers'
  },
  {
    id: 'palak-paneer',
    name: 'Palak Paneer',
    category: 'main-course',
    description: 'Soft cottage cheese cubes simmered in a silky garlic-infused spinach puree',
    price: 450,
    image: 'assets/menu/main course/Palak Paneer.jpg',
    alt: 'Silky vibrant green palak paneer curry'
  }
];
