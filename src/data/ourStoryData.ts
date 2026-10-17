import { StoryStep, StoryAccent, AccentTheme } from '../types/ourStory.js';

export const accentThemes: Record<StoryAccent, AccentTheme> = {
  burgundy: {
    primary: '#7A291B',
    badge: '#F4E3DF',
    pin: '#7A291B',
    borderSubtle: 'rgba(122, 41, 27, 0.18)'
  },
  gold: {
    primary: '#9A702D',
    badge: '#F8EEDF',
    pin: '#9A702D',
    borderSubtle: 'rgba(154, 112, 45, 0.18)'
  },
  terracotta: {
    primary: '#A64B2A',
    badge: '#F9E8E1',
    pin: '#A64B2A',
    borderSubtle: 'rgba(166, 75, 42, 0.18)'
  }
};

export const defaultStorySteps: StoryStep[] = [
  {
    id: 'milestone-01',
    stepNumber: '01',
    title: 'Rooted in Telugu Tradition',
    description: 'From the tang of tamarind to the aroma of curry leaves, Telugu cuisine carries generations of flavour, memory, and tradition.',
    accent: 'burgundy',
    side: 'left',
    rotation: -1.5
  },
  {
    id: 'milestone-02',
    stepNumber: '02',
    title: "A Place Among India's Best",
    description: 'Ranked No. 17 at the Condé Nast Traveller × District Top Restaurant Awards 2026, a milestone in our young journey.',
    accent: 'gold',
    side: 'right',
    rotation: 1.8
  },
  {
    id: 'milestone-03',
    stepNumber: '03',
    title: 'Celebrating New Beginnings',
    description: 'Recognised as Best Emerging Restaurant at the Travel + Leisure India & South Asia Delicious Dining Awards 2026.',
    accent: 'terracotta',
    side: 'left',
    rotation: -1.2
  },
  {
    id: 'milestone-04',
    stepNumber: '04',
    title: 'Three Stars, One Culinary Story',
    description: 'Three stars in the Ultimate Restaurant Ratings by Culinary Culture Co. inspire us to keep sharing the depth of Telugu cuisine.',
    accent: 'burgundy',
    side: 'right',
    rotation: 1.5
  },
  {
    id: 'milestone-05',
    stepNumber: '05',
    title: 'Tradition, Served for Tomorrow',
    description: 'We honour the ingredients, recipes, and culinary heritage passed down through generations, bringing Telugu food to new tables.',
    accent: 'gold',
    side: 'left',
    rotation: -0.8
  }
];
