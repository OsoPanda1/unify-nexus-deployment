import { motion } from 'framer-motion';
import { ShoppingBag, ArrowLeftRight, Shield, AlertTriangle, CheckCircle2, Clock, Package, Users } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { truequeCategories } from '@/data/mockData';

const mockOffers = [
  {
    id: '1',
    title: 'Experiencia XR Meditación',
    owner: 'ArtistaMaya',
    category: 'experiencias',
    value: 150,
    status: 'active',
    image: '🧘'
  },
  {
    id: '2',
    title: 'NFT Colección Ancestral',
    owner: 'CriptoArtist',
    category: 'digital',
    value: 200,
    status: 'escrow',
    image: '💎'
  },
  {
    id: '3',
    title: 'Consultoría Web3',
    owner: 'TechMentor',
    category: 'servicios',
    value: 300,
    status: 'active',
    image: '🛠️'
  },
  {
    id: '4',
    title: 'Escultura Cerámica',
    owner: 'Artesano3D',
    category: 'arte',
    value: 180,
    status: 'dispute',
    image: '🎨'
  }
];

export function TruequeSection() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-orbitron text-2xl md:text-3xl font-bold gradient-text mb-2">
          Trueque — Mercado P2P
        </h1>
        <p className="text-muted-foreground">
          Intercambio de valor con escrow, disputas y evidencia verificable
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Ofertas Activas', value: '1,247', icon: Package, color: 'cyan' },
          { label: 'Matches Hoy', value: '89', icon: ArrowLeftRight, color: 'purple' },
          { label: 'En Escrow', value: '34', icon: Shield, color: 'amber' },
          { label: 'Usuarios', value: '4,521', icon: Users, color: 'emerald' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index }}
          >
            <GlassCard glow={stat.color as any}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Categories */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="font-orbitron text-lg font-bold mb-4 flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-primary" />
          Categorías
        </h2>
        <div className="flex flex-wrap gap-3">
          {truequeCategories.map((category) => (
            <Button
              key={category.id}
              variant="outline"
              className="gap-2 hover:bg-primary/10 hover:border-primary/50"
            >
              <span>{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>
      </motion.section>

      {/* Active Offers */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="font-orbitron text-lg font-bold mb-4">Ofertas Recientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockOffers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <GlassCard 
                className="h-full cursor-pointer group" 
                glow={offer.status === 'dispute' ? 'gold' : 'cyan'}
              >
                <div className="flex items-start gap-4">
                  {/* Stand/Product Visual */}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    {offer.image}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {offer.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">@{offer.owner}</p>
                      </div>
                      <StatusBadge status={offer.status} />
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-lg font-bold text-primary">{offer.value} TAMV</span>
                      <Button size="sm" variant="outline" className="gap-1">
                        <ArrowLeftRight className="w-3 h-3" />
                        Proponer
                      </Button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Escrow Flow */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="font-orbitron text-lg font-bold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-amber-400" />
          Flujo de Escrow y Disputas
        </h2>
        <GlassCard glow="gold">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {[
              { step: 'Propuesta', icon: Package, desc: 'Crear oferta' },
              { step: 'Match', icon: ArrowLeftRight, desc: 'Doble confirmación' },
              { step: 'Escrow', icon: Shield, desc: 'Fondos bloqueados' },
              { step: 'Entrega', icon: CheckCircle2, desc: 'Verificación' },
              { step: 'Completado', icon: CheckCircle2, desc: 'Fondos liberados' }
            ].map((item, index) => (
              <div key={item.step} className="flex items-center gap-4">
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center mb-2">
                    <item.icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <span className="font-jetbrains text-xs text-foreground">{item.step}</span>
                  <span className="text-xs text-muted-foreground">{item.desc}</span>
                </motion.div>
                {index < 4 && (
                  <div className="hidden md:block w-8 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500" />
                )}
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.section>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const configs = {
    active: { color: 'emerald', icon: CheckCircle2, label: 'Activo' },
    escrow: { color: 'amber', icon: Shield, label: 'Escrow' },
    dispute: { color: 'red', icon: AlertTriangle, label: 'Disputa' },
    completed: { color: 'cyan', icon: CheckCircle2, label: 'Completado' }
  };

  const config = configs[status as keyof typeof configs] || configs.active;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
      ${config.color === 'emerald' ? 'bg-emerald-500/20 text-emerald-400' : ''}
      ${config.color === 'amber' ? 'bg-amber-500/20 text-amber-400' : ''}
      ${config.color === 'red' ? 'bg-red-500/20 text-red-400' : ''}
      ${config.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-400' : ''}
    `}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}
