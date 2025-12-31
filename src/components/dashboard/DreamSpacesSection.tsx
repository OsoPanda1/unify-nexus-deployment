import { motion } from 'framer-motion';
import { Sparkles, Play, Settings, Eye, CheckCircle2, AlertTriangle, Layers, Volume2 } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { dreamspacesTemplates } from '@/data/mockData';

export function DreamSpacesSection() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-orbitron text-2xl md:text-3xl font-bold gradient-text mb-2">
          DreamSpaces — Editor XR
        </h1>
        <p className="text-muted-foreground">
          Crea experiencias inmersivas con plantillas, timeline audiovisual y QA automático
        </p>
      </motion.div>

      {/* Editor Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard glow="purple" className="relative overflow-hidden min-h-[400px]">
          {/* 3D Scene Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-cyan-900/20">
            <div className="absolute inset-0 grid-pattern opacity-30" />
            
            {/* Floating 3D Elements */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-cyan-500/50 rounded-lg"
              animate={{ rotateY: 360, rotateX: 15 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{ perspective: 1000 }}
            />
            <motion.div
              className="absolute top-1/3 right-1/3 w-24 h-24 border-2 border-purple-500/50 rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-1/4 left-1/3 w-20 h-20 border-2 border-amber-500/50"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
            />
          </div>

          {/* Editor UI Overlay */}
          <div className="relative z-10 h-full flex flex-col">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="gap-2">
                  <Layers className="w-4 h-4" />
                  Escena
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Volume2 className="w-4 h-4" />
                  Audio
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Sparkles className="w-4 h-4" />
                  FX
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="gap-2">
                  <Eye className="w-4 h-4" />
                  Preview
                </Button>
                <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90">
                  <Play className="w-4 h-4" />
                  Publicar
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500/30 to-cyan-500/30 border border-purple-500/30 flex items-center justify-center"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="w-12 h-12 text-purple-400" />
                </motion.div>
                <h3 className="font-orbitron text-lg font-bold text-foreground mb-2">
                  Editor XR Inmersivo
                </h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Selecciona una plantilla o arrastra objetos 3D para comenzar
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="p-4 border-t border-border/50 bg-background/50 backdrop-blur-sm">
              <div className="h-12 rounded-lg bg-muted/30 border border-border/50 flex items-center px-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>00:00</span>
                  <div className="w-64 h-1 bg-border rounded-full overflow-hidden">
                    <div className="w-1/3 h-full bg-gradient-to-r from-primary to-secondary" />
                  </div>
                  <span>03:00</span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Templates */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="font-orbitron text-lg font-bold mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Plantillas Disponibles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dreamspacesTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
            >
              <GlassCard className="h-full cursor-pointer group" glow="cyan">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {template.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                    <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground capitalize">
                      {template.category}
                    </span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* QA Automático */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="font-orbitron text-lg font-bold mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-amber-400" />
          QA Automático
        </h2>
        <GlassCard glow="gold">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'FPS', value: '60', status: 'pass', threshold: '>30' },
              { name: 'Peso Assets', value: '12MB', status: 'pass', threshold: '<50MB' },
              { name: 'Contraste', value: '4.5:1', status: 'pass', threshold: '>4:1' },
              { name: 'Latencia Audio', value: '8ms', status: 'pass', threshold: '<20ms' }
            ].map((check, index) => (
              <motion.div
                key={check.name}
                className="p-4 rounded-lg bg-background/50 border border-border"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{check.name}</span>
                  {check.status === 'pass' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                  )}
                </div>
                <p className="text-lg font-bold text-foreground">{check.value}</p>
                <p className="text-xs text-muted-foreground">Umbral: {check.threshold}</p>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </motion.section>
    </div>
  );
}
