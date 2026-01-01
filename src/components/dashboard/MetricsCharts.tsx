import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Activity, Zap, Clock, TrendingUp, Server, AlertTriangle } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

// Generate realistic mock data
const generateLatencyData = () => {
  const data = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000);
    data.push({
      time: time.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
      p50: Math.floor(Math.random() * 20) + 35,
      p90: Math.floor(Math.random() * 30) + 55,
      p99: Math.floor(Math.random() * 50) + 80,
    });
  }
  return data;
};

const generateRPSData = () => {
  const data = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000);
    data.push({
      time: time.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
      gateway: Math.floor(Math.random() * 500) + 800,
      isabella: Math.floor(Math.random() * 300) + 400,
      trueque: Math.floor(Math.random() * 200) + 200,
      dreamspaces: Math.floor(Math.random() * 150) + 150,
    });
  }
  return data;
};

const generateEventsData = () => {
  return [
    { type: 'AUTH', count: 1245, color: '#00d1ff' },
    { type: 'TRADE', count: 892, color: '#a855f7' },
    { type: 'XR_LOAD', count: 567, color: '#eab308' },
    { type: 'AI_INTENT', count: 423, color: '#22c55e' },
    { type: 'AUDIT', count: 234, color: '#ef4444' },
    { type: 'STREAM', count: 189, color: '#3b82f6' },
  ];
};

export function MetricsCharts() {
  const [latencyData, setLatencyData] = useState(generateLatencyData());
  const [rpsData, setRpsData] = useState(generateRPSData());
  const [eventsData] = useState(generateEventsData());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLatencyData(prev => {
        const newData = [...prev.slice(1)];
        const now = new Date();
        newData.push({
          time: now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
          p50: Math.floor(Math.random() * 20) + 35,
          p90: Math.floor(Math.random() * 30) + 55,
          p99: Math.floor(Math.random() * 50) + 80,
        });
        return newData;
      });

      setRpsData(prev => {
        const newData = [...prev.slice(1)];
        const now = new Date();
        newData.push({
          time: now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
          gateway: Math.floor(Math.random() * 500) + 800,
          isabella: Math.floor(Math.random() * 300) + 400,
          trueque: Math.floor(Math.random() * 200) + 200,
          dreamspaces: Math.floor(Math.random() * 150) + 150,
        });
        return newData;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-orbitron text-2xl md:text-3xl font-bold gradient-text mb-2">
          Métricas en Tiempo Real
        </h1>
        <p className="text-muted-foreground">
          Monitoreo del protocolo DM-X4 y servicios del ecosistema
        </p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <QuickStat 
          icon={<Clock className="w-6 h-6" />}
          label="P95 Latency"
          value="45ms"
          trend="-8%"
          color="cyan"
        />
        <QuickStat 
          icon={<Zap className="w-6 h-6" />}
          label="Requests/s"
          value="2.4K"
          trend="+12%"
          color="purple"
        />
        <QuickStat 
          icon={<Server className="w-6 h-6" />}
          label="Uptime"
          value="99.97%"
          trend="+0.02%"
          color="gold"
        />
        <QuickStat 
          icon={<AlertTriangle className="w-6 h-6" />}
          label="Error Rate"
          value="0.03%"
          trend="-0.01%"
          color="cyan"
        />
      </motion.div>

      {/* Latency Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <GlassCard glow="cyan">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-foreground">Latencia del Sistema</h3>
                <p className="text-xs text-muted-foreground">Percentiles p50, p90, p99 (últimos 30 min)</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-jetbrains flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              LIVE
            </span>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={latencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={10}
                  tickLine={false}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}ms`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="p50" 
                  stroke="#00d1ff" 
                  strokeWidth={2}
                  dot={false}
                  name="p50"
                />
                <Line 
                  type="monotone" 
                  dataKey="p90" 
                  stroke="#a855f7" 
                  strokeWidth={2}
                  dot={false}
                  name="p90"
                />
                <Line 
                  type="monotone" 
                  dataKey="p99" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  dot={false}
                  name="p99"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </motion.div>

      {/* RPS Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <GlassCard glow="purple">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-foreground">Requests por Segundo</h3>
                <p className="text-xs text-muted-foreground">Distribución por servicio (últimos 30 min)</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-jetbrains flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              STREAMING
            </span>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={rpsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={10}
                  tickLine={false}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="gateway" 
                  stackId="1"
                  stroke="#00d1ff" 
                  fill="#00d1ff"
                  fillOpacity={0.6}
                  name="Gateway"
                />
                <Area 
                  type="monotone" 
                  dataKey="isabella" 
                  stackId="1"
                  stroke="#a855f7" 
                  fill="#a855f7"
                  fillOpacity={0.6}
                  name="Isabella"
                />
                <Area 
                  type="monotone" 
                  dataKey="trueque" 
                  stackId="1"
                  stroke="#eab308" 
                  fill="#eab308"
                  fillOpacity={0.6}
                  name="Trueque"
                />
                <Area 
                  type="monotone" 
                  dataKey="dreamspaces" 
                  stackId="1"
                  stroke="#22c55e" 
                  fill="#22c55e"
                  fillOpacity={0.6}
                  name="DreamSpaces"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </motion.div>

      {/* Events Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <GlassCard glow="gold">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-foreground">Eventos DM-X4</h3>
                <p className="text-xs text-muted-foreground">Distribución por tipo (última hora)</p>
              </div>
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={eventsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} horizontal={false} />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <YAxis 
                  dataKey="type" 
                  type="category" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  width={80}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                  }}
                  formatter={(value: number) => [`${value} eventos`, 'Count']}
                />
                <Bar 
                  dataKey="count" 
                  radius={[0, 4, 4, 0]}
                  fill="url(#colorGradient)"
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#00d1ff" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}

function QuickStat({ 
  icon, 
  label, 
  value, 
  trend, 
  color 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  trend: string;
  color: 'cyan' | 'purple' | 'gold';
}) {
  const isPositive = trend.startsWith('+') || trend.startsWith('-0');
  
  return (
    <GlassCard glow={color} className="text-center">
      <div className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center ${
        color === 'cyan' ? 'bg-primary/20 text-primary' :
        color === 'purple' ? 'bg-secondary/20 text-secondary' :
        'bg-accent/20 text-accent'
      }`}>
        {icon}
      </div>
      <p className="text-2xl font-orbitron font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <span className={`text-xs font-medium ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
        {trend}
      </span>
    </GlassCard>
  );
}
