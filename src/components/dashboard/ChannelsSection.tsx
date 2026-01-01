import { motion } from 'framer-motion';
import { Users, Video, Bell, Play, Radio, TrendingUp, Star, MoreVertical } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import channelThumb from '@/assets/channel-thumb-1.jpg';
import korimaCodex from '@/assets/korima-codex.jpg';

interface Channel {
  id: string;
  name: string;
  avatar: string;
  banner: string;
  subscribers: string;
  videos: number;
  isLive: boolean;
  category: string;
  description: string;
  verified: boolean;
}

const channels: Channel[] = [
  {
    id: '1',
    name: 'TAMV Studios',
    avatar: '🎬',
    banner: channelThumb,
    subscribers: '125K',
    videos: 342,
    isLive: true,
    category: 'Tecnología',
    description: 'Contenido oficial del ecosistema TAMV MD-X4',
    verified: true
  },
  {
    id: '2',
    name: 'Isabella AI Lab',
    avatar: '🤖',
    banner: korimaCodex,
    subscribers: '89K',
    videos: 156,
    isLive: false,
    category: 'Inteligencia Artificial',
    description: 'Explorando la conciencia digital ética',
    verified: true
  },
  {
    id: '3',
    name: 'DreamSpaces Creators',
    avatar: '🌌',
    banner: channelThumb,
    subscribers: '67K',
    videos: 234,
    isLive: true,
    category: 'XR/Metaverso',
    description: 'Creadores de mundos inmersivos',
    verified: true
  },
  {
    id: '4',
    name: 'KAOS Sound Lab',
    avatar: '🎧',
    banner: korimaCodex,
    subscribers: '45K',
    videos: 89,
    isLive: false,
    category: 'Audio Espacial',
    description: 'Experiencias sonoras 3D/4D',
    verified: false
  },
  {
    id: '5',
    name: 'Trueque Network',
    avatar: '💎',
    banner: channelThumb,
    subscribers: '34K',
    videos: 67,
    isLive: false,
    category: 'Economía',
    description: 'Economía P2P sin intermediarios',
    verified: true
  },
  {
    id: '6',
    name: 'Korima Archives',
    avatar: '📚',
    banner: korimaCodex,
    subscribers: '28K',
    videos: 45,
    isLive: false,
    category: 'Documentación',
    description: 'Memoria y explicabilidad del ecosistema',
    verified: true
  }
];

export function ChannelsSection() {
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
            Canales
          </h1>
          <p className="text-muted-foreground">
            Explora contenido de creadores verificados del ecosistema TAMV
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all flex items-center gap-2">
            <Radio className="w-4 h-4" />
            En Vivo
          </button>
          <button className="px-4 py-2 rounded-lg bg-muted/50 border border-border text-foreground font-medium hover:bg-muted transition-all flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Tendencias
          </button>
        </div>
      </motion.div>

      {/* Featured Live Channels */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="font-orbitron text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-2 h-6 bg-red-500 rounded-full animate-pulse" />
          En Vivo Ahora
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {channels.filter(c => c.isLive).map((channel, index) => (
            <LiveChannelCard key={channel.id} channel={channel} index={index} />
          ))}
        </div>
      </motion.section>

      {/* All Channels Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="font-orbitron text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-2 h-6 bg-gradient-to-b from-primary to-secondary rounded-full" />
          Todos los Canales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {channels.map((channel, index) => (
            <ChannelCard key={channel.id} channel={channel} index={index} />
          ))}
        </div>
      </motion.section>
    </div>
  );
}

function LiveChannelCard({ channel, index }: { channel: Channel; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <GlassCard className="overflow-hidden p-0" glow="purple">
        {/* Banner with Live Preview */}
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={channel.banner} 
            alt={channel.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          
          {/* Live Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full bg-red-500 text-white text-sm font-bold flex items-center gap-2 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-white" />
              EN VIVO
            </span>
            <span className="px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm text-foreground text-sm">
              1.2K viendo
            </span>
          </div>
          
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-20 h-20 rounded-full bg-red-500/80 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <Play className="w-10 h-10 text-white fill-current ml-1" />
            </div>
          </div>
          
          {/* Channel Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl ring-2 ring-primary/50">
              {channel.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-orbitron font-bold text-foreground">{channel.name}</h3>
                {channel.verified && (
                  <Star className="w-4 h-4 text-primary fill-primary" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">{channel.category}</p>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

function ChannelCard({ channel, index }: { channel: Channel; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      className="group cursor-pointer"
    >
      <GlassCard className="overflow-hidden" glow="cyan">
        {/* Banner */}
        <div className="relative h-24 -m-4 mb-4 overflow-hidden">
          <img 
            src={channel.banner} 
            alt={channel.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          
          {channel.isLive && (
            <span className="absolute top-2 right-2 px-2 py-1 rounded bg-red-500 text-white text-xs font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              LIVE
            </span>
          )}
        </div>
        
        {/* Avatar */}
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-3xl border-2 border-primary/30 -mt-10 relative z-10">
            {channel.avatar}
          </div>
          
          <div className="flex-1 min-w-0 -mt-2">
            <div className="flex items-center gap-2">
              <h3 className="font-orbitron font-semibold text-foreground truncate">{channel.name}</h3>
              {channel.verified && (
                <Star className="w-4 h-4 text-primary fill-primary flex-shrink-0" />
              )}
            </div>
            <p className="text-xs text-primary">{channel.category}</p>
          </div>
          
          <button className="p-1 rounded hover:bg-muted/50 transition-colors">
            <MoreVertical className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{channel.description}</p>
        
        {/* Stats */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center gap-1 text-sm">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-foreground font-medium">{channel.subscribers}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Video className="w-4 h-4 text-secondary" />
            <span className="text-muted-foreground">{channel.videos} videos</span>
          </div>
        </div>
        
        {/* Subscribe Button */}
        <button className="w-full mt-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-2">
          <Bell className="w-4 h-4" />
          Suscribirse
        </button>
      </GlassCard>
    </motion.div>
  );
}
