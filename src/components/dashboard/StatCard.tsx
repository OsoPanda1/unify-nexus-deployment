import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  glow?: 'cyan' | 'purple' | 'gold' | 'none';
  delay?: number;
}

export function StatCard({ 
  title, 
  value, 
  subtitle,
  icon, 
  trend = 'neutral',
  trendValue,
  glow = 'cyan',
  delay = 0 
}: StatCardProps) {
  const trendConfig = {
    up: { icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    down: { icon: TrendingDown, color: 'text-red-400', bg: 'bg-red-500/10' },
    neutral: { icon: Minus, color: 'text-muted-foreground', bg: 'bg-muted' }
  };

  const TrendIcon = trendConfig[trend].icon;

  return (
    <GlassCard 
      glow={glow}
      className="relative overflow-hidden"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay }}
    >
      {/* Background decoration */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/5 blur-2xl" />
      
      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <motion.p 
            className="text-3xl font-orbitron font-bold mt-2 gradient-text"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
          >
            {value}
          </motion.p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1 font-jetbrains">{subtitle}</p>
          )}
          
          {trendValue && (
            <div className={cn(
              "inline-flex items-center gap-1 mt-3 px-2 py-1 rounded-full text-xs",
              trendConfig[trend].bg,
              trendConfig[trend].color
            )}>
              <TrendIcon className="w-3 h-3" />
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        
        <div className={cn(
          "p-3 rounded-xl",
          glow === 'cyan' && "bg-primary/10 text-primary",
          glow === 'purple' && "bg-secondary/10 text-secondary",
          glow === 'gold' && "bg-accent/10 text-accent"
        )}>
          {icon}
        </div>
      </div>
    </GlassCard>
  );
}
