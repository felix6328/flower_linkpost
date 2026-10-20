import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Play, Sparkles, Heart, Music, Video, FileText, Globe } from 'lucide-react';
import { BouquetItem } from '../types/bouquet';
import { getEmbedUrl } from '../utils/urlParser';

interface CardPreviewModalProps {
  item: BouquetItem | null;
  onClose: () => void;
}

export const CardPreviewModal: React.FC<CardPreviewModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  const embedUrl = getEmbedUrl(item.url, item.platform);

  const getPlatformIcon = () => {
    switch (item.platform) {
      case 'spotify':
      case 'apple-music':
        return <Music className="w-5 h-5 text-emerald-400" />;
      case 'youtube':
      case 'bilibili':
        return <Video className="w-5 h-5 text-rose-400" />;
      case 'substack':
        return <FileText className="w-5 h-5 text-amber-400" />;
      default:
        return <Globe className="w-5 h-5 text-sky-400" />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-[#241217] border border-rose-900/60 rounded-3xl shadow-2xl overflow-hidden z-10 text-white"
        >
          {/* Top banner / image */}
          {embedUrl ? (
            <div className="w-full aspect-video bg-black flex items-center justify-center">
              <iframe
                src={embedUrl}
                title={item.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : item.thumbnail ? (
            <div className="relative w-full h-48 sm:h-56 overflow-hidden">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#241217] via-transparent to-black/30" />
            </div>
          ) : (
            <div className="w-full h-32 bg-gradient-to-br from-rose-950 to-amber-950 flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-rose-300/40 animate-pulse" />
            </div>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white/80 hover:text-white transition-colors backdrop-blur-sm"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content details */}
          <div className="p-6 sm:p-7 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-white/10 flex items-center justify-center">
                {getPlatformIcon()}
              </span>
              <span className="text-xs uppercase tracking-wider font-semibold text-rose-300/90">
                {item.platform} • {item.type}
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-rose-50 leading-snug">
                {item.title}
              </h3>
              {item.subtitle && (
                <p className="text-sm text-rose-200/70 font-medium mt-1">
                  {item.subtitle}
                </p>
              )}
            </div>

            {item.description && (
              <p className="text-sm text-rose-100/80 leading-relaxed bg-white/5 p-3.5 rounded-2xl border border-white/5">
                {item.description}
              </p>
            )}

            {/* Personal memo from sender */}
            {item.personalNote && (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3">
                <span className="text-rose-400 text-lg">💌</span>
                <div>
                  <div className="text-xs font-semibold text-rose-300">特别留言 / 私语</div>
                  <div className="text-sm text-rose-100 mt-0.5">{item.personalNote}</div>
                </div>
              </div>
            )}

            {/* Jump button */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-semibold text-sm shadow-lg shadow-rose-900/40 transition-all transform active:scale-95"
              >
                <span>立即打开链接</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={onClose}
                className="py-3 px-5 rounded-2xl bg-white/10 hover:bg-white/15 text-white/90 text-sm font-medium transition-colors"
              >
                收起
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
