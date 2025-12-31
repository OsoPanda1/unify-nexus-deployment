import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'online' | 'offline' | 'degraded' | 'maintenance' | 'active' | 'syncing';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const statusConfig = {
  online: { label: 'Online', color: 'bg-emerald-500', glow: 'shadow-[0_0_10px_hsl(160_80%_45%)]' },
  active: { label: 'Activo', color: 'bg-emerald-500', glow: 'shadow-[0_0_10px_hsl(160_80%_45%)]' },
  offline: { label: 'Offline', color: 'bg-red-500', glow: 'shadow-[0_0_10px_hsl(0_85%_55%)]' },
  degraded: { label: 'Degradado', color: 'bg-amber-500', glow: 'shadow-[0_0_10px_hsl(45_100%_55%)]' },
  maintenance: { label: 'Mantenimiento', color: 'bg-blue-500', glow: 'shadow-[0_0_10px_hsl(210_100%_55%)]' },
  syncing: { label: 'Sincronizando', color: 'bg-purple-500', glow: 'shadow-[0_0_10px_hsl(270_80%_55%)]' }
};

const sizeConfig = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4'
};

export function StatusBadge({ status, size = 'md', showLabel = true }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-2">
      <span 
        className={cn(
          'rounded-full animate-pulse',
          sizeConfig[size],
          config.color,
          config.glow
        )}
      />
      {showLabel && (
        <span className="text-sm text-muted-foreground font-jetbrains">
          {config.label}
        </span>
      )}
    </div>
  );
}
