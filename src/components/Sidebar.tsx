import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit3, ChevronLeft, ChevronRight, Music, Video, FileText, Globe, Heart, Sparkles } from 'lucide-react';
import { BouquetConfig, BouquetItem } from '../types/bouquet';

interface SidebarProps {
  bouquet: BouquetConfig;
  onUpdateConfig: (partial: Partial<BouquetConfig>) => void;
  onOpenAddModal: () => void;
  onSelectCard: (item: BouquetItem) => void;
  onRemoveItem: (id: string) => void;
  onResetDemo: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  bouquet,
  onUpdateConfig,
  onOpenAddModal,
  onSelectCard,
  onRemoveItem,
  onResetDemo,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'spotify':
      case 'apple-music':
        return <Music className="w-3.5 h-3.5 text-emerald-400" />;
      case 'youtube':
      case 'bilibili':
        return <Video className="w-3.5 h-3.5 text-rose-400" />;
      case 'substack':
        return <FileText className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <Globe className="w-3.5 h-3.5 text-sky-400" />;
    }
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        type="button"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="fixed top-4 left-4 z-40 p-2.5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-white shadow-lg md:hidden"
      >
        {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
      </button>

      <motion.aside
        initial={false}
        animate={{
          x: isCollapsed ? -320 : 0,
          opacity: isCollapsed ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
        className="fixed md:static top-0 left-0 bottom-0 z-30 w-80 max-w-[85vw] h-full bg-[#1b0a10]/85 backdrop-blur-xl border-r border-white/10 flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Top Header & Branding */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-black font-serif tracking-tight text-white flex items-center gap-1.5">
              <span>LINK</span>
              <span className="text-rose-400 font-normal italic">BOUQUET</span>
              <span className="text-xl">💐</span>
            </h1>

            {/* Desktop collapse */}
            <button
              onClick={() => setIsCollapsed(true)}
              className="hidden md:flex p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              title="收起侧栏"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-rose-200/60 mt-1 font-serif">
            把喜欢的链接包成一束花送给 Ta
          </p>
        </div>

        {/* Sender & Recipient Tag */}
        <div className="p-4 mx-4 mt-4 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-rose-300 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-current text-rose-500" />
              <span>花束祝福信片</span>
            </span>
            <button
              onClick={() => setIsEditingNote(!isEditingNote)}
              className="text-rose-200/60 hover:text-white flex items-center gap-1 text-[11px]"
            >
              <Edit3 className="w-3 h-3" />
              <span>{isEditingNote ? '完成' : '编辑'}</span>
            </button>
          </div>

          {isEditingNote ? (
            <div className="space-y-2 pt-1">
              <input
                type="text"
                placeholder="收件人姓名 (如：小王)"
                value={bouquet.recipientName}
                onChange={(e) => onUpdateConfig({ recipientName: e.target.value })}
                className="w-full py-1.5 px-2.5 rounded-lg bg-black/40 border border-white/15 text-xs text-white"
              />
              <input
                type="text"
                placeholder="发件人署名 (如：阿明)"
                value={bouquet.senderName}
                onChange={(e) => onUpdateConfig({ senderName: e.target.value })}
                className="w-full py-1.5 px-2.5 rounded-lg bg-black/40 border border-white/15 text-xs text-white"
              />
              <textarea
                rows={2}
                placeholder="写下你想对 Ta 说的一句悄悄话..."
                value={bouquet.greetingMessage}
                onChange={(e) => onUpdateConfig({ greetingMessage: e.target.value })}
                className="w-full py-1.5 px-2.5 rounded-lg bg-black/40 border border-white/15 text-xs text-white resize-none"
              />
            </div>
          ) : (
            <div className="text-[11px] text-rose-100/90 leading-relaxed font-serif">
              <div><strong className="text-rose-300">致：</strong>{bouquet.recipientName || '特别的朋友'}</div>
              <div><strong className="text-rose-300">自：</strong>{bouquet.senderName || '你的好友'}</div>
              <p className="mt-1 text-rose-200/70 italic line-clamp-2">
                “{bouquet.greetingMessage}”
              </p>
            </div>
          )}
        </div>

        {/* Links in bouquet list */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
          <div className="flex items-center justify-between px-1 text-xs font-semibold text-rose-200/60">
            <span>花束中的内容 ({bouquet.items.length})</span>
            <button
              onClick={onResetDemo}
              className="text-[10px] text-rose-400 hover:text-rose-300 transition-colors"
            >
              恢复示例
            </button>
          </div>

          {bouquet.items.length === 0 ? (
            <div className="py-12 text-center text-xs text-rose-200/40">
              <p>花束还是空的</p>
              <p className="mt-1">点击下方按钮插入第一朵花吧 🌸</p>
            </div>
          ) : (
            bouquet.items.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => onSelectCard(item)}
                className="group relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-rose-400/30 cursor-pointer transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <span className="p-1.5 rounded-lg bg-black/40 flex-shrink-0">
                    {getPlatformIcon(item.platform)}
                  </span>
                  <div className="truncate">
                    <div className="text-xs font-medium text-white truncate">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-rose-200/50 truncate">
                      {item.subtitle || item.platform}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveItem(item.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-rose-600/30 text-rose-300 hover:text-rose-100 transition-all flex-shrink-0"
                  title="从花束中移除"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Bottom Add Link Button */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={onOpenAddModal}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-semibold text-xs shadow-lg shadow-rose-950 flex items-center justify-center gap-2 transition-all transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>添加链接到花束 (+ Add Link)</span>
          </button>
        </div>
      </motion.aside>

      {/* Floating expand pill when collapsed */}
      {isCollapsed && (
        <button
          onClick={() => setIsCollapsed(false)}
          className="fixed top-5 left-5 z-40 py-2 px-3.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white text-xs font-medium flex items-center gap-1.5 hover:bg-black/80 transition-all shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>展开链接清单 ({bouquet.items.length})</span>
          <ChevronRight className="w-3.5 h-3.5 ml-1" />
        </button>
      )}
    </>
  );
};
