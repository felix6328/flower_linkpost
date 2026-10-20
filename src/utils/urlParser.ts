import { BouquetItem, PlatformType, LinkType, FlowerType, CardStyle } from '../types/bouquet';

export function detectPlatform(url: string): { platform: PlatformType; type: LinkType; defaultTitle?: string; defaultStyle?: CardStyle } {
  try {
    const urlObj = new URL(url);
    const host = urlObj.hostname.toLowerCase();

    if (host.includes('spotify.com') || host.includes('music.apple.com')) {
      return { platform: host.includes('spotify.com') ? 'spotify' : 'apple-music', type: 'song', defaultTitle: '精选单曲', defaultStyle: 'vinyl' };
    }
    if (host.includes('youtube.com') || host.includes('youtu.be') || host.includes('bilibili.com')) {
      return { platform: host.includes('bilibili.com') ? 'bilibili' : 'youtube', type: 'video', defaultTitle: '精选视频', defaultStyle: 'cinema-film' };
    }
    if (host.includes('substack.com') || host.includes('medium.com')) {
      return { platform: 'substack', type: 'article', defaultTitle: '深度长文', defaultStyle: 'vintage-parchment' };
    }
    if (host.includes('github.com')) {
      return { platform: 'github', type: 'link', defaultTitle: 'GitHub 开源项目', defaultStyle: 'glass-bloom' };
    }
    return { platform: 'web', type: 'link', defaultTitle: '精选网页分享', defaultStyle: 'polaroid' };
  } catch {
    return { platform: 'web', type: 'link', defaultTitle: '分享链接', defaultStyle: 'polaroid' };
  }
}

export function getEmbedUrl(url: string, platform: PlatformType): string | null {
  try {
    const urlObj = new URL(url);
    if (platform === 'spotify') {
      const path = urlObj.pathname;
      return `https://open.spotify.com/embed${path}`;
    }
    if (platform === 'youtube') {
      let videoId = '';
      if (urlObj.hostname.includes('youtu.be')) {
        videoId = urlObj.pathname.slice(1);
      } else {
        videoId = urlObj.searchParams.get('v') || '';
      }
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      }
    }
    if (platform === 'bilibili') {
      const match = urlObj.pathname.match(/\/video\/(BV[a-zA-Z0-9]+)/);
      if (match && match[1]) {
        return `https://player.bilibili.com/player.html?bvid=${match[1]}&page=1&high_quality=1&as_wide=1`;
      }
    }
  } catch (e) {
    console.error('Error generating embed url', e);
  }
  return null;
}

export const FLOWER_OPTIONS: { type: FlowerType; label: string; emoji: string; color: string; desc: string }[] = [
  { type: 'lily', label: '圣洁白百合', emoji: '🌸', color: '#fff5f7', desc: '纯真与恒久' },
  { type: 'rose', label: '丝绒红玫瑰', emoji: '🌹', color: '#ff3b68', desc: '炽烈与深情' },
  { type: 'tulip', label: '落日郁金香', emoji: '🌷', color: '#ff7597', desc: '优雅与体贴' },
  { type: 'sunflower', label: '向日葵花盘', emoji: '🌻', color: '#ffb703', desc: '温暖与阳光' },
  { type: 'daisy', label: '白瓣雏菊', emoji: '🌼', color: '#ffffff', desc: '纯净的陪伴' },
  { type: 'lavender', label: '馥郁薰衣草', emoji: '🪻', color: '#c084fc', desc: '舒缓与思念' },
  { type: 'peony', label: '粉晕芍药', emoji: '🌺', color: '#fda4af', desc: '温柔与繁茂' },
];

export const CARD_STYLE_OPTIONS: { style: CardStyle; label: string; desc: string; icon: string }[] = [
  { style: 'vinyl', label: '黑胶唱片风', desc: '唱片滑出与音轨环形纹理', icon: '💿' },
  { style: 'polaroid', label: '拍立得压花风', desc: '复古胶片白边与手写签', icon: '📷' },
  { style: 'glass-bloom', label: '晶莹花房风', desc: '磨砂毛玻璃与金色花蔓', icon: '✨' },
  { style: 'cinema-film', label: '胶片放映风', desc: '电影齿孔与宽幅画面', icon: '🎞️' },
  { style: 'vintage-parchment', label: '复古羊皮纸风', desc: '自然纸质肌理与植物火漆', icon: '📜' },
];

