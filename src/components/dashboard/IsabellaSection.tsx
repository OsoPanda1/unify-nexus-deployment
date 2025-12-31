import { motion } from 'framer-motion';
import { Brain, Shield, Eye, Zap, AlertTriangle, CheckCircle2, Scale, Lightbulb } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { eoctCriteria, dekateotlGuardrails, knowledgeCells } from '@/data/mockData';

export function IsabellaSection() {
  const isabellaCell = knowledgeCells.find(c => c.id === 'isabella-core');

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-orbitron text-2xl md:text-3xl font-bold gradient-text mb-2">
          Isabella Core — Motor IA
        </h1>
        <p className="text-muted-foreground">
          Orquestación de intents, Ética Operativa en Tiempo de Cómputo (EOCT), y auditoría
        </p>
      </motion.div>

      {/* Isabella Status Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard glow="purple" className="relative overflow-hidden">
          {/* Animated background orb */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Isabella Avatar */}
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500/30 to-cyan-500/30 border border-purple-500/30 flex items-center justify-center">
              <Brain className="w-12 h-12 text-purple-400" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="font-orbitron text-xl font-bold text-foreground">Isabella</h2>
                <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </span>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Motor IA central que evalúa cada intent bajo criterios éticos (EOCT), 
                genera DecisionRecords auditables y coordina con BookPI para anclar evidencia.
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span className="text-muted-foreground">Latencia: <span className="text-foreground">{isabellaCell?.metrics?.latencyMs}ms</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-400" />
                  <span className="text-muted-foreground">EOCT Score: <span className="text-foreground">0.94</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-amber-400" />
                  <span className="text-muted-foreground">Uptime: <span className="text-foreground">{isabellaCell?.metrics?.uptime}%</span></span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* EOCT Criteria */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="font-orbitron text-lg font-bold mb-4 flex items-center gap-2">
          <Scale className="w-5 h-5 text-primary" />
          Criterios EOCT
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {eoctCriteria.map((criterion, index) => (
            <motion.div
              key={criterion.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <GlassCard className="h-full" glow="cyan">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0">
                    <span className="font-orbitron font-bold text-primary">{Math.round(criterion.weight * 100)}%</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{criterion.name}</h3>
                    <p className="text-sm text-muted-foreground">{criterion.description}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Dekateotl Guardrails */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="font-orbitron text-lg font-bold mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          Dekateotl — 11 Guardrails
        </h2>
        <GlassCard glow="gold">
          {/* Visual Ring */}
          <div className="flex justify-center mb-6">
            <div className="relative w-48 h-48">
              {dekateotlGuardrails.map((guardrail, index) => {
                const angle = (index * 360) / 11 - 90;
                const x = 50 + 40 * Math.cos((angle * Math.PI) / 180);
                const y = 50 + 40 * Math.sin((angle * Math.PI) / 180);
                return (
                  <motion.div
                    key={guardrail.id}
                    className="absolute w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xs font-bold text-background"
                    style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    title={guardrail.name}
                  >
                    {guardrail.id}
                  </motion.div>
                );
              })}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center">
                  <Shield className="w-10 h-10 text-amber-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Guardrails List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {dekateotlGuardrails.map((guardrail) => (
              <div
                key={guardrail.id}
                className="flex items-start gap-2 p-2 rounded-lg bg-background/30"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">{guardrail.name}</p>
                  <p className="text-xs text-muted-foreground">{guardrail.description}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.section>

      {/* Decision Flow */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="font-orbitron text-lg font-bold mb-4">Flujo de Decisión EOCT</h2>
        <GlassCard glow="purple">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {['Intent', 'EOCT Eval', 'DecisionRecord', 'BookPI Anchor', 'Execute'].map((step, index) => (
              <div key={step} className="flex items-center gap-4">
                <motion.div
                  className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-border flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <span className="font-jetbrains text-xs text-center text-foreground">{step}</span>
                </motion.div>
                {index < 4 && (
                  <div className="hidden md:block w-8 h-0.5 bg-gradient-to-r from-primary to-secondary" />
                )}
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.section>
    </div>
  );
}
