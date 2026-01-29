import { motion } from 'framer-motion';
import { 
  GitBranch, 
  Link2, 
  Zap, 
  Plus,
  ArrowRight,
  Network
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LayerBadge } from '@/components/ui/LayerBadge';

interface KnowledgeBridge {
  id: string;
  title: string;
  description: string;
  sourceCell: {
    name: string;
    layer: string;
  };
  targetCell: {
    name: string;
    layer: string;
  };
  bridgeType: 'bidirectional' | 'unidirectional';
  strength: number;
  createdBy: string;
}

const mockBridges: KnowledgeBridge[] = [
  {
    id: '1',
    title: 'Isabella ↔ DreamSpaces',
    description: 'Integración de IA para recomendaciones de espacios virtuales',
    sourceCell: { name: 'Isabella Core', layer: 'L2' },
    targetCell: { name: 'DreamSpace Engine', layer: 'L2' },
    bridgeType: 'bidirectional',
    strength: 0.95,
    createdBy: 'Sistema'
  },
  {
    id: '2',
    title: 'BookPI → Certificates',
    description: 'Anclaje de evidencias para certificaciones UTAMV',
    sourceCell: { name: 'BookPI Ledger', layer: 'L1' },
    targetCell: { name: 'Certificate Service', layer: 'L2' },
    bridgeType: 'unidirectional',
    strength: 1.0,
    createdBy: 'Sistema'
  },
  {
    id: '3',
    title: 'KAOS Audio ↔ Concerts',
    description: 'Presets de audio para conciertos sensoriales',
    sourceCell: { name: 'KAOS Engine', layer: 'L2' },
    targetCell: { name: 'Concert Service', layer: 'L3' },
    bridgeType: 'bidirectional',
    strength: 0.88,
    createdBy: 'KAOS Lab'
  },
  {
    id: '4',
    title: 'Trueque → Wallet',
    description: 'Procesamiento de transacciones de intercambio',
    sourceCell: { name: 'Trueque Engine', layer: 'L2' },
    targetCell: { name: 'Wallet Service', layer: 'L1' },
    bridgeType: 'unidirectional',
    strength: 0.92,
    createdBy: 'Sistema'
  }
];

export function KnowledgeBridgesSection() {
  const getStrengthColor = (strength: number) => {
    if (strength >= 0.9) return 'text-emerald-400';
    if (strength >= 0.7) return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-orbitron text-2xl md:text-3xl font-bold gradient-text mb-2">
          Puentes de Conocimiento
        </h1>
        <p className="text-muted-foreground">
          Conexiones entre KnowledgeCells que forman el grafo TAMV
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <GlassCard className="text-center p-4">
          <GitBranch className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="font-orbitron text-2xl font-bold">{mockBridges.length}</div>
          <div className="text-sm text-muted-foreground">Puentes Activos</div>
        </GlassCard>
        <GlassCard className="text-center p-4">
          <Link2 className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="font-orbitron text-2xl font-bold">14</div>
          <div className="text-sm text-muted-foreground">Cells Conectadas</div>
        </GlassCard>
        <GlassCard className="text-center p-4">
          <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="font-orbitron text-2xl font-bold">93%</div>
          <div className="text-sm text-muted-foreground">Fuerza Promedio</div>
        </GlassCard>
        <GlassCard className="text-center p-4">
          <Network className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="font-orbitron text-2xl font-bold">5</div>
          <div className="text-sm text-muted-foreground">Capas Integradas</div>
        </GlassCard>
      </motion.div>

      {/* Graph Visualization Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <GlassCard className="p-8" glow="cyan">
          <div className="text-center mb-6">
            <h3 className="font-orbitron font-bold text-lg mb-2">Visualización del Grafo</h3>
            <p className="text-sm text-muted-foreground">Representación interactiva de las conexiones</p>
          </div>
          
          {/* Simple visual representation */}
          <div className="relative h-64 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Center node */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 border-2 border-primary flex items-center justify-center z-10">
                <span className="font-orbitron text-xs font-bold">CORE</span>
              </div>
              
              {/* Orbiting nodes */}
              {['Isabella', 'BookPI', 'KAOS', 'Trueque'].map((name, index) => {
                const angle = (index * 90) * (Math.PI / 180);
                const radius = 100;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                  <div
                    key={name}
                    className="absolute w-14 h-14 rounded-full bg-muted/50 border border-border flex items-center justify-center"
                    style={{
                      transform: `translate(${x}px, ${y}px)`
                    }}
                  >
                    <span className="text-xs font-medium">{name}</span>
                  </div>
                );
              })}
              
              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {[0, 1, 2, 3].map((index) => {
                  const angle = (index * 90) * (Math.PI / 180);
                  const radius = 100;
                  const x = 50 + (Math.cos(angle) * radius / 2);
                  const y = 50 + (Math.sin(angle) * radius / 2);
                  
                  return (
                    <line
                      key={index}
                      x1="50%"
                      y1="50%"
                      x2={`${x}%`}
                      y2={`${y}%`}
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-primary/40"
                    />
                  );
                })}
              </svg>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Bridge List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-orbitron text-xl font-bold flex items-center gap-2">
            <span className="w-2 h-8 bg-gradient-to-b from-primary to-secondary rounded-full" />
            Puentes Registrados
          </h2>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Crear Puente
          </Button>
        </div>

        <div className="space-y-4">
          {mockBridges.map((bridge, index) => (
            <GlassCard key={bridge.id}>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Source */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{bridge.sourceCell.name}</span>
                    <LayerBadge layer={bridge.sourceCell.layer as any} />
                  </div>
                </div>

                {/* Bridge indicator */}
                <div className="flex items-center gap-2 px-4">
                  {bridge.bridgeType === 'bidirectional' ? (
                    <>
                      <ArrowRight className="w-4 h-4 text-primary" />
                      <ArrowRight className="w-4 h-4 text-primary rotate-180" />
                    </>
                  ) : (
                    <ArrowRight className="w-4 h-4 text-primary" />
                  )}
                </div>

                {/* Target */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{bridge.targetCell.name}</span>
                    <LayerBadge layer={bridge.targetCell.layer as any} />
                  </div>
                </div>

                {/* Strength */}
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className={`font-orbitron font-bold ${getStrengthColor(bridge.strength)}`}>
                      {Math.round(bridge.strength * 100)}%
                    </div>
                    <div className="text-xs text-muted-foreground">Fuerza</div>
                  </div>
                  <Badge variant="outline">
                    {bridge.bridgeType === 'bidirectional' ? 'Bidireccional' : 'Unidireccional'}
                  </Badge>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border/50">
                <p className="text-sm text-muted-foreground">{bridge.description}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
