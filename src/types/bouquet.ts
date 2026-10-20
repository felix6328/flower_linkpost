export type FlowerType = 'lily' | 'rose' | 'tulip' | 'sunflower' | 'daisy' | 'lavender' | 'peony';

export type CardStyle = 'polaroid' | 'vinyl' | 'glass-bloom' | 'cinema-film' | 'vintage-parchment';

export type LinkType = 'song' | 'video' | 'article' | 'note' | 'link';

export type PlatformType = 'spotify' | 'youtube' | 'apple-music' | 'bilibili' | 'substack' | 'github' | 'web';

export interface BouquetItem {
  id: string;
  url: string;
  title: string;
  subtitle?: string;
  description?: string;
  thumbnail?: string;
  type: LinkType;
  platform: PlatformType;
  flowerType: FlowerType;
  flowerColor?: string;
  cardStyle?: CardStyle;
  personalNote?: string;
}

export type BouquetTheme = 'wine-ruby' | 'midnight-navy' | 'vintage-forest' | 'rose-blush' | 'golden-sunset';

export type WrapperStyle = 'linen-cream' | 'kraft-paper' | 'silk-black' | 'vintage-newspaper';

export interface BouquetConfig {
  id: string;
  recipientName: string;
  senderName: string;
  title: string;
  greetingMessage: string;
  theme: BouquetTheme;
  wrapperStyle: WrapperStyle;
  items: BouquetItem[];
  createdAt: number;
}
