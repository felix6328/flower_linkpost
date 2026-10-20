import React, { useState, useEffect, useRef } from 'react';
import { BouquetConfig, BouquetItem, BouquetTheme } from './types/bouquet';
import { INITIAL_BOUQUET_ITEMS } from './utils/urlParser';
import { decodeBouquetFromUrl } from './utils/sharing';
import { BouquetDisplay } from './components/BouquetDisplay';
import { CardPreviewModal } from './components/CardPreviewModal';
import { AddLinkModal } from './components/AddLinkModal';
import { ShareModal } from './components/ShareModal';
import { UnwrapExperience } from './components/UnwrapExperience';
import { Sidebar } from './components/Sidebar';
import { ThemeSelector, THEME_STYLES } from './components/ThemeSelector';
import { Plus, Share2, Sparkles, Gift } from 'lucide-react';

const DEFAULT_BOUQUET: BouquetConfig = {
  id: 'bouquet-initial',
  recipientName: '好友',
  senderName: 'Marc',
  title: 'Link Bouquet',
  greetingMessage: '平时想发给你的歌、视频和文章，全包进这束花里。慢慢看，慢慢听。',
  theme: 'wine-ruby',
  wrapperStyle: 'linen-cream',
  items: INITIAL_BOUQUET_ITEMS,
  createdAt: Date.now(),
};

export const App: React.FC = () => {
  const [bouquet, setBouquet] = useState<BouquetConfig>(DEFAULT_BOUQUET);
  const [isUnwrapped, setIsUnwrapped] = useState(true);
  const [selectedCard, setSelectedCard] = useState<BouquetItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const bouquetContainerRef = useRef<HTMLDivElement>(null);

  // Check URL on load for shared bouquet
  useEffect(() => {
    const shared = decodeBouquetFromUrl();
    if (shared) {
      setBouquet(shared);
      // Start in wrapped gift mode for the recipient!
      setIsUnwrapped(false);
    }
  }, []);

  const handleUpdateConfig = (partial: Partial<BouquetConfig>) => {
    setBouquet((prev) => ({ ...prev, ...partial }));
  };

  const handleAddItem = (item: BouquetItem) => {
    setBouquet((prev) => ({
      ...prev,
      items: [item, ...prev.items],
    }));
  };

  const handleRemoveItem = (id: string) => {
    setBouquet((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  const handleResetDemo = () => {
    setBouquet(DEFAULT_BOUQUET);
  };

  const currentThemeStyle = THEME_STYLES[bouquet.theme] || THEME_STYLES['wine-ruby'];

  return (
    <div
      className={`relative min-h-screen w-full flex bg-gradient-to-b ${currentThemeStyle.bg} transition-colors duration-700 overflow-x-hidden`}
    >
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* Left Sidebar */}
      <Sidebar
        bouquet={bouquet}
        onUpdateConfig={handleUpdateConfig}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onSelectCard={(item) => setSelectedCard(item)}
        onRemoveItem={handleRemoveItem}
        onResetDemo={handleResetDemo}
      />

      {/* Center Canvas / Bouquet Area */}
      <main className="flex-1 flex flex-col items-center justify-between min-h-screen p-4 sm:p-8 relative">
        {/* Top Header info (title / subtitle) */}
        <header className="w-full max-w-4xl flex items-center justify-between z-20 pt-2">
          <div className="hidden sm:block">
            <h2 className="text-sm font-semibold tracking-widest text-rose-200/70 uppercase">
              Digital Floral Gift • 数字链接花束
            </h2>
            <p className="text-xs text-rose-300/50 mt-0.5">
              悬停或点击卡片欣赏内容，点右下角将花束赠出
            </p>
          </div>

          {/* Quick Gift mode unbox test button */}
          <button
            onClick={() => setIsUnwrapped(false)}
            className="ml-auto py-2 px-3.5 rounded-full bg-white/10 hover:bg-white/20 text-rose-100 text-xs font-medium flex items-center gap-1.5 transition-all backdrop-blur-sm border border-white/10"
            title="以收礼人视角重新拆开花束"
          >
            <Gift className="w-3.5 h-3.5 text-rose-300" />
            <span>重新打包拆盒</span>
          </button>
        </header>

        {/* Centerpiece Flower Bouquet */}
        <div ref={bouquetContainerRef} className="w-full flex-1 flex items-center justify-center my-auto">
          <BouquetDisplay
            bouquet={bouquet}
            onSelectCard={(item) => setSelectedCard(item)}
            isUnwrapped={isUnwrapped}
          />
        </div>

        {/* Floating Bottom Action Dock */}
        <div className="fixed bottom-6 right-6 z-30 flex flex-wrap items-center gap-3">
          {/* Theme Palette */}
          <ThemeSelector
            currentTheme={bouquet.theme}
            onChangeTheme={(theme: BouquetTheme) => handleUpdateConfig({ theme })}
          />

          {/* Add Link Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="py-3 px-4.5 rounded-2xl bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/15 text-white font-semibold text-xs flex items-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4 text-rose-300" />
            <span className="hidden sm:inline">添加链接</span>
          </button>

          {/* Save & Share Button */}
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="py-3 px-5 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs shadow-xl shadow-rose-950 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all ring-2 ring-rose-400/30 animate-pulse-subtle"
          >
            <Share2 className="w-4 h-4" />
            <span>打包赠送 (Save & Share)</span>
          </button>
        </div>
      </main>

      {/* ===================== MODALS ===================== */}

      {/* Card Preview Modal */}
      <CardPreviewModal
        item={selectedCard}
        onClose={() => setSelectedCard(null)}
      />

      {/* Add Link Modal */}
      <AddLinkModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddItem}
      />

      {/* Share & Export Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        bouquet={bouquet}
        onPreviewGiftMode={() => setIsUnwrapped(false)}
        bouquetContainerRef={bouquetContainerRef}
      />

      {/* Receiver Unwrap Animation Screen */}
      <UnwrapExperience
        bouquet={bouquet}
        isOpen={isUnwrapped}
        onUnwrap={() => setIsUnwrapped(true)}
      />
    </div>
  );
};

export default App;
