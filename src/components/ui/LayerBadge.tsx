import { cn } from '@/lib/utils';

interface LayerBadgeProps {
  layer: 'L0' | 'L1' | 'L2' | 'L3' | 'L4';
  showLabel?: boolean;
}

const layerConfig = {
  L0: { 
    label: 'Shell Mínimo', 
    bgClass: 'bg-emerald-500/20 border-emerald-500/30', 
    textClass: 'text-emerald-400' 
  },
  L1: { 
    label: 'Servicios Críticos', 
    bgClass: 'bg-cyan-500/20 border-cyan-500/30', 
    textClass: 'text-cyan-400' 
  },
  L2: { 
    label: 'XR Intensivo', 
    bgClass: 'bg-purple-500/20 border-purple-500/30', 
    textClass: 'text-purple-400' 
  },
  L3: { 
    label: 'Orquestación', 
    bgClass: 'bg-amber-500/20 border-amber-500/30', 
    textClass: 'text-amber-400' 
  },
  L4: { 
    label: 'Meta Gobernanza', 
    bgClass: 'bg-rose-500/20 border-rose-500/30', 
    textClass: 'text-rose-400' 
  }
};

export function LayerBadge({ layer, showLabel = false }: LayerBadgeProps) {
  const config = layerConfig[layer];

  return (
    <span 
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-orbitron font-medium',
        config.bgClass,
        config.textClass
      )}
    >
      {layer}
      {showLabel && <span className="font-inter font-normal opacity-80">· {config.label}</span>}
    </span>
  );
}
