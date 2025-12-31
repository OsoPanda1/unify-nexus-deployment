import { motion } from 'framer-motion';
import { FileCheck, Link2, Hash, Shield, Clock, Search, Download, Eye } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { knowledgeCells } from '@/data/mockData';

const mockAuditBundles = [
  {
    id: 'dec_001',
    action: 'approve_trueque',
    actor: '@CriptoArtist',
    resource: 'offer:off_123',
    eoctScore: 0.94,
    timestamp: '2025-12-31T08:45:00Z',
    anchorHash: 'sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069'
  },
  {
    id: 'dec_002',
    action: 'publish_dreamspace',
    actor: '@ArtistaMaya',
    resource: 'dreamspace:galeria_ancestral',
    eoctScore: 0.98,
    timestamp: '2025-12-31T07:30:00Z',
    anchorHash: 'sha256:a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6'
  },
  {
    id: 'dec_003',
    action: 'dispute_resolution',
    actor: '@Mediator01',
    resource: 'dispute:dsp_456',
    eoctScore: 0.87,
    timestamp: '2025-12-31T06:15:00Z',
    anchorHash: 'sha256:b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a1'
  }
];

export function BookPISection() {
  const bookpiCell = knowledgeCells.find(c => c.id === 'bookpi-anchor');

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-orbitron text-2xl md:text-3xl font-bold gradient-text mb-2">
          BookPI — Sistema de Evidencia
        </h1>
        <p className="text-muted-foreground">
          DecisionRecords, AuditBundles y anclas de integridad verificables
        </p>
      </motion.div>

      {/* Status Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard glow="cyan" className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-emerald-500/30 border border-cyan-500/30 flex items-center justify-center">
              <FileCheck className="w-10 h-10 text-cyan-400" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="font-orbitron text-xl font-bold text-foreground">BookPI Anchor</h2>
                <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Sincronizado
                </span>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Registra cada decisión crítica con evidencia inmutable anclada en ledger permissioned.
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-cyan-400" />
                  <span className="text-muted-foreground">Bundles: <span className="text-foreground">12,456</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-muted-foreground">Anchors: <span className="text-foreground">12,456</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="text-muted-foreground">Latencia: <span className="text-foreground">{bookpiCell?.metrics?.latencyMs}ms</span></span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Search className="w-4 h-4" />
                Buscar
              </Button>
              <Button className="gap-2">
                <Download className="w-4 h-4" />
                Exportar
              </Button>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Audit Flow */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="font-orbitron text-lg font-bold mb-4">Flujo de Auditoría</h2>
        <GlassCard glow="gold">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {[
              { name: 'Decision', desc: 'Acción del usuario', icon: Shield },
              { name: 'EOCT', desc: 'Evaluación ética', icon: FileCheck },
              { name: 'Bundle', desc: 'Empaquetado + logs', icon: Hash },
              { name: 'Anchor', desc: 'Hash en ledger', icon: Link2 }
            ].map((stage, index) => (
              <div key={stage.name} className="flex items-center gap-4">
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500/20 to-cyan-500/20 border border-amber-500/30 flex items-center justify-center mb-2">
                    <stage.icon className="w-7 h-7 text-amber-400" />
                  </div>
                  <span className="font-jetbrains text-xs text-foreground">{stage.name}</span>
                  <span className="text-xs text-muted-foreground">{stage.desc}</span>
                </motion.div>
                {index < 3 && (
                  <div className="hidden md:block w-12 h-0.5 bg-gradient-to-r from-amber-500 to-cyan-500" />
                )}
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.section>

      {/* Recent Bundles */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="font-orbitron text-lg font-bold mb-4 flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-primary" />
          AuditBundles Recientes
        </h2>
        <div className="space-y-3">
          {mockAuditBundles.map((bundle, index) => (
            <motion.div
              key={bundle.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <GlassCard className="hover:border-primary/30 transition-colors cursor-pointer">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center shrink-0">
                      <FileCheck className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-jetbrains text-xs text-muted-foreground">{bundle.id}</span>
                        <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs">
                          {bundle.action.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-foreground">{bundle.actor} → {bundle.resource}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">EOCT Score</p>
                      <p className={`font-bold ${bundle.eoctScore >= 0.9 ? 'text-emerald-400' : bundle.eoctScore >= 0.8 ? 'text-amber-400' : 'text-red-400'}`}>
                        {bundle.eoctScore.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right hidden lg:block">
                      <p className="text-xs text-muted-foreground">Anchor</p>
                      <code className="font-jetbrains text-xs text-foreground">
                        {bundle.anchorHash.slice(0, 20)}...
                      </code>
                    </div>
                    <Button size="sm" variant="outline" className="gap-1">
                      <Eye className="w-4 h-4" />
                      Ver
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Schemas */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="font-orbitron text-lg font-bold mb-4">Esquemas de Datos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlassCard glow="cyan">
            <h3 className="font-semibold text-foreground mb-3">DecisionRecord</h3>
            <pre className="bg-background/80 p-3 rounded-lg text-xs font-jetbrains text-muted-foreground overflow-x-auto">
{`{
  decisionId: string,
  actorId: string,
  action: string,
  resource: string,
  timestamp: ISO8601,
  eoctScore: number,
  reasons: string[]
}`}
            </pre>
          </GlassCard>
          <GlassCard glow="purple">
            <h3 className="font-semibold text-foreground mb-3">AuditBundle</h3>
            <pre className="bg-background/80 p-3 rounded-lg text-xs font-jetbrains text-muted-foreground overflow-x-auto">
{`{
  decisionRecord: DecisionRecord,
  logs: LogEntry[],
  hashes: string[],
  signature: string,
  legal_meta: object
}`}
            </pre>
          </GlassCard>
        </div>
      </motion.section>
    </div>
  );
}
