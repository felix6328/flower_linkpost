import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, Music, Video, FileText, Globe } from 'lucide-react';
import { BouquetConfig, BouquetItem } from '../types/bouquet';
import { BotanicalFlower } from './FloralIllustrations';

interface BouquetDisplayProps {
  bouquet: BouquetConfig;
  onSelectCard: (item: BouquetItem) => void;
  isUnwrapped?: boolean;
}

export const BouquetDisplay: React.FC<BouquetDisplayProps> = ({
  bouquet,
  onSelectCard,
  isUnwrapped = true,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const items = bouquet.items;
  const count = items.length;

  // Calculate fan angles and positions for cards
  const calculateCardTransform = (index: number, total: number) => {
    if (total === 1) {
      return { rotate: 0, x: 0, y: -90, zIndex: 10 };
    }

    const maxAngle = Math.min(36, 12 + total * 4);
    const step = (maxAngle * 2) / (total - 1);
    const rotate = -maxAngle + index * step;

    const normalizedIndex = (index / (total - 1)) * 2 - 1;
    const archOffset = (1 - Math.pow(normalizedIndex, 2)) * 65;

    const radius = 175;
    const rad = ((rotate - 90) * Math.PI) / 180;
    const x = Math.cos(rad) * radius + (rotate * 1.8);
    const y = Math.sin(rad) * radius - archOffset + 75;

    const zIndex = 10 + Math.round((1 - Math.abs(normalizedIndex)) * 10) + index;

    return { rotate, x, y, zIndex };
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'spotify':
      case 'apple-music':
        return <Music className="w-3.5 h-3.5 text-emerald-300" />;
      case 'youtube':
      case 'bilibili':
        return <Video className="w-3.5 h-3.5 text-rose-300" />;
      case 'substack':
        return <FileText className="w-3.5 h-3.5 text-amber-300" />;
      default:
        return <Globe className="w-3.5 h-3.5 text-sky-300" />;
    }
  };

  // Render stylized card according to cardStyle
  const renderCardContent = (item: BouquetItem, isHovered: boolean) => {
    const style = item.cardStyle || 'polaroid';

    // 1. VINYL RECORD STYLE (黑胶唱片风)
    if (style === 'vinyl') {
      return (
        <div className="relative w-48 bg-[#181114] border border-rose-950/60 rounded-2xl p-2.5 shadow-2xl overflow-visible">
          {/* Vinyl disc sliding out on hover */}
          <motion.div
            initial={false}
            animate={{ x: isHovered ? 26 : 0, rotate: isHovered ? 180 : 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute -right-3 top-3 w-28 h-28 rounded-full bg-[#0d090a] border-2 border-[#261f22] shadow-2xl flex items-center justify-center -z-10 pointer-events-none"
          >
            {/* Vinyl grooves */}
            <div className="w-24 h-24 rounded-full border border-white/5 flex items-center justify-center">
              <div className="w-18 h-18 rounded-full border border-white/10 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-rose-600/80 border border-amber-300/40 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-black" />
                </div>
              </div>
            </div>
          </motion.div>

          <div className="relative w-full h-28 rounded-xl overflow-hidden bg-black/60 group">
            {item.thumbnail ? (
              <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-rose-950 flex items-center justify-center">
                <Music className="w-8 h-8 text-rose-300/40" />
              </div>
            )}
            <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md flex items-center gap-1 border border-white/10">
              {getPlatformIcon(item.platform)}
              <span className="text-[9px] font-semibold text-emerald-300 uppercase">VINYL</span>
            </div>
            {isHovered && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="p-2.5 rounded-full bg-rose-600 text-white shadow-lg animate-pulse">
                  <Play className="w-4 h-4 fill-current" />
                </span>
              </div>
            )}
          </div>
          <div className="mt-2 text-left">
            <h4 className="text-xs font-semibold text-rose-50 truncate font-serif">{item.title}</h4>
            <p className="text-[10px] text-rose-300/60 truncate">{item.subtitle}</p>
          </div>
        </div>
      );
    }

    // 2. POLAROID RETRO STYLE (拍立得压花风)
    if (style === 'polaroid') {
      return (
        <div className="relative w-48 bg-[#fbf9f4] text-[#2c1d18] rounded-xl p-2.5 pt-4 pb-3 shadow-2xl border border-stone-200">
          {/* Top washi tape */}
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-5 bg-rose-200/70 -rotate-2 border-y border-rose-300/40 shadow-sm backdrop-blur-sm" />

          {/* Photo frame */}
          <div className="relative w-full h-28 rounded-lg overflow-hidden bg-neutral-900">
            {item.thumbnail && (
              <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover filter contrast-[1.05]" />
            )}
            <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md flex items-center gap-1 text-[9px] text-white">
              {getPlatformIcon(item.platform)}
              <span>{item.platform}</span>
            </div>
          </div>

          {/* Handwriting caption at bottom */}
          <div className="mt-2.5 px-1 text-left">
            <h4 className="text-xs font-bold text-stone-900 truncate font-serif">{item.title}</h4>
            <p className="text-[10px] text-stone-500 truncate italic font-serif">
              {item.personalNote || item.subtitle || 'Memories in Bloom'}
            </p>
          </div>
        </div>
      );
    }

    // 3. CINEMA FILM STYLE (电影胶片放映风)
    if (style === 'cinema-film') {
      return (
        <div className="relative w-50 bg-[#121214] text-white rounded-xl p-2 shadow-2xl border border-zinc-800">
          {/* Top filmstrip perforations */}
          <div className="flex justify-between px-2 py-1 mb-1 border-b border-zinc-800">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-2.5 h-1.5 rounded-xs bg-zinc-700/80" />
            ))}
          </div>

          <div className="relative w-full h-26 rounded-md overflow-hidden bg-black">
            {item.thumbnail && (
              <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
            )}
            <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-rose-600/90 text-[9px] font-bold tracking-wider uppercase">
              FILM
            </div>
            {isHovered && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="p-2.5 rounded-full bg-rose-600 text-white shadow-lg">
                  <Play className="w-4 h-4 fill-current" />
                </span>
              </div>
            )}
          </div>

          {/* Bottom filmstrip perforations */}
          <div className="flex justify-between px-2 py-1 mt-1 border-t border-zinc-800">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-2.5 h-1.5 rounded-xs bg-zinc-700/80" />
            ))}
          </div>

          <div className="mt-1 px-1 text-left">
            <h4 className="text-xs font-semibold text-rose-50 truncate font-serif">{item.title}</h4>
            <p className="text-[10px] text-zinc-400 truncate">{item.subtitle}</p>
          </div>
        </div>
      );
    }

    // 4. VINTAGE PARCHMENT (复古羊皮纸风)
    if (style === 'vintage-parchment') {
      return (
        <div className="relative w-48 bg-[#f5ecdd] text-[#331c12] rounded-xl p-3 shadow-2xl border-2 border-[#d6c2a8] overflow-hidden">
          {/* Red Wax Seal at top right */}
          <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-[#8f1d1d] border border-red-900 shadow-md flex items-center justify-center text-[10px] text-amber-200">
            ✦
          </div>

          <div className="relative w-full h-24 rounded-lg overflow-hidden border border-[#d3be9f] bg-[#e8dbca]">
            {item.thumbnail && (
              <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover sepia-[0.3]" />
            )}
          </div>

          <div className="mt-2 text-left font-serif">
            <div className="text-[9px] font-bold uppercase text-[#874b33] tracking-widest">
              {item.platform}
            </div>
            <h4 className="text-xs font-bold text-[#2a1309] truncate mt-0.5">{item.title}</h4>
            <p className="text-[10px] text-[#6d4c38] truncate italic">{item.subtitle}</p>
          </div>
        </div>
      );
    }

    // 5. GLASS BLOOM STYLE (晶莹花房风 - Default)
    return (
      <div className="relative w-48 bg-white/10 backdrop-blur-xl border border-white/25 rounded-2xl p-2.5 shadow-2xl text-white">
        <div className="relative w-full h-26 rounded-xl overflow-hidden bg-black/30 group">
          {item.thumbnail ? (
            <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-white/5 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-rose-200/50" />
            </div>
          )}
          <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md flex items-center gap-1 border border-white/10 text-[9px]">
            {getPlatformIcon(item.platform)}
            <span className="capitalize">{item.platform}</span>
          </div>
        </div>
        <div className="mt-2 text-left">
          <h4 className="text-xs font-semibold text-white truncate font-serif">{item.title}</h4>
          <p className="text-[10px] text-rose-200/70 truncate">{item.subtitle}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full h-[600px] sm:h-[700px] flex items-center justify-center select-none overflow-visible">
      {/* Background ambient glow */}
      <div className="absolute w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-rose-600/20 via-pink-500/15 to-transparent blur-3xl pointer-events-none" />

      {/* Floating flower petals in the breeze */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`petal-${i}`}
            className="absolute text-rose-300/30 text-xl"
            initial={{
              x: `${i * 13 + 8}%`,
              y: '-10%',
              rotate: 0,
              opacity: 0,
            }}
            animate={{
              y: '110%',
              rotate: 360,
              opacity: [0, 0.7, 0.7, 0],
            }}
            transition={{
              duration: 8 + (i % 4) * 3,
              repeat: Infinity,
              delay: i * 1.5,
              ease: 'easeInOut',
            }}
          >
            🌸
          </motion.div>
        ))}
      </div>

      {/* Main Bouquet Container */}
      <div className="relative w-full max-w-2xl h-full flex items-center justify-center">

        {/* ===================== THE FLOWER CARDS ===================== */}
        <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0">
          <AnimatePresence>
            {isUnwrapped &&
              items.map((item, index) => {
                const transform = calculateCardTransform(index, count);
                const isHovered = hoveredId === item.id;

                return (
                  <motion.div
                    key={item.id}
                    className="absolute cursor-pointer"
                    initial={{
                      x: 0,
                      y: 80,
                      rotate: 0,
                      scale: 0.2,
                      opacity: 0,
                    }}
                    animate={{
                      x: isHovered ? transform.x * 1.05 : transform.x,
                      y: isHovered ? transform.y - 35 : transform.y,
                      rotate: isHovered ? 0 : transform.rotate,
                      scale: isHovered ? 1.15 : 1,
                      opacity: 1,
                      zIndex: isHovered ? 50 : transform.zIndex,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                      delay: index * 0.08,
                    }}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => onSelectCard(item)}
                    style={{ transformOrigin: 'bottom center' }}
                  >
                    {/* STEM connecting card to bouquet wrapping core */}
                    <svg
                      className="absolute left-1/2 -bottom-24 -translate-x-1/2 pointer-events-none opacity-70"
                      width="70"
                      height="130"
                      viewBox="0 0 70 130"
                      fill="none"
                    >
                      <path
                        d={`M 35 0 Q ${35 - transform.rotate * 0.4} 65 35 130`}
                        stroke="#2f5737"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      {/* Climbing Leaves on the stem */}
                      <path d="M 35 45 C 50 35 52 28 35 40" fill="#3d7247" />
                      <path d="M 35 80 C 18 70 16 62 35 75" fill="#3d7247" />
                    </svg>

                    {/* VIVID BOTANICAL FLOWER ILLUSTRATION blooming out from card corner */}
                    <div className="absolute -top-6 -right-4 z-30 transform hover:scale-125 transition-transform duration-300">
                      <BotanicalFlower type={item.flowerType} size={50} />
                    </div>

                    {/* Left floral accent bud for variety on even cards */}
                    {index % 2 === 0 && (
                      <div className="absolute -bottom-2 -left-3 z-30 pointer-events-none opacity-85">
                        <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                          <path d="M 16 28 C 10 20 6 12 16 4 C 26 12 22 20 16 28 Z" fill="#3a6642" />
                          <circle cx="16" cy="12" r="5" fill={item.flowerColor || '#ff7597'} />
                        </svg>
                      </div>
                    )}

                    {/* Card container with dynamic styles */}
                    <div
                      className={`relative transition-all duration-300 ${
                        isHovered
                          ? 'ring-4 ring-rose-400/50 shadow-2xl shadow-rose-950/80 -translate-y-1'
                          : ''
                      }`}
                    >
                      {renderCardContent(item, isHovered)}
                    </div>
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </div>

        {/* ===================== BOUQUET WRAPPER & LILIES ===================== */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
          {/* Floral collar */}
          <div className="relative -mb-10 z-20 flex items-center justify-center gap-1">
            <svg
              width="300"
              height="95"
              viewBox="0 0 300 95"
              fill="none"
              className="filter drop-shadow-lg"
            >
              <g opacity="0.95">
                {/* Left Lily */}
                <path
                  d="M 65 75 C 45 42 55 15 85 22 C 100 37 95 62 65 75 Z"
                  fill="#fff7f8"
                  stroke="#fad2d8"
                  strokeWidth="1.5"
                />
                {/* Center Big Lily */}
                <path
                  d="M 150 85 C 115 32 120 10 150 5 C 180 10 185 32 150 85 Z"
                  fill="#ffffff"
                  stroke="#f7cad0"
                  strokeWidth="1.5"
                />
                <path
                  d="M 150 85 C 95 65 95 38 122 26 C 145 48 150 75 150 85 Z"
                  fill="#fff0f3"
                  stroke="#f7cad0"
                  strokeWidth="1"
                />
                <path
                  d="M 150 85 C 205 65 205 38 178 26 C 155 48 150 75 150 85 Z"
                  fill="#fff0f3"
                  stroke="#f7cad0"
                  strokeWidth="1"
                />
                {/* Stamens */}
                <line x1="150" y1="80" x2="145" y2="42" stroke="#f6bd60" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="145" cy="40" r="3.5" fill="#e11d48" />
                <line x1="150" y1="80" x2="155" y2="44" stroke="#f6bd60" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="155" cy="42" r="3.5" fill="#e11d48" />
                {/* Right Lily */}
                <path
                  d="M 235 75 C 255 42 245 15 215 22 C 200 37 205 62 235 75 Z"
                  fill="#fff7f8"
                  stroke="#fad2d8"
                  strokeWidth="1.5"
                />
              </g>

              {/* Eucalyptus leaves */}
              <path d="M 30 80 C 10 60 20 45 45 55 C 40 70 35 75 30 80 Z" fill="#436449" opacity="0.9" />
              <path d="M 270 80 C 290 60 280 45 255 55 C 260 70 265 75 270 80 Z" fill="#436449" opacity="0.9" />
            </svg>
          </div>

          {/* Cone Floral Wrapping Paper */}
          <div className="relative filter drop-shadow-2xl">
            <svg width="270" height="210" viewBox="0 0 270 210" fill="none">
              <defs>
                <linearGradient id="paperFoldLeft2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f7f2ea" />
                  <stop offset="50%" stopColor="#ebdccb" />
                  <stop offset="100%" stopColor="#d3bd9f" />
                </linearGradient>
                <linearGradient id="paperFoldRight2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="40%" stopColor="#f3e8db" />
                  <stop offset="100%" stopColor="#c7b093" />
                </linearGradient>
                <linearGradient id="ribbonSilk2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#b91c1c" />
                  <stop offset="50%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#991b1b" />
                </linearGradient>
              </defs>

              <path d="M 15 20 L 135 205 L 45 35 Z" fill="url(#paperFoldLeft2)" opacity="0.9" />
              <path d="M 15 20 Q 135 45 255 20 L 145 205 Q 135 210 125 205 Z" fill="url(#paperFoldRight2)" />
              <path d="M 30 28 L 135 205 L 240 30 Q 135 65 30 28 Z" fill="#faeee1" opacity="0.95" />
              <path d="M 135 205 L 90 45 Q 135 55 180 45 Z" fill="#b89d7d" opacity="0.3" />

              {/* Bow Ribbon */}
              <g transform="translate(5, 15)">
                <path d="M 105 130 Q 130 135 155 130 L 157 142 Q 130 148 103 142 Z" fill="url(#ribbonSilk2)" />
                <ellipse cx="115" cy="136" rx="14" ry="9" fill="#dc2626" transform="rotate(-20 115 136)" />
                <ellipse cx="115" cy="136" rx="9" ry="5" fill="#991b1b" transform="rotate(-20 115 136)" />
                <ellipse cx="145" cy="136" rx="14" ry="9" fill="#dc2626" transform="rotate(20 145 136)" />
                <ellipse cx="145" cy="136" rx="9" ry="5" fill="#991b1b" transform="rotate(20 145 136)" />
                <circle cx="130" cy="137" r="6" fill="#b91c1c" />
                <path d="M 126 142 Q 115 165 110 180" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
                <path d="M 134 142 Q 145 165 152 182" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
              </g>
            </svg>

            {/* Greeting Tag */}
            <div className="absolute top-[145px] left-1/2 -translate-x-1/2 bg-[#fdfaf5] border border-amber-900/20 px-3.5 py-1.5 rounded-lg shadow-xl rotate-2 text-center pointer-events-auto hover:rotate-0 transition-transform">
              <div className="text-[10px] font-bold text-amber-950 uppercase tracking-wider font-serif">
                {bouquet.title || 'Link Bouquet'}
              </div>
              <div className="text-[9px] text-amber-800/80 font-medium">
                To: {bouquet.recipientName || '特别的朋友'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
