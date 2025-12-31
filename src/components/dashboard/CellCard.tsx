import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { LayerBadge } from '@/components/ui/LayerBadge';
import { KnowledgeCell } from '@/types/knowledgeCell';
import { cn } from '@/lib/utils';
import { ExternalLink, Zap, Clock, Activity } from 'lucide-react';

interface CellCardProps {
  cell: KnowledgeCell;
  index: number;
}

const typeIcons: Record<string, string> = {
  'Render3D': '🎨',
  'Render4D': '✨',
  'IA-ImmersiveFX': '🧠',
  'QuantumChannel': '⚛️',
  'SensorMultiFX': '🎵',
  'APIIntegration': '🔗',
  'Analytics': '📊',
  'UIControl': '🎮',
  'SpatialLogic': '🌐'
};

export function CellCard({ cell, index }: CellCardProps) {
  return (
    <GlassCard
      glow={cell.status === 'online' ? 'cyan' : cell.status === 'degraded' ? 'gold' : 'none'}
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{typeIcons[cell.type] || '📦'}</span>
          <div>
            <h3 className="font-orbitron font-semibold text-foreground group-hover:text-primary transition-colors">
              {cell.id}
            </h3>
            <p className="text-xs text-muted-foreground font-jetbrains">v{cell.version}</p>
          </div>
        </div>
        <StatusBadge status={cell.status} showLabel={false} />
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {cell.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <LayerBadge layer={cell.layer} />
        <span className="px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground font-jetbrains">
          {cell.type}
        </span>
      </div>

      {cell.metrics && (
        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border/50">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>Latencia</span>
            </div>
            <p className="font-jetbrains font-semibold text-sm text-foreground">{cell.metrics.latencyMs}ms</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <Zap className="w-3 h-3" />
              <span>RPS</span>
            </div>
            <p className="font-jetbrains font-semibold text-sm text-foreground">{cell.metrics.requestsPerSecond}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <Activity className="w-3 h-3" />
              <span>Uptime</span>
            </div>
            <p className="font-jetbrains font-semibold text-sm text-foreground">{cell.metrics.uptime}%</p>
          </div>
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </GlassCard>
  );
}
