import { motion } from 'framer-motion';
import heroImage from '@/assets/hero-tamv.jpg';
import { 
  Boxes, 
  Activity, 
  Zap, 
  Clock, 
  Users, 
  HardDrive,
  Server,
  TrendingUp
} from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { CellCard } from '@/components/dashboard/CellCard';
import { FederationCard } from '@/components/dashboard/FederationCard';
import { LayerVisualization } from '@/components/dashboard/LayerVisualization';
import { GlassCard } from '@/components/ui/GlassCard';
import { IsabellaSection } from '@/components/dashboard/IsabellaSection';
import { DreamSpacesSection } from '@/components/dashboard/DreamSpacesSection';
import { TruequeSection } from '@/components/dashboard/TruequeSection';
import { KaosAudioSection } from '@/components/dashboard/KaosAudioSection';
import { DevHubSection } from '@/components/dashboard/DevHubSection';
import { BookPISection } from '@/components/dashboard/BookPISection';
import { MembershipsSection } from '@/components/dashboard/MembershipsSection';
import { MediaFeed } from '@/components/dashboard/MediaFeed';
import { ChannelsSection } from '@/components/dashboard/ChannelsSection';
import { GroupsSection } from '@/components/dashboard/GroupsSection';
import { MetricsCharts } from '@/components/dashboard/MetricsCharts';
import { GallerySection } from '@/components/dashboard/GallerySection';
import { knowledgeCells, systemModules, federationDomains, dashboardStats } from '@/data/mockData';

interface DashboardContentProps {
  activeSection: string;
}

export function DashboardContent({ activeSection }: DashboardContentProps) {
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard': return <DashboardOverview />;
      case 'cells': return <CellsSection />;
      case 'layers': return <LayersSection />;
      case 'federation': return <FederationSection />;
      case 'modules': return <ModulesSection />;
      case 'isabella': return <IsabellaSection />;
      case 'dreamspaces': return <DreamSpacesSection />;
      case 'kaos': return <KaosAudioSection />;
      case 'trueque': return <TruequeSection />;
      case 'bookpi': return <BookPISection />;
      case 'memberships': return <MembershipsSection />;
      case 'devhub': return <DevHubSection />;
      case 'media': return <MediaFeed />;
      case 'channels': return <ChannelsSection />;
      case 'groups': return <GroupsSection />;
      case 'metrics': return <MetricsCharts />;
      case 'gallery': return <GallerySection />;
      default: return <ComingSoonSection title={activeSection} />;
    }
  };

  return (
    <main className="md:ml-64 pt-16 min-h-screen">
      <div className="p-4 md:p-6 lg:p-8">
        {renderContent()}
      </div>
    </main>
  );
}

function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        className="relative overflow-hidden rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="TAMV 4D Ecosystem" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        </div>
        <div className="absolute inset-0 grid-pattern opacity-20" />
        
        <div className="relative p-8 md:p-12">
          <motion.h1 
            className="font-orbitron text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="gradient-text">TAMV MD-X4</span>
          </motion.h1>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Ecosistema inmersivo, multisensorial y civilizatorio con identidad soberana, 
            gobernanza federada y experiencias XR/4D.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <a 
              href="https://github.com/OsoPanda1/tamv-unify-nexus" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all hover:scale-105 shadow-glow-cyan"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              Ver Repositorio
            </a>
            <span className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-muted/50 border border-border text-sm font-jetbrains">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Sistema Operativo
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="KnowledgeCells"
          value={dashboardStats.totalCells}
          subtitle={`${dashboardStats.activeCells} activas`}
          icon={<Boxes className="w-6 h-6" />}
          trend="up"
          trendValue="+3 esta semana"
          glow="cyan"
          delay={0}
        />
        <StatCard
          title="Requests/día"
          value={dashboardStats.totalRequests}
          subtitle="Últimas 24h"
          icon={<Zap className="w-6 h-6" />}
          trend="up"
          trendValue="+12.5%"
          glow="purple"
          delay={0.1}
        />
        <StatCard
          title="Latencia Promedio"
          value={dashboardStats.avgLatency}
          subtitle="p95"
          icon={<Clock className="w-6 h-6" />}
          trend="down"
          trendValue="-8ms"
          glow="gold"
          delay={0.2}
        />
        <StatCard
          title="Uptime Global"
          value={dashboardStats.uptime}
          subtitle="Últimos 30 días"
          icon={<Activity className="w-6 h-6" />}
          trend="up"
          trendValue="+0.02%"
          glow="cyan"
          delay={0.3}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Usuarios Activos"
          value={dashboardStats.activeUsers}
          icon={<Users className="w-6 h-6" />}
          trend="up"
          trendValue="+1.2K"
          glow="purple"
          delay={0.4}
        />
        <StatCard
          title="Eventos Procesados"
          value={dashboardStats.eventsProcessed}
          icon={<TrendingUp className="w-6 h-6" />}
          trend="up"
          trendValue="+500K"
          glow="cyan"
          delay={0.5}
        />
        <StatCard
          title="Storage Usado"
          value={dashboardStats.storageUsed}
          icon={<HardDrive className="w-6 h-6" />}
          trend="neutral"
          glow="gold"
          delay={0.6}
        />
        <StatCard
          title="Microservicios"
          value={systemModules.length}
          subtitle="14 online"
          icon={<Server className="w-6 h-6" />}
          trend="up"
          trendValue="+2"
          glow="purple"
          delay={0.7}
        />
      </div>

      {/* Triple Federado Preview */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="font-orbitron text-xl font-bold mb-6 flex items-center gap-2">
          <span className="w-2 h-8 bg-gradient-to-b from-primary to-secondary rounded-full" />
          Triple Federado
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {federationDomains.map((domain, index) => (
            <FederationCard key={domain.id} domain={domain} index={index} />
          ))}
        </div>
      </motion.section>

      {/* Recent Cells */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="font-orbitron text-xl font-bold mb-6 flex items-center gap-2">
          <span className="w-2 h-8 bg-gradient-to-b from-secondary to-accent rounded-full" />
          KnowledgeCells Recientes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {knowledgeCells.slice(0, 3).map((cell, index) => (
            <CellCard key={cell.id} cell={cell} index={index} />
          ))}
        </div>
      </motion.section>
    </div>
  );
}

