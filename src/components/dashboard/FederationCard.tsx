import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { FederationDomain } from '@/types/knowledgeCell';
import { Globe, Shield, Database, Server } from 'lucide-react';

interface FederationCardProps {
  domain: FederationDomain;
  index: number;
}

const typeConfig = {
  governance: { 
    icon: Shield, 
    gradient: 'from-amber-500/20 to-amber-600/5',
    accentColor: 'text-amber-400',
    borderColor: 'border-amber-500/30'
  },
  data: { 
    icon: Database, 
    gradient: 'from-cyan-500/20 to-cyan-600/5',
    accentColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/30'
  },
  services: { 
    icon: Server, 
    gradient: 'from-purple-500/20 to-purple-600/5',
    accentColor: 'text-purple-400',
    borderColor: 'border-purple-500/30'
  }
};

export function FederationCard({ domain, index }: FederationCardProps) {
  const config = typeConfig[domain.type];
  const Icon = config.icon;

  return (
    <GlassCard
      className={`relative overflow-hidden border ${config.borderColor}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      hover={true}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} pointer-events-none`} />

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl bg-background/50 ${config.accentColor}`}>
            <Icon className="w-6 h-6" />
          </div>
          <StatusBadge status={domain.status} size="sm" />
        </div>

        <h3 className={`font-orbitron font-bold text-lg ${config.accentColor} mb-2`}>
          {domain.name}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-6">
          {domain.description}
        </p>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            Componentes
          </p>
          <div className="flex flex-wrap gap-2">
            {domain.components.map((component, i) => (
              <motion.span
                key={component}
                className="px-2.5 py-1 rounded-full text-xs bg-background/50 border border-border/50 text-foreground/80"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.15 + i * 0.05 }}
              >
                {component}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
