import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Gift } from 'lucide-react';
import { BouquetConfig } from '../types/bouquet';
import { playChimeSound } from '../utils/sharing';

interface UnwrapExperienceProps {
  bouquet: BouquetConfig;
  isOpen: boolean;
  onUnwrap: () => void;
}

export const UnwrapExperience: React.FC<UnwrapExperienceProps> = ({
  bouquet,
  isOpen,
  onUnwrap,
}) => {
  if (isOpen) return null;

  const handleUnwrap = () => {
    // 1. Play musical chime
    playChimeSound();

    // 2. Confetti celebratory burst
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.65 },
      colors: ['#ff7597', '#ff3b68', '#fdfbf7', '#ffd166', '#ef476f'],
      shapes: ['circle', 'square'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff7597', '#ffd166'],
      });
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff3b68', '#fdfbf7'],
      });
    }, 200);

    // 3. Trigger state change
    onUnwrap();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg"
      >
        <motion.div
          initial={{ scale: 0.9, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: -40, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className="relative max-w-md w-full bg-[#2a131b] border border-rose-500/30 rounded-3xl p-7 sm:p-8 text-center shadow-2xl shadow-rose-950/80 overflow-hidden"
        >
          {/* Subtle floral background pattern */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-rose-500/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl" />

          {/* Gift Icon badge with pulse animation */}
          <div className="relative mx-auto w-20 h-20 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-900/60 mb-5 animate-bounce">
            <Gift className="w-10 h-10 text-white" />
            <span className="absolute -top-1 -right-1 text-2xl">💐</span>
          </div>

          {/* Letter / Envelope design */}
          <div className="bg-[#fffcf7] text-[#2c1810] p-6 rounded-2xl shadow-inner border border-amber-200/60 mb-6 text-left relative overflow-hidden">
            <div className="absolute top-2 right-2 text-rose-300/40">
              <Heart className="w-16 h-16 fill-current -rotate-12" />
            </div>

            <div className="text-xs font-bold text-rose-900/60 uppercase tracking-widest mb-1">
              For You
            </div>
            <div className="text-xl font-bold font-serif text-[#3d131b]">
              致：{bouquet.recipientName || '亲爱的朋友'}
            </div>

            <p className="mt-3 text-sm text-[#4a2e2b] leading-relaxed italic font-serif">
              “{bouquet.greetingMessage || '把平时想跟你分享的歌、视频和文章，全包进这束花里。慢慢看，慢慢听。'}”
            </p>

            <div className="mt-4 pt-3 border-t border-amber-200/80 flex items-center justify-between text-xs text-[#6e463a]">
              <span>包含 {bouquet.items.length} 朵精选链接花瓣</span>
              <span className="font-semibold">— {bouquet.senderName || '你的好友'}</span>
            </div>
          </div>

          {/* Action button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleUnwrap}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-base shadow-xl shadow-rose-900/50 flex items-center justify-center gap-2 group transition-all"
          >
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>拆开这束链接花束</span>
            <span className="text-lg">✨</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
