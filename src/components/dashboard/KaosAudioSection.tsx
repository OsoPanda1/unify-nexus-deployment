import { motion } from 'framer-motion';
import { Volume2, Play, Pause, Waves, Radio, Headphones, Music, Settings2 } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { kaosAudioPresets, knowledgeCells } from '@/data/mockData';
import { useState } from 'react';

export function KaosAudioSection() {
  const [activePreset, setActivePreset] = useState('calma');
  const [isPlaying, setIsPlaying] = useState(false);
  const kaosCell = knowledgeCells.find(c => c.id === 'kaos-audio-3d');

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-orbitron text-2xl md:text-3xl font-bold gradient-text mb-2">
          KAOS Audio 3D — Motor Espacial
        </h1>
        <p className="text-muted-foreground">
          Audio espacial 3D/4D con presets emocionales y paisajes sonoros adaptativos
        </p>
      </motion.div>

      {/* Audio Visualizer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard glow="purple" className="relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-background to-cyan-900/20" />
            {/* Audio Waves Animation */}
            <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-30">
              {Array.from({ length: 40 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-gradient-to-t from-purple-500 to-cyan-500 rounded-full"
                  animate={{
                    height: isPlaying ? [20, Math.random() * 80 + 20, 20] : 20
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.05
                  }}
                />
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 text-center py-12">
            <motion.div
              className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-500/30 border-2 border-purple-500/50 flex items-center justify-center"
              animate={{ 
                scale: isPlaying ? [1, 1.05, 1] : 1,
                boxShadow: isPlaying ? ['0 0 0 0 rgba(139, 92, 246, 0.4)', '0 0 0 20px rgba(139, 92, 246, 0)', '0 0 0 0 rgba(139, 92, 246, 0.4)'] : 'none'
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Headphones className="w-16 h-16 text-purple-400" />
            </motion.div>

            <h3 className="font-orbitron text-xl font-bold text-foreground mb-2">
              {kaosAudioPresets.find(p => p.id === activePreset)?.name}
            </h3>
            <p className="text-muted-foreground mb-6">
              {kaosAudioPresets.find(p => p.id === activePreset)?.description}
            </p>

            <div className="flex items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => setIsPlaying(!isPlaying)}
                className="gap-2 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {isPlaying ? 'Pausar' : 'Reproducir'}
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Settings2 className="w-5 h-5" />
                Configurar
              </Button>
            </div>

            {/* Metrics */}
            <div className="flex items-center justify-center gap-8 mt-8 text-sm">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan-400" />
                <span className="text-muted-foreground">Frecuencia: <span className="text-foreground">{kaosAudioPresets.find(p => p.id === activePreset)?.frequency}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Waves className="w-4 h-4 text-purple-400" />
                <span className="text-muted-foreground">Latencia: <span className="text-foreground">{kaosCell?.metrics?.latencyMs}ms</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-amber-400" />
                <span className="text-muted-foreground">Binaural: <span className="text-foreground">Activo</span></span>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Presets */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="font-orbitron text-lg font-bold mb-4 flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-primary" />
          Presets Emocionales
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {kaosAudioPresets.map((preset, index) => (
            <motion.div
              key={preset.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 * index }}
            >
              <GlassCard 
                className={`cursor-pointer text-center transition-all ${activePreset === preset.id ? 'ring-2 ring-primary' : ''}`}
                glow={activePreset === preset.id ? 'purple' : undefined}
                onClick={() => setActivePreset(preset.id)}
              >
                <div className="text-4xl mb-3">{preset.icon}</div>
                <h3 className="font-semibold text-foreground mb-1">{preset.name}</h3>
                <p className="text-xs text-muted-foreground">{preset.frequency}</p>
                <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs capitalize
                  ${preset.mood === 'peaceful' ? 'bg-cyan-500/20 text-cyan-400' : ''}
                  ${preset.mood === 'energetic' ? 'bg-amber-500/20 text-amber-400' : ''}
                  ${preset.mood === 'spiritual' ? 'bg-purple-500/20 text-purple-400' : ''}
                  ${preset.mood === 'heroic' ? 'bg-rose-500/20 text-rose-400' : ''}
                  ${preset.mood === 'mysterious' ? 'bg-indigo-500/20 text-indigo-400' : ''}
                  ${preset.mood === 'joyful' ? 'bg-emerald-500/20 text-emerald-400' : ''}
                `}>
                  {preset.mood}
                </span>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Spatial Audio Diagram */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="font-orbitron text-lg font-bold mb-4">Procesamiento de Audio Espacial</h2>
        <GlassCard glow="cyan">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {[
              { name: 'Source', desc: 'Audio Buffer', icon: Music },
              { name: 'HRTF', desc: 'Head-Related Transfer', icon: Headphones },
              { name: 'Spatial', desc: 'Posición 3D', icon: Radio },
              { name: 'Binaural', desc: 'Stream Estéreo', icon: Waves }
            ].map((stage, index) => (
              <div key={stage.name} className="flex items-center gap-4">
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center mb-2">
                    <stage.icon className="w-7 h-7 text-cyan-400" />
                  </div>
                  <span className="font-jetbrains text-xs text-foreground">{stage.name}</span>
                  <span className="text-xs text-muted-foreground text-center">{stage.desc}</span>
                </motion.div>
                {index < 3 && (
                  <div className="hidden md:block w-12 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500" />
                )}
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.section>
    </div>
  );
}