function CellsSection() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-orbitron text-2xl md:text-3xl font-bold gradient-text mb-2">
          KnowledgeCells
        </h1>
        <p className="text-muted-foreground">
          Microservicios autónomos del ecosistema TAMV
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {knowledgeCells.map((cell, index) => (
          <CellCard key={cell.id} cell={cell} index={index} />
        ))}
      </div>
    </div>
  );
}

function LayersSection() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-orbitron text-2xl md:text-3xl font-bold gradient-text mb-2">
          Arquitectura por Capas
        </h1>
        <p className="text-muted-foreground">
          Visualización de las capas L0-L4 del ecosistema TAMV
        </p>
      </motion.div>

      <LayerVisualization modules={systemModules} />
    </div>
  );
}

function FederationSection() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-orbitron text-2xl md:text-3xl font-bold gradient-text mb-2">
          Triple Federado
        </h1>
        <p className="text-muted-foreground">
          Tres dominios de federación coordinados: Gobernanza, Datos y Servicios
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {federationDomains.map((domain, index) => (
          <FederationCard key={domain.id} domain={domain} index={index} />
        ))}
      </div>

      {/* Federation Diagram */}
      <GlassCard className="p-8" glow="purple">
        <h3 className="font-orbitron font-bold text-lg mb-6 text-center">
          Flujo de Federación
        </h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          {federationDomains.map((domain, index) => (
            <motion.div
              key={domain.id}
              className="flex items-center gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-border flex items-center justify-center mx-auto mb-2">
                  <span className="font-orbitron font-bold text-primary">{domain.type.charAt(0).toUpperCase()}</span>
                </div>
                <p className="text-sm font-medium">{domain.name.split(' ').slice(-1)}</p>
              </div>
              {index < federationDomains.length - 1 && (
                <div className="hidden md:block w-12 h-0.5 bg-gradient-to-r from-primary to-secondary" />
              )}
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

function ModulesSection() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-orbitron text-2xl md:text-3xl font-bold gradient-text mb-2">
          Catálogo de Módulos
        </h1>
        <p className="text-muted-foreground">
          Sistemas, programas y funciones del ecosistema TAMV
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {systemModules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <GlassCard className="h-full" glow="cyan">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-jetbrains text-muted-foreground">{module.id}</span>
                <StatusBadge status={module.status} size="sm" />
              </div>
              <h3 className="font-orbitron font-semibold text-foreground mb-1">{module.name}</h3>
              <p className="text-xs text-primary mb-3">{module.type}</p>
              <p className="text-sm text-muted-foreground">{module.description}</p>
              <div className="mt-4">
                <LayerBadge layer={module.layer} showLabel />
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ComingSoonSection({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <GlassCard className="text-center max-w-md" glow="purple">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-6">
          <Server className="w-10 h-10 text-primary" />
        </div>
        <h2 className="font-orbitron text-2xl font-bold gradient-text mb-4">
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </h2>
        <p className="text-muted-foreground">
          Esta sección está en desarrollo. Pronto estará disponible con todas las funcionalidades del ecosistema TAMV.
        </p>
      </GlassCard>
    </div>
  );
}

// Import LayerBadge for ModulesSection
import { LayerBadge } from '@/components/ui/LayerBadge';
import { StatusBadge } from '@/components/ui/StatusBadge';
