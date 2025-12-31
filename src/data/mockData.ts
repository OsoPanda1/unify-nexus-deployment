import { KnowledgeCell, SystemModule, FederationDomain } from '@/types/knowledgeCell';

export const knowledgeCells: KnowledgeCell[] = [
  {
    id: 'render-4d-hypercube',
    type: 'Render4D',
    description: 'Motor de renderizado 4D para experiencias hipercúbicas inmersivas',
    version: '2.1.0',
    dependencies: ['spatial-core', 'webgpu-utils'],
    inputFormat: 'JSON/SceneGraph',
    outputFormat: 'WebGPU Stream',
    iaSpecializationPrompt: 'Optimiza renderizado para percepción en baja luz',
    apiEndpoint: '/api/render/4d/hypercube',
    microserviceUrl: 'http://ms-viz-4d-hypercube:5000',
    testCases: ['unit-render', 'e2e-scene', 'perf-benchmark'],
    visualizationSample: '/demos/hypercube',
    author: 'TAMV Core',
    created: '2024-08-15',
    updated: '2025-12-30',
    status: 'online',
    layer: 'L2',
    metrics: {
      latencyMs: 45,
      requestsPerSecond: 1200,
      errorRate: 0.02,
      uptime: 99.97
    }
  },
  {
    id: 'isabella-core',
    type: 'IA-ImmersiveFX',
    description: 'Motor IA central para orquestación de intents y EOCT',
    version: '3.0.1',
    dependencies: ['korima-nexus', 'bookpi-anchor'],
    inputFormat: 'Intent JSON',
    outputFormat: 'Action Plan + DecisionRecord',
    iaSpecializationPrompt: 'Evalúa ética operativa en tiempo de cómputo',
    apiEndpoint: '/api/isabella/intent',
    microserviceUrl: 'http://ms-isabella:5001',
    testCases: ['unit-eoct', 'integration-planning', 'safety-audit'],
    visualizationSample: '/demos/isabella-flow',
    author: 'TAMV AI Team',
    created: '2024-06-01',
    updated: '2025-12-31',
    status: 'online',
    layer: 'L3',
    metrics: {
      latencyMs: 120,
      requestsPerSecond: 800,
      errorRate: 0.01,
      uptime: 99.99
    }
  },
  {
    id: 'kaos-audio-3d',
    type: 'SensorMultiFX',
    description: 'Motor de audio espacial 3D/4D con presets emocionales',
    version: '1.8.0',
    dependencies: ['webaudio-core', 'hrtf-processor'],
    inputFormat: 'Audio Buffer + Spatial Data',
    outputFormat: 'Binaural Stream',
    iaSpecializationPrompt: 'Genera paisajes sonoros adaptativos',
    apiEndpoint: '/api/audio/kaos',
    microserviceUrl: 'http://ms-kaos-audio:5002',
    testCases: ['unit-spatial', 'e2e-immersive', 'perf-latency'],
    visualizationSample: '/demos/kaos-audio',
    author: 'TAMV XR Team',
    created: '2024-09-20',
    updated: '2025-12-28',
    status: 'online',
    layer: 'L2',
    metrics: {
      latencyMs: 8,
      requestsPerSecond: 2500,
      errorRate: 0.005,
      uptime: 99.95
    }
  },
  {
    id: 'quantum-channel-bridge',
    type: 'QuantumChannel',
    description: 'Bridge de emulación cuántica para canales seguros',
    version: '0.9.5',
    dependencies: ['pqc-crypto', 'kyber-dilithium'],
    inputFormat: 'Quantum State Vector',
    outputFormat: 'Classical Ciphertext',
    iaSpecializationPrompt: 'Optimiza entrelazamiento para latencia mínima',
    apiEndpoint: '/api/quantum/bridge',
    microserviceUrl: 'http://ms-quantum:5003',
    testCases: ['unit-qkd', 'integration-pqc', 'security-audit'],
    visualizationSample: '/demos/quantum-viz',
    author: 'TAMV Quantum Lab',
    created: '2025-01-10',
    updated: '2025-12-29',
    status: 'degraded',
    layer: 'L3',
    metrics: {
      latencyMs: 250,
      requestsPerSecond: 150,
      errorRate: 0.15,
      uptime: 98.50
    }
  },
  {
    id: 'dreamspaces-editor',
    type: 'UIControl',
    description: 'Editor XR para creación de experiencias inmersivas',
    version: '2.5.0',
    dependencies: ['webxr-core', 'gltf-pipeline', 'timeline-engine'],
    inputFormat: 'Scene Template JSON',
    outputFormat: 'XR Experience Package',
    iaSpecializationPrompt: 'Sugiere composiciones visuales óptimas',
    apiEndpoint: '/api/dreamspaces/editor',
    microserviceUrl: 'http://ms-dreamspaces:5004',
    testCases: ['unit-editor', 'e2e-creation', 'a11y-check'],
    visualizationSample: '/demos/dreamspaces',
    author: 'TAMV UX Team',
    created: '2024-07-01',
    updated: '2025-12-30',
    status: 'online',
    layer: 'L2',
    metrics: {
      latencyMs: 65,
      requestsPerSecond: 450,
      errorRate: 0.03,
      uptime: 99.92
    }
  },
  {
    id: 'anubis-sentinel',
    type: 'Analytics',
    description: 'Sistema de seguridad, detección y rollback automático',
    version: '1.2.0',
    dependencies: ['threat-detector', 'forensic-engine'],
    inputFormat: 'Event Stream',
    outputFormat: 'Threat Assessment + Actions',
    iaSpecializationPrompt: 'Detecta anomalías en tiempo real',
    apiEndpoint: '/api/security/anubis',
    microserviceUrl: 'http://ms-anubis:5005',
    testCases: ['unit-detection', 'integration-response', 'pen-test'],
    visualizationSample: '/demos/anubis-dashboard',
    author: 'TAMV Security',
    created: '2024-11-01',
    updated: '2025-12-31',
    status: 'online',
    layer: 'L3',
    metrics: {
      latencyMs: 15,
      requestsPerSecond: 5000,
      errorRate: 0.001,
      uptime: 99.999
    }
  }
];

