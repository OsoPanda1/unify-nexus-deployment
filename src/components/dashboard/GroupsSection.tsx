import { motion } from 'framer-motion';
import { Users, MessageSquare, Lock, Globe, UserPlus, Calendar, Activity, Shield } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import groupThumb from '@/assets/group-thumb-1.jpg';
import dreamspaceHero from '@/assets/dreamspace-hero.jpg';

interface Group {
  id: string;
  name: string;
  avatar: string;
  banner: string;
  members: string;
  posts: number;
  isPrivate: boolean;
  category: string;
  description: string;
  lastActivity: string;
  admins: string[];
}

const groups: Group[] = [
  {
    id: '1',
    name: 'TAMV Builders',
    avatar: '🏗️',
    banner: dreamspaceHero,
    members: '8.5K',
    posts: 1234,
    isPrivate: false,
    category: 'Desarrollo',
    description: 'Comunidad de desarrolladores construyendo el ecosistema TAMV',
    lastActivity: 'Hace 2 min',
    admins: ['Anubis V.', 'Isabella AI']
  },
  {
    id: '2',
    name: 'XR Creators Guild',
    avatar: '🎮',
    banner: groupThumb,
    members: '5.2K',
    posts: 892,
    isPrivate: false,
    category: 'Creadores',
    description: 'Creadores de experiencias XR/VR/AR para DreamSpaces',
    lastActivity: 'Hace 15 min',
    admins: ['DreamTeam']
  },
  {
    id: '3',
    name: 'IA Ética & Gobernanza',
    avatar: '⚖️',
    banner: dreamspaceHero,
    members: '3.1K',
    posts: 456,
    isPrivate: true,
    category: 'Gobernanza',
    description: 'Discusiones sobre EOCT, Dekateotl y ética en IA',
    lastActivity: 'Hace 1h',
    admins: ['Isabella AI', 'Ethics Board']
  },
  {
    id: '4',
    name: 'Quantum Pioneers',
    avatar: '⚛️',
    banner: groupThumb,
    members: '1.8K',
    posts: 234,
    isPrivate: true,
    category: 'Investigación',
    description: 'Investigación en computación cuántica y criptografía PQC',
    lastActivity: 'Hace 3h',
    admins: ['Quantum Lab']
  },
  {
    id: '5',
    name: 'Trueque Masters',
    avatar: '💎',
    banner: dreamspaceHero,
    members: '12.3K',
    posts: 2567,
    isPrivate: false,
    category: 'Comercio',
    description: 'Intercambios P2P, estrategias y mejores ofertas',
    lastActivity: 'Hace 5 min',
    admins: ['TradeGuild']
  },
  {
    id: '6',
    name: 'KAOS Sound Engineers',
    avatar: '🎵',
    banner: groupThumb,
    members: '2.7K',
    posts: 678,
    isPrivate: false,
    category: 'Audio',
    description: 'Ingenieros de audio espacial 3D/4D y presets KAOS',
    lastActivity: 'Hace 30 min',
    admins: ['Sound Lab']
  }
];

export function GroupsSection() {
  const publicGroups = groups.filter(g => !g.isPrivate);
  const privateGroups = groups.filter(g => g.isPrivate);

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
            Grupos & Comunidades
          </h1>
          <p className="text-muted-foreground">
            Conéctate con comunidades especializadas del ecosistema TAMV
          </p>
        </div>
        <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all flex items-center gap-2 self-start">
          <UserPlus className="w-4 h-4" />
          Crear Grupo
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <GlassCard className="text-center" glow="cyan">
          <Users className="w-8 h-8 text-primary mx-auto mb-2" />
          <p className="text-2xl font-orbitron font-bold text-foreground">33.6K</p>
          <p className="text-xs text-muted-foreground">Miembros Totales</p>
        </GlassCard>
        <GlassCard className="text-center" glow="purple">
          <MessageSquare className="w-8 h-8 text-secondary mx-auto mb-2" />
          <p className="text-2xl font-orbitron font-bold text-foreground">6.0K</p>
          <p className="text-xs text-muted-foreground">Posts Hoy</p>
        </GlassCard>
        <GlassCard className="text-center" glow="gold">
          <Activity className="w-8 h-8 text-accent mx-auto mb-2" />
          <p className="text-2xl font-orbitron font-bold text-foreground">98%</p>
          <p className="text-xs text-muted-foreground">Actividad</p>
        </GlassCard>
        <GlassCard className="text-center" glow="cyan">
          <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
          <p className="text-2xl font-orbitron font-bold text-foreground">{groups.length}</p>
          <p className="text-xs text-muted-foreground">Grupos Activos</p>
        </GlassCard>
      </motion.div>

      {/* Public Groups */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="font-orbitron text-lg font-bold mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary" />
          Grupos Públicos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {publicGroups.map((group, index) => (
            <GroupCard key={group.id} group={group} index={index} />
          ))}
        </div>
      </motion.section>

      {/* Private Groups */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="font-orbitron text-lg font-bold mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5 text-secondary" />
          Grupos Privados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {privateGroups.map((group, index) => (
            <GroupCard key={group.id} group={group} index={index} />
          ))}
        </div>
      </motion.section>
    </div>
  );
}

function GroupCard({ group, index }: { group: Group; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="group cursor-pointer"
    >
      <GlassCard className="overflow-hidden" glow={group.isPrivate ? 'purple' : 'cyan'}>
        {/* Banner */}
        <div className="relative h-28 -m-4 mb-4 overflow-hidden">
          <img 
            src={group.banner} 
            alt={group.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          
          {/* Privacy Badge */}
          <div className="absolute top-3 right-3">
            {group.isPrivate ? (
              <span className="px-2 py-1 rounded bg-secondary/80 backdrop-blur-sm text-secondary-foreground text-xs font-medium flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Privado
              </span>
            ) : (
              <span className="px-2 py-1 rounded bg-primary/80 backdrop-blur-sm text-primary-foreground text-xs font-medium flex items-center gap-1">
                <Globe className="w-3 h-3" />
                Público
              </span>
            )}
          </div>
        </div>
        
        {/* Avatar & Info */}
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-2xl border border-primary/30 -mt-10 relative z-10">
            {group.avatar}
          </div>
          
          <div className="flex-1 min-w-0 -mt-2">
            <h3 className="font-orbitron font-semibold text-foreground truncate">{group.name}</h3>
            <p className="text-xs text-primary">{group.category}</p>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{group.description}</p>
        
        {/* Stats */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center gap-1 text-sm">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-foreground font-medium">{group.members}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <MessageSquare className="w-4 h-4 text-secondary" />
            <span className="text-muted-foreground">{group.posts} posts</span>
          </div>
          <div className="flex items-center gap-1 text-sm ml-auto">
            <Calendar className="w-4 h-4 text-accent" />
            <span className="text-xs text-muted-foreground">{group.lastActivity}</span>
          </div>
        </div>
        
        {/* Join Button */}
        <button className="w-full mt-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-2">
          <UserPlus className="w-4 h-4" />
          {group.isPrivate ? 'Solicitar Acceso' : 'Unirse'}
        </button>
      </GlassCard>
    </motion.div>
  );
}
