import { motion } from 'framer-motion';
import { Play, Heart, MessageCircle, Share2, Eye, Clock, User } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import channelThumb from '@/assets/channel-thumb-1.jpg';

interface MediaItem {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
  channelAvatar: string;
  views: string;
  duration: string;
  likes: number;
  comments: number;
  isLive?: boolean;
  category: string;
}

const mediaItems: MediaItem[] = [
  {
    id: '1',
    title: 'DreamSpaces XR: Creación de Mundos Inmersivos',
    thumbnail: channelThumb,
    channel: 'TAMV Studios',
    channelAvatar: '🎬',
    views: '12.5K',
    duration: '24:35',
    likes: 892,
    comments: 156,
    isLive: false,
    category: 'Tutorial'
  },
  {
    id: '2',
    title: 'Isabella AI: Conciencia Digital en Acción',
    thumbnail: channelThumb,
    channel: 'Tech Visionaries',
    channelAvatar: '🤖',
    views: '8.2K',
    duration: '18:42',
    likes: 654,
    comments: 89,
    category: 'Documentário'
  },
  {
    id: '3',
    title: 'KAOS Audio 3D: Experiencia Sonora Espacial',
    thumbnail: channelThumb,
    channel: 'Sound Architects',
    channelAvatar: '🎧',
    views: '5.7K',
    duration: '32:15',
    likes: 445,
    comments: 67,
    isLive: true,
    category: 'Live'
  },
  {
    id: '4',
    title: 'Trueque P2P: Economía del Futuro',
    thumbnail: channelThumb,
    channel: 'Crypto Economics',
    channelAvatar: '💎',
    views: '15.3K',
    duration: '45:00',
    likes: 1245,
    comments: 234,
    category: 'Finanzas'
  },
  {
    id: '5',
    title: 'BookPI: Auditoría Descentralizada',
    thumbnail: channelThumb,
    channel: 'Blockchain Daily',
    channelAvatar: '📚',
    views: '3.8K',
    duration: '28:10',
    likes: 312,
    comments: 45,
    category: 'Tecnología'
  },
  {
    id: '6',
    title: 'Dekateotl: Los 11 Guardrails Éticos',
    thumbnail: channelThumb,
    channel: 'Ethics in Tech',
    channelAvatar: '⚖️',
    views: '6.1K',
    duration: '15:55',
    likes: 523,
    comments: 78,
    category: 'Ética'
  }
];

export function MediaFeed() {
  return (
    <div className="space-y-6">
      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mediaItems.map((item, index) => (
          <MediaCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}

function MediaCard({ item, index }: { item: MediaItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="group cursor-pointer"
    >
      <GlassCard className="overflow-hidden p-0" glow="cyan">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={item.thumbnail} 
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
          
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-16 h-16 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center shadow-glow-cyan">
              <Play className="w-8 h-8 text-primary-foreground fill-current ml-1" />
            </div>
          </div>
          
          {/* Duration / Live Badge */}
          <div className="absolute bottom-2 right-2">
            {item.isLive ? (
              <span className="px-2 py-1 rounded bg-red-500 text-white text-xs font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                EN VIVO
              </span>
            ) : (
              <span className="px-2 py-1 rounded bg-background/80 backdrop-blur-sm text-foreground text-xs font-jetbrains">
                {item.duration}
              </span>
            )}
          </div>
          
          {/* Category */}
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 rounded bg-primary/80 backdrop-blur-sm text-primary-foreground text-xs font-medium">
              {item.category}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          
          {/* Channel Info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-lg">
              {item.channelAvatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground font-medium truncate">{item.channel}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {item.views}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  hace 2h
                </span>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
              <Heart className="w-4 h-4" />
              <span className="text-xs">{item.likes}</span>
            </button>
            <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs">{item.comments}</span>
            </button>
            <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
              <Share2 className="w-4 h-4" />
              <span className="text-xs">Compartir</span>
            </button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