export const COVER_PRESETS = [
  {
    category: '🎵 音乐律动',
    items: [
      { name: '黑胶唱针', url: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&auto=format&fit=crop&q=80' },
      { name: '落日钢琴', url: 'https://images.unsplash.com/photo-1520523839898-50712702213b?w=600&auto=format&fit=crop&q=80' },
      { name: '木吉他琴弦', url: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&auto=format&fit=crop&q=80' },
      { name: '爵士萨克斯', url: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&auto=format&fit=crop&q=80' },
    ]
  },
  {
    category: '📖 诗意与阅读',
    items: [
      { name: '午后咖啡与书', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80' },
      { name: '旧书店回廊', url: 'https://images.unsplash.com/photo-1507842229451-9f7506978e58?w=600&auto=format&fit=crop&q=80' },
      { name: '钢笔与信笺', url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80' },
      { name: '窗边雨滴', url: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600&auto=format&fit=crop&q=80' },
    ]
  },
  {
    category: '🌿 鲜花与自然',
    items: [
      { name: '法式花房晨露', url: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&auto=format&fit=crop&q=80' },
      { name: '野生洋甘菊', url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80' },
      { name: '林间斜阳', url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop&q=80' },
      { name: '玫瑰花束特写', url: 'https://images.unsplash.com/photo-1559563458-527698bf5295?w=600&auto=format&fit=crop&q=80' },
    ]
  },
  {
    category: '🎬 光影与电影',
    items: [
      { name: '落日胶片海浪', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80' },
      { name: '复古旁轴相机', url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80' },
      { name: '午夜霓虹街角', url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&auto=format&fit=crop&q=80' },
      { name: '星空银河', url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&auto=format&fit=crop&q=80' },
    ]
  }
];

export const INITIAL_BOUQUET_ITEMS: BouquetItem[] = [
  {
    id: 'demo-1',
    url: 'https://open.spotify.com/track/2plH4f5jX3v2vR',
    title: 'Alma',
    subtitle: 'Jonny Greenwood • Phantom Thread OST',
    description: '单曲循环了整个秋天的钢琴弦乐，听到最后一段总会想起你。',
    thumbnail: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&auto=format&fit=crop&q=80',
    type: 'song',
    platform: 'spotify',
    flowerType: 'lily',
    flowerColor: '#fff5f7',
    cardStyle: 'vinyl',
    personalNote: '从第 1 分 20 秒开始的大提琴极美',
  },
  {
    id: 'demo-2',
    url: 'https://blog.samaltman.com/moores-law-for-everything',
    title: "Moore's Law for Everything",
    subtitle: 'Sam Altman’s Manifest',
    description: '一篇彻底改变思考维度的未来宣言，每次迷茫时都会拿出来重读。',
    thumbnail: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80',
    type: 'article',
    platform: 'substack',
    flowerType: 'tulip',
    flowerColor: '#ff7597',
    cardStyle: 'vintage-parchment',
    personalNote: '一定要看第四小节关于未来的推论',
  },
  {
    id: 'demo-3',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'Rare Wine Tasting in Burgundy',
    subtitle: 'Bespoke Cellar Stories • YouTube',
    description: '探访勃艮第百年隐秘酒庄，那种对手工艺的执着特别治愈。',
    thumbnail: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&auto=format&fit=crop&q=80',
    type: 'video',
    platform: 'youtube',
    flowerType: 'rose',
    flowerColor: '#ff3b68',
    cardStyle: 'cinema-film',
    personalNote: '周末下雨天泡杯红茶看最合适不过',
  },
  {
    id: 'demo-4',
    url: 'https://bilibili.com',
    title: '深夜食堂里的那碗蛋包饭',
    subtitle: '治愈系美食短片',
    description: '生活再匆忙，也别忘了好好吃一顿热腾腾的晚饭。',
    thumbnail: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
    type: 'video',
    platform: 'bilibili',
    flowerType: 'sunflower',
    flowerColor: '#ffb703',
    cardStyle: 'polaroid',
    personalNote: '看饿了随时叫我，带你去吃',
  },
  {
    id: 'demo-5',
    url: 'https://github.com',
    title: 'The Art of Code & Heart',
    subtitle: 'Vibe Coding with Antigravity',
    description: '把零散的链接包成一束花，用浪漫的代码赠予特别的人。',
    thumbnail: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&auto=format&fit=crop&q=80',
    type: 'link',
    platform: 'github',
    flowerType: 'peony',
    flowerColor: '#fda4af',
    cardStyle: 'glass-bloom',
    personalNote: '送给你今天的一束数字花束 💐',
  },
];
