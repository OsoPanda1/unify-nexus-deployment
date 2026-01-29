import { motion } from 'framer-motion';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Activity,
  Lock,
  Eye,
  RefreshCw,
  History
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Guardrail {
  id: string;
  name: string;
  policy: string;
  integrity: number;
  active: boolean;
  lastCheck: string;
}

interface ThreatLog {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  timestamp: string;
  status: 'detected' | 'mitigated' | 'resolved';
}

const mockGuardrails: Guardrail[] = [
  { id: '1', name: 'Privacidad de Datos', policy: 'GDPR_COMPLIANCE', integrity: 1.0, active: true, lastCheck: 'Hace 5min' },
  { id: '2', name: 'No Violencia', policy: 'CONTENT_SAFETY', integrity: 0.98, active: true, lastCheck: 'Hace 10min' },
  { id: '3', name: 'Veracidad', policy: 'TRUTH_VERIFICATION', integrity: 0.95, active: true, lastCheck: 'Hace 15min' },
  { id: '4', name: 'Economía Justa', policy: 'FAIR_ECONOMY', integrity: 0.97, active: true, lastCheck: 'Hace 8min' },
  { id: '5', name: 'Identidad Soberana', policy: 'ID_NVIDA', integrity: 1.0, active: true, lastCheck: 'Hace 3min' },
  { id: '6', name: 'Gobernanza Ética', policy: 'DEKATEOTL', integrity: 0.99, active: true, lastCheck: 'Hace 12min' },
  { id: '7', name: 'Anti-Manipulación', policy: 'NO_DARK_PATTERNS', integrity: 0.96, active: true, lastCheck: 'Hace 7min' },
  { id: '8', name: 'Transparencia IA', policy: 'AI_TRANSPARENCY', integrity: 0.94, active: true, lastCheck: 'Hace 20min' },
  { id: '9', name: 'Acceso Universal', policy: 'ACCESSIBILITY', integrity: 0.92, active: true, lastCheck: 'Hace 25min' },
  { id: '10', name: 'Auditoría Continua', policy: 'BOOKPI_AUDIT', integrity: 1.0, active: true, lastCheck: 'Hace 1min' },
  { id: '11', name: 'Resiliencia', policy: 'ANTIFRAGILE', integrity: 0.91, active: true, lastCheck: 'Hace 30min' },
];

const mockThreats: ThreatLog[] = [
  { id: '1', type: 'Intento de acceso', severity: 'low', description: 'Múltiples intentos de login fallidos desde IP desconocida', timestamp: 'Hace 2h', status: 'mitigated' },
  { id: '2', type: 'Contenido sospechoso', severity: 'medium', description: 'Patrón de spam detectado en publicaciones', timestamp: 'Hace 4h', status: 'resolved' },
  { id: '3', type: 'Anomalía económica', severity: 'high', description: 'Transacción inusual en Trueque detectada', timestamp: 'Hace 6h', status: 'mitigated' },
];

export function SecuritySection() {
  const getSeverityColor = (severity: ThreatLog['severity']) => {
    switch (severity) {
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'medium': return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/50';
    }
  };

  const getStatusIcon = (status: ThreatLog['status']) => {
    switch (status) {
      case 'detected': return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'mitigated': return <Shield className="w-4 h-4 text-blue-400" />;
      case 'resolved': return <CheckCircle className="w-4 h-4 text-emerald-400" />;
    }
  };

  const overallIntegrity = mockGuardrails.reduce((acc, g) => acc + g.integrity, 0) / mockGuardrails.length;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-orbitron text-2xl md:text-3xl font-bold gradient-text mb-2">
          Panel de Seguridad Anubis
        </h1>
        <p className="text-muted-foreground">
          Monitoreo de amenazas, guardrails Dekateotl y auditoría del sistema
        </p>
      </motion.div>

      {/* Main Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <GlassCard className="text-center p-6" glow="cyan">
          <div className="w-24 h-24 rounded-full bg-emerald-500/20 border-4 border-emerald-500 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-12 h-12 text-emerald-400" />
          </div>
          <div className="font-orbitron text-3xl font-bold text-emerald-400 mb-1">
            {Math.round(overallIntegrity * 100)}%
          </div>
          <div className="text-muted-foreground">Integridad Global</div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-8 h-8 text-primary" />
            <div>
              <div className="font-orbitron text-2xl font-bold">{mockGuardrails.filter(g => g.active).length}/{mockGuardrails.length}</div>
              <div className="text-sm text-muted-foreground">Guardrails Activos</div>
            </div>
          </div>
          <Progress value={(mockGuardrails.filter(g => g.active).length / mockGuardrails.length) * 100} className="h-2" />
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-8 h-8 text-amber-400" />
            <div>
              <div className="font-orbitron text-2xl font-bold">{mockThreats.length}</div>
              <div className="text-sm text-muted-foreground">Amenazas (24h)</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-emerald-500/20 text-emerald-400">{mockThreats.filter(t => t.status === 'resolved').length} resueltas</Badge>
            <Badge className="bg-amber-500/20 text-amber-400">{mockThreats.filter(t => t.status !== 'resolved').length} activas</Badge>
          </div>
        </GlassCard>
      </motion.div>

      <Tabs defaultValue="guardrails" className="space-y-6">
        <TabsList>
          <TabsTrigger value="guardrails">Dekateotl (11 Guardrails)</TabsTrigger>
          <TabsTrigger value="threats">Amenazas</TabsTrigger>
          <TabsTrigger value="audit">Auditoría</TabsTrigger>
        </TabsList>

        <TabsContent value="guardrails">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockGuardrails.map((guardrail, index) => (
              <motion.div
                key={guardrail.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <GlassCard className="h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {guardrail.active ? (
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400" />
                      )}
                      <span className="font-medium">{guardrail.name}</span>
                    </div>
                    <Badge variant="outline" className="font-jetbrains text-xs">
                      {guardrail.policy}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Integridad</span>
                      <span className={guardrail.integrity >= 0.95 ? 'text-emerald-400' : 'text-amber-400'}>
                        {Math.round(guardrail.integrity * 100)}%
                      </span>
                    </div>
                    <Progress value={guardrail.integrity * 100} className="h-1.5" />
                  </div>

                  <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Última verificación: {guardrail.lastCheck}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <RefreshCw className="w-3 h-3" />
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="threats">
          <div className="space-y-4">
            {mockThreats.map((threat) => (
              <GlassCard key={threat.id}>
                <div className="flex items-start gap-4">
                  <div className="mt-1">{getStatusIcon(threat.status)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{threat.type}</span>
                      <Badge className={getSeverityColor(threat.severity)}>
                        {threat.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{threat.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{threat.timestamp}</span>
                      <Badge variant="outline">{threat.status}</Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </GlassCard>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="audit">
          <GlassCard className="text-center py-12">
            <History className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-orbitron text-lg font-bold mb-2">Registro de Auditoría BookPI</h3>
            <p className="text-muted-foreground mb-4">Historial de verificaciones y evidencias criptográficas</p>
            <Button>Ver Registro Completo</Button>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
