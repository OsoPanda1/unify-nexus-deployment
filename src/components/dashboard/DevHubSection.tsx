import { motion } from 'framer-motion';
import { Code, Book, Terminal, GitBranch, Server, Zap, ExternalLink, Copy, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const apiEndpoints = [
  { method: 'POST', path: '/v1/auth/session', description: 'Crear sesión (passkeys/OIDC)', layer: 'L1' },
  { method: 'GET', path: '/v1/catalog/products', description: 'Listar productos', layer: 'L1' },
  { method: 'POST', path: '/v1/trueque/offers', description: 'Proponer oferta', layer: 'L1' },
  { method: 'POST', path: '/v1/trueque/offers/{id}/match', description: 'Realizar match', layer: 'L1' },
  { method: 'POST', path: '/v1/disputes', description: 'Abrir disputa', layer: 'L1' },
  { method: 'POST', path: '/v1/bookpi/publish', description: 'Publicar AuditBundle', layer: 'L1' },
  { method: 'POST', path: '/isabella/intent', description: 'Planificación + EOCT', layer: 'L3' },
  { method: 'POST', path: '/dmx4/publish', description: 'Emitir evento tipado', layer: 'L3' },
  { method: 'GET', path: '/dmx4/dlq', description: 'Estado Dead Letter Queue', layer: 'L3' }
];

const codeSnippets = {
  intent: `// Enviar intent a Isabella
const response = await fetch('/api/isabella/intent', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'create_dreamspace',
    resource: 'dreamspace:gallery',
    context: {
      user_id: 'usr_123',
      device_trust: 0.95,
      risk_score: 0.12
    }
  })
});

const { eoctScore, decisionRecord, actions } = await response.json();`,

  event: `// Publicar evento en DM-X4
const event = {
  topic: 'trueque.offer.created',
  correlation_id: crypto.randomUUID(),
  actor_id: 'usr_123',
  payload: {
    offer_id: 'off_456',
    products: ['prod_789'],
    value: 150
  }
};

await fetch('/api/dmx4/publish', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(event)
});`,

  audit: `// Publicar AuditBundle en BookPI
const auditBundle = {
  decisionRecord: {
    decisionId: 'dec_123',
    actorId: 'usr_456',
    action: 'approve_trueque',
    resource: 'offer:off_789',
    timestamp: new Date().toISOString(),
    eoctScore: 0.92,
    reasons: ['beneficencia', 'no-maleficencia']
  },
  logs: [...],
  hashes: ['sha256:abc...'],
  legal_meta: { jurisdiction: 'MX' }
};

const { anchor_hash } = await bookpi.publish(auditBundle);`
};

export function DevHubSection() {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'api' | 'events' | 'security'>('api');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-orbitron text-2xl md:text-3xl font-bold gradient-text mb-2">
          DevHub — Centro de Desarrollo
        </h1>
        <p className="text-muted-foreground">
          APIs, documentación, snippets y guías de integración para el ecosistema TAMV
        </p>
      </motion.div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'API Reference', icon: Code, color: 'cyan', href: '#' },
          { label: 'DM-X4 Events', icon: Zap, color: 'purple', href: '#' },
          { label: 'Security Docs', icon: Server, color: 'amber', href: '#' },
          { label: 'GitHub', icon: GitBranch, color: 'emerald', href: 'https://github.com/OsoPanda1/tamv-unify-nexus' }
        ].map((link, index) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index }}
          >
            <GlassCard className="h-full group cursor-pointer" glow={link.color as any}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <link.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                    {link.label}
                    {link.href.startsWith('http') && <ExternalLink className="w-3 h-3" />}
                  </h3>
                </div>
              </div>
            </GlassCard>
          </motion.a>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border pb-2">
        {[
          { id: 'api', label: 'API Endpoints', icon: Terminal },
          { id: 'events', label: 'DM-X4 Events', icon: Zap },
          { id: 'security', label: 'Seguridad', icon: Server }
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab(tab.id as any)}
            className="gap-2"
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* API Endpoints */}
      {activeTab === 'api' && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <GlassCard glow="cyan">
            <h3 className="font-orbitron font-bold mb-4 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-primary" />
              Gateway API (v1)
            </h3>
            <div className="space-y-2">
              {apiEndpoints.map((endpoint, index) => (
                <motion.div
                  key={endpoint.path}
                  className="flex items-center gap-4 p-3 rounded-lg bg-background/50 border border-border hover:border-primary/50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * index }}
                >
                  <span className={`px-2 py-1 rounded text-xs font-bold font-jetbrains
                    ${endpoint.method === 'GET' ? 'bg-emerald-500/20 text-emerald-400' : ''}
                    ${endpoint.method === 'POST' ? 'bg-cyan-500/20 text-cyan-400' : ''}
                  `}>
                    {endpoint.method}
                  </span>
                  <code className="font-jetbrains text-sm text-foreground flex-1">{endpoint.path}</code>
                  <span className="text-xs text-muted-foreground hidden md:block">{endpoint.description}</span>
                  <span className="px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground">{endpoint.layer}</span>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.section>
      )}

      {/* Code Snippets */}
      {activeTab === 'events' && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {Object.entries(codeSnippets).map(([id, code]) => (
            <GlassCard key={id} glow="purple">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-orbitron font-bold capitalize flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary" />
                  {id === 'intent' ? 'Enviar Intent a Isabella' : id === 'event' ? 'Publicar Evento DM-X4' : 'Crear AuditBundle'}
                </h3>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(code, id)}
                  className="gap-2"
                >
                  {copiedSnippet === id ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copiar
                    </>
                  )}
                </Button>
              </div>
              <pre className="bg-background/80 p-4 rounded-lg overflow-x-auto text-sm font-jetbrains text-muted-foreground">
                <code>{code}</code>
              </pre>
            </GlassCard>
          ))}
        </motion.section>
      )}

      {/* Security */}
      {activeTab === 'security' && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <GlassCard glow="gold">
            <h3 className="font-orbitron font-bold mb-4 flex items-center gap-2">
              <Server className="w-5 h-5 text-amber-400" />
              Seguridad y Cumplimiento
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Identidad', items: ['DID issuance', 'Passkeys/WebAuthn', 'ZK proofs', 'Biometría cancelable'] },
                { title: 'Datos', items: ['Cifrado AES-256-GCM', 'TLS 1.3 everywhere', 'Vault para secrets', 'Key rotation automática'] },
                { title: 'Acceso', items: ['ABAC + OPA', 'JWT + refresh tokens', 'Rate limiting', 'WAF + DDoS protection'] },
                { title: 'Auditoría', items: ['BookPI anchoring', 'Immutable logs', 'EOCT scoring', 'Forensic playback'] }
              ].map((section) => (
                <div key={section.title} className="p-4 rounded-lg bg-background/50 border border-border">
                  <h4 className="font-semibold text-foreground mb-3">{section.title}</h4>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.section>
      )}
    </div>
  );
}
