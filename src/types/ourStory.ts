/**
 * Theta Theta Telugu — Our Story Data & Component Types
 */

export type StoryAccent = 'burgundy' | 'gold' | 'terracotta';

export interface StoryStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  accent: StoryAccent;
  side: 'left' | 'right';
  rotation?: number;
}

export interface AccentTheme {
  primary: string;
  lightBadge?: string;
  badge?: string;
  pin: string;
  borderSubtle: string;
}

export interface OurStorySectionProps {
  steps?: StoryStep[];
  className?: string;
  eyebrow?: string;
  headingLine1?: string;
  headingLine2?: string;
  description?: string;
  quote?: string;
}
