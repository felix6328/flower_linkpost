import React from 'react';
import { FlowerType } from '../types/bouquet';

interface FlowerIllustrationProps {
  type: FlowerType;
  className?: string;
  size?: number;
}

export const LilyIllustration: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`filter drop-shadow-md ${className}`}>
    {/* Calyx & small leaves */}
    <path d="M32 46 C24 50 18 42 22 36 C28 42 30 44 32 46 Z" fill="#3a6642" />
    <path d="M32 46 C40 50 46 42 42 36 C36 42 34 44 32 46 Z" fill="#2d5234" />
    {/* Outer petals */}
    <path d="M32 40 C14 36 6 22 18 14 C28 20 30 32 32 40 Z" fill="#fff5f7" stroke="#fad2d8" strokeWidth="1" />
    <path d="M32 40 C50 36 58 22 46 14 C36 20 34 32 32 40 Z" fill="#fff5f7" stroke="#fad2d8" strokeWidth="1" />
    {/* Center tall petal */}
    <path d="M32 42 C26 24 24 8 32 4 C40 8 38 24 32 42 Z" fill="#ffffff" stroke="#fad2d8" strokeWidth="1.2" />
    {/* Inner petal highlights */}
    <path d="M32 40 C28 30 24 18 32 10" stroke="#fecdd3" strokeWidth="1.2" strokeLinecap="round" />
    {/* Stamens */}
    <path d="M32 38 Q27 25 24 20" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="23.5" cy="19.5" r="2" fill="#e11d48" />
    <path d="M32 38 Q37 25 40 20" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="40.5" cy="19.5" r="2" fill="#e11d48" />
    <path d="M32 38 V18" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="32" cy="17" r="2.2" fill="#e11d48" />
  </svg>
);

export const RoseIllustration: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`filter drop-shadow-md ${className}`}>
    {/* Leaves */}
    <path d="M18 42 C8 42 8 30 20 32 C22 36 20 40 18 42 Z" fill="#2d5234" />
    <path d="M46 42 C56 42 56 30 44 32 C42 36 44 40 46 42 Z" fill="#3a6642" />
    {/* Outer rose petals */}
    <path d="M32 54 C16 54 8 38 16 26 C24 16 40 16 48 26 C56 38 48 54 32 54 Z" fill="#9f1239" />
    <path d="M32 50 C20 50 14 38 20 28 C26 20 38 20 44 28 C50 38 44 50 32 50 Z" fill="#be123c" />
    {/* Inner petal folds */}
    <path d="M24 34 C24 24 38 22 42 30 C46 38 34 46 26 42" fill="#e11d48" />
    <path d="M30 30 C30 25 38 24 38 29 C38 34 32 36 30 34" fill="#fb7185" />
    {/* Rose heart spiral */}
    <path d="M32 28 C34 26 36 28 35 30 C34 32 32 31 32 30" stroke="#ffe4e6" strokeWidth="1.5" strokeLinecap="round" />
    {/* Dewdrop */}
    <circle cx="24" cy="28" r="1.5" fill="#ffffff" opacity="0.8" />
  </svg>
);

export const TulipIllustration: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`filter drop-shadow-md ${className}`}>
    {/* Tulip stem & blade leaf */}
    <path d="M32 46 V58" stroke="#2d5234" strokeWidth="3" strokeLinecap="round" />
    <path d="M34 56 C44 50 48 38 44 30 C38 38 36 48 34 56 Z" fill="#3a6642" />
    {/* Back petal */}
    <path d="M32 44 C20 44 20 20 32 10 C44 20 44 44 32 44 Z" fill="#f43f5e" />
    {/* Left petal */}
    <path d="M30 46 C16 46 14 26 24 16 C30 26 32 38 30 46 Z" fill="#fb7185" />
    {/* Right petal */}
    <path d="M34 46 C48 46 50 26 40 16 C34 26 32 38 34 46 Z" fill="#fda4af" />
    {/* Center petal highlight */}
    <path d="M32 46 C26 38 26 24 32 18 C38 24 38 38 32 46 Z" fill="#fff1f2" opacity="0.9" />
  </svg>
);

