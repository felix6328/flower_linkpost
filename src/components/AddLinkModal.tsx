import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Sparkles, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { BouquetItem, FlowerType, CardStyle } from '../types/bouquet';
import { detectPlatform, FLOWER_OPTIONS, CARD_STYLE_OPTIONS, COVER_PRESETS } from '../utils/urlParser';
import { BotanicalFlower } from './FloralIllustrations';

interface AddLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: BouquetItem) => void;
}

const PRESET_IDEAS: Omit<BouquetItem, 'id'>[] = [
  {
    url: 'https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT',
    title: 'Mystery of Love',
    subtitle: 'Sufjan Stevens • Call Me by Your Name OST',
    description: '夏日微风与清澈木吉他，浪漫而温柔的旋律。',
    thumbnail: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&auto=format&fit=crop&q=80',
    type: 'song',
    platform: 'spotify',
    flowerType: 'lavender',
    flowerColor: '#c084fc',
    cardStyle: 'vinyl',
    personalNote: '散步时听特别有感觉',
  },
  {
    url: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
    title: 'Lofi Hip Hop Radio',
    subtitle: 'beats to relax/study to',
    description: '最适合伴读和沉浸式工作的温暖旋律。',
    thumbnail: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=600&auto=format&fit=crop&q=80',
    type: 'video',
    platform: 'youtube',
    flowerType: 'sunflower',
    flowerColor: '#ffb703',
    cardStyle: 'cinema-film',
    personalNote: '工作累了就放着当背景音',
  },
  {
    url: 'https://paulgraham.com/love.html',
    title: 'How to Do What You Love',
    subtitle: 'Paul Graham Essay',
    description: '关于如何找到真正热爱的事业的经典散文，常读常新。',
    thumbnail: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80',
    type: 'article',
    platform: 'substack',
    flowerType: 'tulip',
    flowerColor: '#ff7597',
    cardStyle: 'vintage-parchment',
    personalNote: '启发我很多的文章，推荐给你',
  },
  {
    url: 'https://bilibili.com',
    title: '我在故宫修文物',
    subtitle: '匠心纪录片精选',
    description: '把时光揉进古物里，那份安静与从容特别动人。',
    thumbnail: 'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?w=600&auto=format&fit=crop&q=80',
    type: 'video',
    platform: 'bilibili',
    flowerType: 'peony',
    flowerColor: '#fda4af',
    cardStyle: 'polaroid',
    personalNote: '周末找个时间一起看一集吧',
  },
];