export const systemModules: SystemModule[] = [
  { id: 'AI01', name: 'Isabella Core', type: 'Motor IA', layer: 'L3', description: 'Orquestación de intents, EOCT, auditoría', status: 'online' },
  { id: 'AI02', name: 'Korima Nexus', type: 'Memoria/explicabilidad', layer: 'L3', description: 'RAG + vector DB, Explain API', status: 'online' },
  { id: 'DM01', name: 'DM X4 Bus', type: 'Backbone eventos', layer: 'L3', description: 'Eventos tipados, outbox, DLQ', status: 'online' },
  { id: 'ID01', name: 'ID NVIDA', type: 'Identidad soberana', layer: 'L1', description: 'DID issuance, consent ledger, device trust', status: 'online' },
  { id: 'BK01', name: 'BookPI', type: 'Evidencia', layer: 'L1', description: 'DecisionRecord + AuditBundle + anchor', status: 'online' },
  { id: 'SG01', name: 'Anubis Sentinel', type: 'Seguridad/rollback', layer: 'L3', description: 'Detección, forensic playback, orchestration rollback', status: 'online' },
  { id: 'XR01', name: 'DreamSpaces', type: 'XR editor/experiencias', layer: 'L2', description: 'Plantillas, timeline AV, QA auto', status: 'online' },
  { id: 'XR02', name: 'KAOS Audio 3D', type: 'Audio espacial', layer: 'L2', description: 'Motor 3D/4D, presets emocionales', status: 'online' },
  { id: 'EC01', name: 'Economía', type: 'Monetización', layer: 'L1', description: 'Split 75/25, TAMV Credits, subastas', status: 'online' },
  { id: 'GW01', name: 'Gateway', type: 'API ingress', layer: 'L1', description: 'Auth, ABAC, rate limits, observabilidad', status: 'online' },
  { id: 'NO01', name: 'Notifications', type: 'SSE/WebSocket', layer: 'L1', description: 'Streams de usuario y operador', status: 'online' },
  { id: 'CT01', name: 'Catalog', type: 'Dominio', layer: 'L1', description: 'CRUD productos/media', status: 'online' },
  { id: 'TR01', name: 'Trueque', type: 'Dominio', layer: 'L1', description: 'Ofertas, match, escrow, disputa', status: 'degraded' },
  { id: 'MB01', name: 'Memberships', type: 'Dominio', layer: 'L1', description: 'Tiers, entitlements, estado', status: 'online' }
];

export const federationDomains: FederationDomain[] = [
  {
    id: 'fed-governance',
    name: 'Federación de Gobernanza',
    description: 'Políticas & Legales: comité multi-stakeholder, contratos versionados, DPA templates',
    type: 'governance',
    components: ['Policy Engine', 'Contract Registry', 'Voting System', 'Audit Trail'],
    status: 'active'
  },
  {
    id: 'fed-data',
    name: 'Federación de Datos',
    description: 'Soberanía & Proveniencia: datos bajo control del tenant, metadatos en ledger',
    type: 'data',
    components: ['Data Vault', 'Consent Ledger', 'Lineage Tracker', 'IPFS Gateway'],
    status: 'active'
  },
  {
    id: 'fed-services',
    name: 'Federación de Servicios',
    description: 'Despliegue & Orquestación: clusters K8s, control plane federado, GPU farms',
    type: 'services',
    components: ['K8s Orchestrator', 'GPU Scheduler', 'Edge Runtime', 'Service Mesh'],
    status: 'syncing'
  }
];

export const layerDescriptions = {
  L0: {
    name: 'Shell Mínimo',
    description: 'Home visual-first, onboarding básico, evidencia visible (TrustBadge)',
    color: 'emerald'
  },
  L1: {
    name: 'Servicios Críticos',
    description: 'ID NVIDA, BookPI, pagos, notificaciones, gateway, catalog',
    color: 'cyan'
  },
  L2: {
    name: 'XR Intensivo',
    description: 'DreamSpaces, Live Rooms, KAOS Audio 3D, experiencias editoriales',
    color: 'purple'
  },
  L3: {
    name: 'Orquestación',
    description: 'Isabella IA (planner & safety), DM X4 event backbone, Anubis Sentinel',
    color: 'amber'
  },
  L4: {
    name: 'Meta Gobernanza',
    description: 'Trinidad federada (técnico-documental-ético), reforma y arbitraje',
    color: 'rose'
  }
};

export const dashboardStats = {
  totalCells: 24,
  activeCells: 22,
  totalRequests: '2.4M',
  avgLatency: '45ms',
  uptime: '99.97%',
  activeUsers: '12.5K',
  eventsProcessed: '8.2M',
  storageUsed: '2.4TB'
};