export const SunflowerIllustration: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`filter drop-shadow-md ${className}`}>
    {/* Petals radiating in a circle */}
    <g fill="#f59e0b" stroke="#d97706" strokeWidth="0.8">
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <ellipse
          key={deg}
          cx="32"
          cy="15"
          rx="5"
          ry="12"
          transform={`rotate(${deg} 32 32)`}
        />
      ))}
    </g>
    <g fill="#fbbf24">
      {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((deg) => (
        <ellipse
          key={deg}
          cx="32"
          cy="18"
          rx="4"
          ry="9"
          transform={`rotate(${deg} 32 32)`}
        />
      ))}
    </g>
    {/* Dark Seed Center */}
    <circle cx="32" cy="32" r="11" fill="#451a03" stroke="#78350f" strokeWidth="1.5" />
    <circle cx="32" cy="32" r="8" fill="#78350f" stroke="#b45309" strokeWidth="1" strokeDasharray="2 2" />
    <circle cx="32" cy="32" r="4" fill="#92400e" />
  </svg>
);

export const DaisyIllustration: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`filter drop-shadow-md ${className}`}>
    {/* White daisy petals */}
    <g fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8">
      {[0, 24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336].map((deg) => (
        <ellipse
          key={deg}
          cx="32"
          cy="16"
          rx="4.5"
          ry="11"
          transform={`rotate(${deg} 32 32)`}
        />
      ))}
    </g>
    {/* Bright Golden Center */}
    <circle cx="32" cy="32" r="9" fill="#f59e0b" stroke="#d97706" strokeWidth="1.2" />
    <circle cx="32" cy="32" r="6" fill="#fbbf24" stroke="#fef08a" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
  </svg>
);

export const LavenderIllustration: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`filter drop-shadow-md ${className}`}>
    <path d="M32 60 V12" stroke="#2d5234" strokeWidth="2" strokeLinecap="round" />
    {/* Clustered violet buds */}
    <ellipse cx="32" cy="10" rx="3.5" ry="5" fill="#a855f7" />
    <ellipse cx="28" cy="18" rx="3.5" ry="5" fill="#9333ea" transform="rotate(-15 28 18)" />
    <ellipse cx="36" cy="18" rx="3.5" ry="5" fill="#c084fc" transform="rotate(15 36 18)" />
    <ellipse cx="27" cy="27" rx="4" ry="5.5" fill="#a855f7" transform="rotate(-20 27 27)" />
    <ellipse cx="37" cy="27" rx="4" ry="5.5" fill="#9333ea" transform="rotate(20 37 27)" />
    <ellipse cx="26" cy="37" rx="4" ry="6" fill="#7e22ce" transform="rotate(-25 26 37)" />
    <ellipse cx="38" cy="37" rx="4" ry="6" fill="#a855f7" transform="rotate(25 38 37)" />
    {/* Slender leaves */}
    <path d="M32 44 C20 42 16 34 18 28 C22 36 28 40 32 44 Z" fill="#3a6642" />
    <path d="M32 48 C44 46 48 38 46 32 C42 40 36 44 32 48 Z" fill="#3a6642" />
  </svg>
);

export const PeonyIllustration: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`filter drop-shadow-md ${className}`}>
    {/* Ruffled peony petals */}
    <circle cx="32" cy="32" r="22" fill="#fda4af" opacity="0.6" />
    <path d="M32 52 C14 52 10 34 20 22 C30 12 48 16 52 28 C56 42 46 52 32 52 Z" fill="#fb7185" />
    <path d="M32 48 C18 48 16 32 24 24 C32 16 44 20 46 30 C48 40 40 48 32 48 Z" fill="#f43f5e" />
    <path d="M28 38 C24 32 30 26 36 28 C42 30 40 38 36 40 C32 42 30 42 28 38 Z" fill="#ffe4e6" />
    <circle cx="34" cy="33" r="3" fill="#f59e0b" />
  </svg>
);

export const BotanicalFlower: React.FC<FlowerIllustrationProps> = ({ type, size = 48, className = '' }) => {
  switch (type) {
    case 'lily':
      return <LilyIllustration size={size} className={className} />;
    case 'rose':
      return <RoseIllustration size={size} className={className} />;
    case 'tulip':
      return <TulipIllustration size={size} className={className} />;
    case 'sunflower':
      return <SunflowerIllustration size={size} className={className} />;
    case 'daisy':
      return <DaisyIllustration size={size} className={className} />;
    case 'lavender':
      return <LavenderIllustration size={size} className={className} />;
    case 'peony':
      return <PeonyIllustration size={size} className={className} />;
    default:
      return <LilyIllustration size={size} className={className} />;
  }
};