export const AddLinkModal: React.FC<AddLinkModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [tab, setTab] = useState<'custom' | 'covers' | 'presets'>('custom');
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [personalNote, setPersonalNote] = useState('');
  const [flowerType, setFlowerType] = useState<FlowerType>('lily');
  const [cardStyle, setCardStyle] = useState<CardStyle>('polaroid');
  const [thumbnail, setThumbnail] = useState(COVER_PRESETS[0].items[0].url);

  if (!isOpen) return null;

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    if (newUrl.length > 5) {
      const detected = detectPlatform(newUrl);
      if (!title && detected.defaultTitle) {
        setTitle(detected.defaultTitle);
      }
      if (!subtitle) {
        setSubtitle(`${detected.platform} • ${detected.type}`);
      }
      if (detected.defaultStyle) {
        setCardStyle(detected.defaultStyle);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    const detected = detectPlatform(url);
    const newItem: BouquetItem = {
      id: `link-${Date.now()}`,
      url: url.trim(),
      title: title.trim() || detected.defaultTitle || '未命名分享',
      subtitle: subtitle.trim() || `${detected.platform}`,
      description: personalNote ? `附言：${personalNote}` : undefined,
      thumbnail: thumbnail.trim() || COVER_PRESETS[0].items[0].url,
      type: detected.type,
      platform: detected.platform,
      flowerType,
      flowerColor: FLOWER_OPTIONS.find((f) => f.type === flowerType)?.color,
      cardStyle,
      personalNote: personalNote.trim() || undefined,
    };

    onAdd(newItem);
    setUrl('');
    setTitle('');
    setSubtitle('');
    setPersonalNote('');
    onClose();
  };

  const handleAddPreset = (preset: Omit<BouquetItem, 'id'>) => {
    onAdd({
      ...preset,
      id: `link-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          className="relative max-w-xl w-full bg-[#1e0e15] border border-rose-900/60 rounded-3xl p-6 sm:p-7 shadow-2xl text-white z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h3 className="text-xl font-bold font-serif text-rose-50 flex items-center gap-2">
                <span>精心挑选一朵链接鲜花</span>
                <span>💐</span>
              </h3>
              <p className="text-xs text-rose-300/70 mt-0.5">
                自定义卡片风格、植物花种与唯美封面
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab selector */}
          <div className="flex p-1 bg-black/40 rounded-xl my-4 border border-white/10 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setTab('custom')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                tab === 'custom' ? 'bg-rose-600 text-white shadow-md' : 'text-rose-200/60 hover:text-white'
              }`}
            >
              自定义输入
            </button>
            <button
              type="button"
              onClick={() => setTab('covers')}
              className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1 ${
                tab === 'covers' ? 'bg-rose-600 text-white shadow-md' : 'text-rose-200/60 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>挑选唯美封面</span>
            </button>
            <button
              type="button"
              onClick={() => setTab('presets')}
              className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1 ${
                tab === 'presets' ? 'bg-rose-600 text-white shadow-md' : 'text-rose-200/60 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>灵感花库</span>
            </button>
          </div>

          {tab === 'custom' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-rose-200/80 mb-1.5">
                  链接网址 (URL) *
                </label>
                <div className="relative">
                  <input
                    type="url"
                    required
                    placeholder="例如: https://open.spotify.com/... 或 https://bilibili.com/..."
                    value={url}
                    onChange={handleUrlChange}
                    className="w-full py-2.5 px-3.5 pl-9 rounded-xl bg-black/50 border border-white/15 focus:border-rose-500 focus:outline-none text-sm text-white placeholder-rose-200/30"
                  />
                  <LinkIcon className="w-4 h-4 text-rose-400 absolute left-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* CARD STYLE SELECTOR */}
              <div>
                <label className="block text-xs font-semibold text-rose-200/80 mb-1.5">
                  卡片视觉风格 (丰富的封面形态)
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {CARD_STYLE_OPTIONS.map((styleOpt) => (
                    <button
                      type="button"
                      key={styleOpt.style}
                      onClick={() => setCardStyle(styleOpt.style)}
                      className={`p-2 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                        cardStyle === styleOpt.style
                          ? 'border-rose-400 bg-rose-500/25 ring-2 ring-rose-400/30 shadow-md'
                          : 'border-white/10 bg-black/20 hover:border-white/20'
                      }`}
                    >
                      <span className="text-xl mb-0.5">{styleOpt.icon}</span>
                      <span className="text-[10px] font-semibold text-rose-100 truncate w-full">
                        {styleOpt.label.slice(0, 4)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* FLOWER TYPE SELECTOR */}
              <div>
                <label className="block text-xs font-semibold text-rose-200/80 mb-1.5">
                  搭配花朵品种 (右上角精致植物插画)
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
                  {FLOWER_OPTIONS.map((f) => (
                    <button
                      type="button"
                      key={f.type}
                      onClick={() => setFlowerType(f.type)}
                      className={`py-2 px-1 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                        flowerType === f.type
                          ? 'border-rose-400 bg-rose-500/25 ring-2 ring-rose-400/30 shadow-md'
                          : 'border-white/10 bg-black/20 hover:border-white/20'
                      }`}
                    >
                      <BotanicalFlower type={f.type} size={30} />
                      <span className="text-[10px] text-rose-200 font-medium">
                        {f.label.slice(2, 4)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-rose-200/80 mb-1.5">
                    标题 (Title)
                  </label>
                  <input
                    type="text"
                    placeholder="如: Jonny Greenwood - Alma"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl bg-black/40 border border-white/15 focus:border-rose-500 focus:outline-none text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-rose-200/80 mb-1.5">
                    副标题 / 来源
                  </label>
                  <input
                    type="text"
                    placeholder="如: Spotify • 专辑单曲"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl bg-black/40 border border-white/15 focus:border-rose-500 focus:outline-none text-xs text-white"
                  />
                </div>
              </div>

              {/* Cover preview + picker trigger */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-rose-200/80">
                    当前封面预览
                  </label>
                  <button
                    type="button"
                    onClick={() => setTab('covers')}
                    className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
                  >
                    <span>在封面库中挑选</span>
                    <Sparkles className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-black/40 border border-white/10">
                  <img
                    src={thumbnail}
                    alt="cover preview"
                    className="w-16 h-12 object-cover rounded-lg border border-white/20"
                  />
                  <input
                    type="url"
                    placeholder="可直接粘贴自定义图片网址"
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    className="flex-1 py-1 px-2 text-xs bg-transparent border-0 text-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-rose-200/80 mb-1.5">
                  悄悄话留言 (Personal Note)
                </label>
                <input
                  type="text"
                  placeholder="例如: 听这首歌时总会想起秋天的那次散步"
                  value={personalNote}
                  onChange={(e) => setPersonalNote(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bg-black/40 border border-white/15 focus:border-rose-500 focus:outline-none text-xs text-white placeholder-rose-200/30"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white/80 text-xs font-medium"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold shadow-lg shadow-rose-900/40 flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>插进花束</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: COVER PRESETS GALLERY */}
          {tab === 'covers' && (
            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
              <p className="text-xs text-rose-200/70">
                点击任意艺术封面，立即应用为当前链接的卡片配图：
              </p>
              {COVER_PRESETS.map((cat, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="text-xs font-bold text-rose-300">{cat.category}</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {cat.items.map((item, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          setThumbnail(item.url);
                          setTab('custom');
                        }}
                        className={`group relative h-22 rounded-xl overflow-hidden cursor-pointer border transition-all ${
                          thumbnail === item.url
                            ? 'border-rose-400 ring-2 ring-rose-500'
                            : 'border-white/10 hover:border-rose-300/60 hover:scale-102'
                        }`}
                      >
                        <img
                          src={item.url}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1.5">
                          <span className="text-[10px] text-white font-medium truncate">
                            {item.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: INSPIRATION PRESETS */}
          {tab === 'presets' && (
            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              <p className="text-xs text-rose-200/70 mb-2">
                点击一键添加精心包装的艺术链接：
              </p>
              {PRESET_IDEAS.map((preset, idx) => (
                <div
                  key={idx}
                  onClick={() => handleAddPreset(preset)}
                  className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-rose-400/50 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={preset.thumbnail}
                      alt={preset.title}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-rose-200 transition-colors">
                        {preset.title}
                      </div>
                      <div className="text-xs text-rose-200/60 font-medium">
                        {preset.subtitle} • {preset.cardStyle}
                      </div>
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-rose-600/30 group-hover:bg-rose-600 text-white transition-colors">
                    <Plus className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
