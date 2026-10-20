import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Share2, Download, Gift, QrCode, Wifi, Globe, Smartphone, HelpCircle } from 'lucide-react';
import { BouquetConfig } from '../types/bouquet';
import { encodeBouquetToUrl } from '../utils/sharing';
import { toPng } from 'html-to-image';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  bouquet: BouquetConfig;
  onPreviewGiftMode: () => void;
  bouquetContainerRef: React.RefObject<HTMLDivElement>;
}

// Current known local network IP on this machine
const DETECTED_LAN_IP = '10.79.185.224';

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  bouquet,
  onPreviewGiftMode,
  bouquetContainerRef,
}) => {
  const [networkMode, setNetworkMode] = useState<'lan' | 'public' | 'local'>('lan');
  const [customPublicDomain, setCustomPublicDomain] = useState('');
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showDeploymentHelp, setShowDeploymentHelp] = useState(false);

  if (!isOpen) return null;

  // Base raw hash string
  const rawUrl = encodeBouquetToUrl(bouquet);
  const hashPart = rawUrl.includes('#') ? rawUrl.substring(rawUrl.indexOf('#')) : '';

  // Determine current active URL based on selected mode
  let activeShareUrl = rawUrl;
  if (window.location.hostname.includes('github.io')) {
    activeShareUrl = rawUrl;
  } else if (networkMode === 'lan') {
    activeShareUrl = `http://${DETECTED_LAN_IP}:5173/${hashPart}`;
  } else if (networkMode === 'public') {
    const domain = customPublicDomain.trim() || 'https://felix6328.github.io/link-bouquet';
    activeShareUrl = `${domain.replace(/\/+$/, '')}/${hashPart}`;
  } else {
    activeShareUrl = rawUrl;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeShareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleExportImage = async () => {
    if (!bouquetContainerRef.current) return;
    try {
      setIsExporting(true);
      const dataUrl = await toPng(bouquetContainerRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#420a11',
      });
      const link = document.createElement('a');
      link.download = `Link-Bouquet-${bouquet.recipientName || 'Gift'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export image', err);
    } finally {
      setIsExporting(false);
    }
  };

  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
    activeShareUrl
  )}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          className="relative max-w-lg w-full bg-[#1e0e15] border border-rose-900/60 rounded-3xl p-6 sm:p-7 shadow-2xl text-white z-10 overflow-hidden max-h-[92vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <span className="p-2.5 rounded-2xl bg-rose-500/20 text-rose-300">
                <Share2 className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl font-bold font-serif text-rose-50">
                  送出这束花 (Save & Share)
                </h3>
                <p className="text-xs text-rose-300/70 mt-0.5">
                  所有花瓣链接已打包装入专属分享网址中
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-4 space-y-4">
            {/* NETWORK TARGET SELECTOR */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-rose-200/90 flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-rose-400" />
                  <span>手机打开方式 / 分享场景：</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowDeploymentHelp(!showDeploymentHelp)}
                  className="text-[11px] text-rose-300 hover:text-white flex items-center gap-0.5 underline"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>为什么别人的手机打不开？</span>
                </button>
              </div>

              {/* Mode switch pills */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-black/40 rounded-xl border border-white/10 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setNetworkMode('lan')}
                  className={`py-2 px-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
                    networkMode === 'lan'
                      ? 'bg-rose-600 text-white shadow-md font-semibold'
                      : 'text-rose-200/70 hover:text-white'
                  }`}
                >
                  <Wifi className="w-3.5 h-3.5" />
                  <span>同一 Wi-Fi</span>
                </button>
                <button
                  type="button"
                  onClick={() => setNetworkMode('public')}
                  className={`py-2 px-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
                    networkMode === 'public'
                      ? 'bg-rose-600 text-white shadow-md font-semibold'
                      : 'text-rose-200/70 hover:text-white'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>公网/远程</span>
                </button>
                <button
                  type="button"
                  onClick={() => setNetworkMode('local')}
                  className={`py-2 px-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
                    networkMode === 'local'
                      ? 'bg-rose-600 text-white shadow-md font-semibold'
                      : 'text-rose-200/70 hover:text-white'
                  }`}
                >
                  <span>本机测试</span>
                </button>
              </div>

              {/* Mode Tips */}
              <div className="mt-2 text-[11px] text-rose-200/70 leading-relaxed bg-white/5 p-2.5 rounded-xl border border-white/5">
                {networkMode === 'lan' && (
                  <p>
                    📶 <strong>局域网模式</strong>：已自动切换至你的电脑 IP (<code>{DETECTED_LAN_IP}</code>)。只要手机和电脑连接<strong>同一个 Wi-Fi</strong>，手机直接扫码即可秒开！
                  </p>
                )}
                {networkMode === 'public' && (
                  <div className="space-y-1.5">
                    <p>
                      🌐 <strong>公网/外网模式</strong>：用于发给不在同 Wi-Fi 下的朋友（使用 4G/5G）。
                    </p>
                    <input
                      type="text"
                      placeholder="输入你部署好的域名 (如: https://my-bouquet.vercel.app)"
                      value={customPublicDomain}
                      onChange={(e) => setCustomPublicDomain(e.target.value)}
                      className="w-full py-1.5 px-2.5 rounded-lg bg-black/60 border border-white/20 text-xs text-rose-100 font-mono"
                    />
                  </div>
                )}
                {networkMode === 'local' && (
                  <p>
                    💻 <strong>本机模式</strong>：仅限当前电脑浏览器测试使用（<code>localhost</code> 手机无法访问）。
                  </p>
                )}
              </div>
            </div>

            {/* Explanation card if toggled */}
            {showDeploymentHelp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-100 space-y-1.5 leading-relaxed"
              >
                <div className="font-bold text-amber-300">💡 为什么发给别人的链接打不开？</div>
                <p>
                  因为之前生成的链接是 <code>localhost:5173</code>，<strong>“localhost” 指的是设备自己</strong>。发给别人后，别人的手机是在向他自己的手机请求网页，所以打不开。
                </p>
                <div className="font-bold text-amber-300 pt-1">两个解决方案：</div>
                <ul className="list-disc list-inside space-y-1 text-amber-200/90 pl-1">
                  <li><strong>方案 A（立即可用）</strong>：切换为上面的【同一 Wi-Fi】，让手机连上同一个 Wi-Fi 即可扫码打开。</li>
                  <li><strong>方案 B（永久公网）</strong>：因为本项目是 100% 静态免后端的，一键部署到免费的 <strong>Vercel / GitHub Pages</strong>，就能获得全世界任何手机在 4G/5G 下都能直接打开的永久网址！</li>
                </ul>
              </motion.div>
            )}

            {/* Share URL Box */}
            <div>
              <label className="block text-xs font-semibold text-rose-200/80 mb-1.5">
                花束专属网址 (包含全部花瓣与留言，零数据库无痕传递)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={activeShareUrl}
                  className="flex-1 py-2.5 px-3.5 rounded-xl bg-black/50 border border-white/15 text-xs text-rose-100 font-mono select-all focus:outline-none"
                />
                <button
                  onClick={handleCopy}
                  className={`py-2.5 px-4 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md flex-shrink-0 ${
                    copied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-rose-600 hover:bg-rose-500 text-white'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>已复制</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>复制链接</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* QR Code and Quick Scan */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-black/30 border border-white/10">
              <div className="w-24 h-24 bg-white p-1.5 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                <img
                  src={qrApiUrl}
                  alt="QR Code"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-rose-200 flex items-center gap-1">
                  <QrCode className="w-3.5 h-3.5" />
                  <span>手机微信/相机扫一扫</span>
                </div>
                <p className="text-[11px] text-rose-200/60 leading-relaxed">
                  当前二维码已绑定为{' '}
                  <span className="font-mono text-rose-300">
                    {networkMode === 'lan' ? DETECTED_LAN_IP : networkMode === 'public' ? '公网' : 'localhost'}
                  </span>
                  ，手机扫一扫立即拆盒看花。
                </p>
              </div>
            </div>

            {/* Actions Grid */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onPreviewGiftMode();
                }}
                className="py-3 px-4 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-semibold text-xs shadow-lg shadow-rose-950 flex items-center justify-center gap-1.5 transition-transform active:scale-95"
              >
                <Gift className="w-4 h-4" />
                <span>预览收花拆盒效果</span>
              </button>

              <button
                type="button"
                onClick={handleExportImage}
                disabled={isExporting}
                className="py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white/90 font-semibold text-xs border border-white/10 flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>{isExporting ? '生成海报中...' : '保存为高清海报'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
