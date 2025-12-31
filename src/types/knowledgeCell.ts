export type CellType =
  | 'Render3D'
  | 'Render4D'
  | 'IA-ImmersiveFX'
  | 'QuantumChannel'
  | 'SensorMultiFX'
  | 'APIIntegration'
  | 'Analytics'
  | 'UIControl'
  | 'SpatialLogic';

export interface KnowledgeCell {
  id: string;
  type: CellType;
  description: string;
  version: string;
  dependencies?: string[];
  inputFormat: string;
  outputFormat: string;
  iaSpecializationPrompt: string;
  apiEndpoint: string;
  microserviceUrl: string;
  testCases: string[];
  visualizationSample: string;
  author: string;
  created: string | Date;
  updated: string | Date;
  status: 'online' | 'offline' | 'degraded' | 'maintenance';
  layer: 'L0' | 'L1' | 'L2' | 'L3' | 'L4';
  metrics?: {
    latencyMs: number;
    requestsPerSecond: number;
    errorRate: number;
    uptime: number;
  };
}

export interface SystemModule {
  id: string;
  name: string;
  type: string;
  layer: 'L0' | 'L1' | 'L2' | 'L3' | 'L4';
  description: string;
  status: 'online' | 'offline' | 'degraded' | 'maintenance';
  endpoints?: string[];
  icon?: string;
}

export interface FederationDomain {
  id: string;
  name: string;
  description: string;
  type: 'governance' | 'data' | 'services';
  components: string[];
  status: 'active' | 'syncing' | 'offline';
}
