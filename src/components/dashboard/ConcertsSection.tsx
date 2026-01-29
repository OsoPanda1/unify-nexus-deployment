import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Users, 
  Ticket, 
  Play, 
  Radio,
  Sparkles,
  Music
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Concert {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  organizerName: string;
  dreamspaceName: string;
  kaosPreset: string;
  ticketPrice: number;
  capacity: number;
  attendeesCount: number;
  status: 'live' | 'scheduled' | 'ended';
  startsAt: string;
}

const mockConcerts: Concert[] = [
  {
    id: '1',
    title: 'Noche de Obsidiana',
    description: 'Concierto sensorial inmersivo con visuales 4D y audio espacial',
    thumbnailUrl: '/src/assets/kaos-audio-hero.jpg',
    organizerName: 'KAOS Audio Lab',
    dreamspaceName: 'Templo de Obsidiana',
    kaosPreset: 'Deep Immersion',
    ticketPrice: 50,
    capacity: 500,
    attendeesCount: 423,
    status: 'live',
    startsAt: 'Ahora'
  },
  {
    id: '2',
    title: 'Aurora Cuántica',
    description: 'Experiencia audiovisual basada en fenómenos cuánticos',
    thumbnailUrl: '/src/assets/dreamspace-hero.jpg',
    organizerName: 'Quantum Sounds',
    dreamspaceName: 'Nebula VR',
    kaosPreset: 'Cosmic Flow',
    ticketPrice: 75,
    capacity: 1000,
    attendeesCount: 234,
    status: 'scheduled',
    startsAt: 'Mañana 21:00'
  },
  {
    id: '3',
    title: 'Ritual Digital',
    description: 'Fusión de música ancestral con tecnología futurista',
    thumbnailUrl: '/src/assets/trueque-hero.jpg',
    organizerName: 'Ancestral Tech',
    dreamspaceName: 'Pirámide Solar',
    kaosPreset: 'Ritual Mode',
    ticketPrice: 100,
    capacity: 300,
    attendeesCount: 0,
    status: 'scheduled',
    startsAt: 'Sábado 20:00'
  }
];

export function ConcertsSection() {
  const getStatusBadge = (status: Concert['status']) => {
    switch (status) {
      case 'live':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/50 gap-1"><Radio className="w-3 h-3 animate-pulse" /> EN VIVO</Badge>;
      case 'scheduled':
        return <Badge variant="outline" className="gap-1"><Calendar className="w-3 h-3" /> Próximamente</Badge>;
      case 'ended':
        return <Badge variant="secondary">Finalizado</Badge>;
    }
  };

  const liveConcert = mockConcerts.find(c => c.status === 'live');
  const upcomingConcerts = mockConcerts.filter(c => c.status === 'scheduled');

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-orbitron text-2xl md:text-3xl font-bold gradient-text mb-2">
          Conciertos Sensoriales
        </h1>
        <p className="text-muted-foreground">
          Experiencias XR inmersivas con DreamSpaces y KAOS Audio
        </p>
      </motion.div>

      {/* Live Now */}
      {liveConcert && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard className="overflow-hidden" glow="purple">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 relative">
                <img 
                  src={liveConcert.thumbnailUrl} 
                  alt={liveConcert.title}
                  className="w-full h-64 lg:h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  {getStatusBadge(liveConcert.status)}
                </div>
              </div>
              <div className="lg:w-1/2 p-6 flex flex-col justify-between">
                <div>
                  <h2 className="font-orbitron text-2xl font-bold mb-2">{liveConcert.title}</h2>
                  <p className="text-muted-foreground mb-4">{liveConcert.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span>{liveConcert.dreamspaceName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Music className="w-4 h-4 text-primary" />
                      <span>{liveConcert.kaosPreset}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{liveConcert.attendeesCount} / {liveConcert.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Ticket className="w-4 h-4 text-primary" />
                      <span>{liveConcert.ticketPrice} QS</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Capacidad</span>
                      <span>{Math.round((liveConcert.attendeesCount / liveConcert.capacity) * 100)}%</span>
                    </div>
                    <Progress value={(liveConcert.attendeesCount / liveConcert.capacity) * 100} />
                  </div>
                </div>

                <Button className="gap-2 w-full shadow-glow-purple">
                  <Play className="w-5 h-5" />
                  Unirse Ahora
                </Button>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* Upcoming */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="font-orbitron text-xl font-bold mb-4 flex items-center gap-2">
          <span className="w-2 h-8 bg-gradient-to-b from-primary to-secondary rounded-full" />
          Próximos Eventos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingConcerts.map((concert, index) => (
            <GlassCard key={concert.id} className="overflow-hidden">
              <div className="relative h-40">
                <img 
                  src={concert.thumbnailUrl} 
                  alt={concert.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <div className="absolute top-3 left-3">
                  {getStatusBadge(concert.status)}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-orbitron font-bold text-lg mb-1">{concert.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{concert.organizerName}</p>
                
                <div className="flex flex-wrap gap-3 mb-4 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {concert.startsAt}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Ticket className="w-4 h-4" />
                    {concert.ticketPrice} QS
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Reservar Entrada
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
