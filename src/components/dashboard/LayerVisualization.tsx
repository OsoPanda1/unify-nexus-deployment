import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { layerDescriptions } from '@/data/mockData';
import { SystemModule } from '@/types/knowledgeCell';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/lib/utils';

interface LayerVisualizationProps {
  modules: SystemModule[];
}

const layerOrder: Array<'L0' | 'L1' | 'L2' | 'L3' | 'L4'> = ['L4', 'L3', 'L2', 'L1', 'L0'];

const layerStyles = {
  L0: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/30',
  L1: 'from-cyan-500/20 to-cyan-600/5 border-cyan-500/30',
  L2: 'from-purple-500/20 to-purple-600/5 border-purple-500/30',
  L3: 'from-amber-500/20 to-amber-600/5 border-amber-500/30',
  L4: 'from-rose-500/20 to-rose-600/5 border-rose-500/30'
};

const layerTextStyles = {
  L0: 'text-emerald-400',
  L1: 'text-cyan-400',
  L2: 'text-purple-400',
  L3: 'text-amber-400',
  L4: 'text-rose-400'
};

export function LayerVisualization({ modules }: LayerVisualizationProps) {
  const modulesByLayer = layerOrder.reduce((acc, layer) => {
    acc[layer] = modules.filter(m => m.layer === layer);
    return acc;
  }, {} as Record<string, SystemModule[]>);

  return (
    <div className="space-y-4">
      {layerOrder.map((layer, layerIndex) => {
        const layerModules = modulesByLayer[layer];
        const layerInfo = layerDescriptions[layer];

        return (
          <motion.div
            key={layer}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: layerIndex * 0.1 }}
          >
            <GlassCard 
              className={cn(
                'relative overflow-hidden border',
                layerStyles[layer]
              )}
              hover={false}
            >
              {/* Layer gradient background */}
              <div className={cn(
                'absolute inset-0 bg-gradient-to-r pointer-events-none',
                layerStyles[layer]
              )} />

              <div className="relative">
                {/* Layer header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      'font-orbitron font-bold text-xl',
                      layerTextStyles[layer]
                    )}>
                      {layer}
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground">{layerInfo.name}</h3>
                      <p className="text-xs text-muted-foreground">{layerInfo.description}</p>
                    </div>
                  </div>
                  <span className={cn(
                    'text-sm font-jetbrains',
                    layerTextStyles[layer]
                  )}>
                    {layerModules.length} módulos
                  </span>
                </div>

                {/* Modules grid */}
                {layerModules.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-4">
                    {layerModules.map((module, i) => (
                      <motion.div
                        key={module.id}
                        className="p-3 rounded-lg bg-background/50 border border-border/30 hover:border-border transition-colors"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: layerIndex * 0.1 + i * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-xs font-jetbrains text-muted-foreground">{module.id}</span>
                          <StatusBadge status={module.status} size="sm" showLabel={false} />
                        </div>
                        <h4 className="font-medium text-sm text-foreground">{module.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{module.description}</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </GlassCard>
          </motion.div>
        );
      })}
    </div>
  );
}
