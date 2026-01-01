import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Heart, Download, Share2, ZoomIn, X, Filter, Grid, LayoutGrid } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import dreamspaceHero from '@/assets/dreamspace-hero.jpg';
import korimaCodex from '@/assets/korima-codex.jpg';
import truequeHero from '@/assets/trueque-hero.jpg';
import kaosHero from '@/assets/kaos-audio-hero.jpg';
import isabellaAvatar from '@/assets/isabella-avatar.jpg';
import channelThumb from '@/assets/channel-thumb-1.jpg';
import groupThumb from '@/assets/group-thumb-1.jpg';
import heroTamv from '@/assets/hero-tamv.jpg';

interface GalleryItem {
  id: string;
  title: string;
  image: string;
  category: string;
  author: string;
  likes: number;
  downloads: number;
  isNFT?: boolean;
}

const galleryItems: GalleryItem[] = [
  { id: '1', title: 'DreamSpace Cyberpunk City', image: dreamspaceHero, category: 'XR Worlds', author: 'TAMV Studios', likes: 1245, downloads: 456, isNFT: true },
  { id: '2', title: 'Korima Codex Artifact', image: korimaCodex, category: 'Artifacts', author: 'Anubis V.', likes: 892, downloads: 234, isNFT: true },
  { id: '3', title: 'Trueque Marketplace Vista', image: truequeHero, category: 'Commerce', author: 'TradeGuild', likes: 567, downloads: 123 },
  { id: '4', title: 'KAOS Audio Visualizer', image: kaosHero, category: 'Audio Art', author: 'Sound Lab', likes: 734, downloads: 189, isNFT: true },
  { id: '5', title: 'Isabella Neural Portrait', image: isabellaAvatar, category: 'AI Art', author: 'Isabella AI', likes: 2345, downloads: 678, isNFT: true },
  { id: '6', title: 'Channel Stream Interface', image: channelThumb, category: 'UI Design', author: 'UX Team', likes: 456, downloads: 89 },
  { id: '7', title: 'Community Gathering', image: groupThumb, category: 'Social', author: 'Community', likes: 678, downloads: 156 },
  { id: '8', title: 'TAMV Hub Panorama', image: heroTamv, category: 'XR Worlds', author: 'TAMV Core', likes: 1567, downloads: 345, isNFT: true },
];

const categories = ['Todos', 'XR Worlds', 'Artifacts', 'AI Art', 'Audio Art', 'Commerce', 'UI Design', 'Social'];

export function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');

  const filteredItems = selectedCategory === 'Todos' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="font-orbitron text-2xl md:text-3xl font-bold gradient-text mb-2">
            Galería Visual
          </h1>
          <p className="text-muted-foreground">
            Arte digital, capturas XR y NFTs del ecosistema TAMV
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-muted/50 text-muted-foreground hover:bg-muted'}`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setViewMode('masonry')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'masonry' ? 'bg-primary text-primary-foreground' : 'bg-muted/50 text-muted-foreground hover:bg-muted'}`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-2"
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? 'bg-primary text-primary-foreground shadow-glow-cyan'
                : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border'
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* Gallery Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <GalleryCard 
              key={item.id} 
              item={item} 
              index={index} 
              onClick={() => setSelectedImage(item)}
              viewMode={viewMode}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <Lightbox item={selectedImage} onClose={() => setSelectedImage(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function GalleryCard({ 
  item, 
  index, 
  onClick,
  viewMode 
}: { 
  item: GalleryItem; 
  index: number; 
  onClick: () => void;
  viewMode: 'grid' | 'masonry';
}) {
  const heights = ['h-48', 'h-56', 'h-64', 'h-72'];
  const randomHeight = viewMode === 'masonry' ? heights[index % heights.length] : 'h-48';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <GlassCard className="overflow-hidden p-0" glow="cyan">
        {/* Image */}
        <div className={`relative ${randomHeight} overflow-hidden`}>
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {/* NFT Badge */}
          {item.isNFT && (
            <div className="absolute top-2 right-2">
              <span className="px-2 py-1 rounded bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold">
                NFT
              </span>
            </div>
          )}
          
          {/* Zoom Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center">
              <ZoomIn className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          
          {/* Category */}
          <div className="absolute bottom-2 left-2">
            <span className="px-2 py-1 rounded bg-background/80 backdrop-blur-sm text-foreground text-xs">
              {item.category}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-3">
          <h3 className="font-medium text-foreground text-sm truncate">{item.title}</h3>
          <p className="text-xs text-muted-foreground">por {item.author}</p>
          
          <div className="flex items-center gap-3 mt-2 pt-2 border-t border-border/50">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Heart className="w-3 h-3" />
              {item.likes}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Download className="w-3 h-3" />
              {item.downloads}
            </span>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

function Lightbox({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-xl p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-4xl w-full"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 rounded-full bg-muted/50 text-foreground hover:bg-muted transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <GlassCard className="overflow-hidden" glow="purple">
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full max-h-[60vh] object-contain"
          />
          
          <div className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-orbitron text-xl font-bold text-foreground">{item.title}</h2>
                <p className="text-muted-foreground">por {item.author}</p>
              </div>
              {item.isNFT && (
                <span className="px-3 py-1 rounded bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold">
                  NFT
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm">
                {item.category}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Heart className="w-4 h-4" />
                {item.likes}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Download className="w-4 h-4" />
                {item.downloads}
              </span>
            </div>
            
            <div className="flex gap-3">
              <button className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                <Heart className="w-4 h-4" />
                Me gusta
              </button>
              <button className="flex-1 py-2 rounded-lg bg-secondary/20 border border-secondary/30 text-secondary font-medium hover:bg-secondary hover:text-secondary-foreground transition-all flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Descargar
              </button>
              <button className="py-2 px-4 rounded-lg bg-muted/50 border border-border text-foreground hover:bg-muted transition-all">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}
