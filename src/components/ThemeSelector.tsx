import React from 'react';
import { BouquetTheme } from '../types/bouquet';

interface ThemeSelectorProps {
  currentTheme: BouquetTheme;
  onChangeTheme: (theme: BouquetTheme) => void;
}

export const THEME_STYLES: Record<
  BouquetTheme,
  { label: string; bg: string; buttonBg: string; accent: string }
> = {
  'wine-ruby': {
    label: '勃艮第红酒 (经典浓郁)',
    bg: 'from-[#420a11] via-[#5c0d18] to-[#2b050a]',
    buttonBg: 'bg-[#7a1220]',
    accent: '#ff4d6d',
  },
  'midnight-navy': {
    label: '午夜星辰 (深邃静谧)',
    bg: 'from-[#0b132b] via-[#1c2541] to-[#080d1e]',
    buttonBg: 'bg-[#1c2541]',
    accent: '#48bfe3',
  },
  'vintage-forest': {
    label: '复古森林 (清雅自然)',
    bg: 'from-[#132a13] via-[#1e3f20] to-[#0c1b0c]',
    buttonBg: 'bg-[#28592c]',
    accent: '#a7c957',
  },
  'rose-blush': {
    label: '落日玫瑰 (温柔浪漫)',
    bg: 'from-[#4a1525] via-[#632034] to-[#360e19]',
    buttonBg: 'bg-[#852a44]',
    accent: '#ff8fab',
  },
  'golden-sunset': {
    label: '暖阳麦浪 (明朗治愈)',
    bg: 'from-[#38230b] via-[#4f3312] to-[#261706]',
    buttonBg: 'bg-[#664319]',
    accent: '#ffb703',
  },
};

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onChangeTheme }) => {
  return (
    <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-lg">
      {(Object.keys(THEME_STYLES) as BouquetTheme[]).map((themeKey) => {
        const theme = THEME_STYLES[themeKey];
        const isSelected = currentTheme === themeKey;
        return (
          <button
            key={themeKey}
            type="button"
            title={theme.label}
            onClick={() => onChangeTheme(themeKey)}
            className={`w-7 h-7 rounded-full transition-all flex items-center justify-center ${theme.buttonBg} ${
              isSelected
                ? 'ring-2 ring-white scale-110 shadow-md'
                : 'opacity-70 hover:opacity-100 hover:scale-105'
            }`}
          >
            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
          </button>
        );
      })}
    </div>
  );
};
