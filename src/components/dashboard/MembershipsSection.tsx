import { motion } from 'framer-motion';
import { Crown, CheckCircle2, Sparkles, Users, Star, Zap } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { membershipTiers } from '@/data/mockData';

export function MembershipsSection() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-orbitron text-2xl md:text-3xl font-bold gradient-text mb-2">
          Memberships — Tiers y Beneficios
        </h1>
        <p className="text-muted-foreground">
          Niveles de membresía con beneficios progresivos y gobernanza participativa
        </p>
      </motion.div>

      {/* Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {membershipTiers.map((tier, index) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="h-full"
          >
            <GlassCard 
              className={`h-full relative overflow-hidden ${tier.id === 'celestial' ? 'ring-2 ring-amber-500/50' : ''}`}
              glow={tier.color as any}
            >
              {/* Popular Badge */}
              {tier.id === 'pro' && (
                <div className="absolute top-0 right-0 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-bl-lg">
                  Popular
                </div>
              )}

              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl mb-4 flex items-center justify-center
                ${tier.color === 'zinc' ? 'bg-zinc-500/20' : ''}
                ${tier.color === 'cyan' ? 'bg-cyan-500/20' : ''}
                ${tier.color === 'purple' ? 'bg-purple-500/20' : ''}
                ${tier.color === 'amber' ? 'bg-gradient-to-br from-amber-500/30 to-orange-500/30' : ''}
              `}>
                {tier.id === 'base' && <Users className="w-8 h-8 text-zinc-400" />}
                {tier.id === 'pro' && <Zap className="w-8 h-8 text-cyan-400" />}
                {tier.id === 'ally' && <Star className="w-8 h-8 text-purple-400" />}
                {tier.id === 'celestial' && <Crown className="w-8 h-8 text-amber-400" />}
              </div>

              {/* Title & Price */}
              <h3 className="font-orbitron text-xl font-bold text-foreground mb-1">{tier.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
              
              <div className="mb-6">
                <span className="text-3xl font-bold text-foreground">${tier.price}</span>
                {tier.price > 0 && <span className="text-muted-foreground">/mes</span>}
              </div>

              {/* Benefits */}
              <ul className="space-y-3 mb-6">
                {tier.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5
                      ${tier.color === 'zinc' ? 'text-zinc-400' : ''}
                      ${tier.color === 'cyan' ? 'text-cyan-400' : ''}
                      ${tier.color === 'purple' ? 'text-purple-400' : ''}
                      ${tier.color === 'amber' ? 'text-amber-400' : ''}
                    `} />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button 
                className={`w-full gap-2 ${
                  tier.id === 'celestial' 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white' 
                    : tier.id === 'base' 
                      ? 'bg-muted hover:bg-muted/80' 
                      : ''
                }`}
                variant={tier.id === 'base' ? 'secondary' : 'default'}
              >
                {tier.id === 'base' ? 'Actual' : tier.id === 'celestial' ? (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Ascender
                  </>
                ) : 'Seleccionar'}
              </Button>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Avatar Customization Preview */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="font-orbitron text-lg font-bold mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Distintivos de Avatar por Tier
        </h2>
        <GlassCard glow="purple">
          <p className="text-muted-foreground mb-6">
            Cada tier desbloquea elementos visuales únicos para tu avatar en el metaverso:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { tier: 'Base', items: ['Avatar básico', 'Nombre visible'], color: 'zinc' },
              { tier: 'Pro', items: ['Aura cyan', 'Badge verificado', 'Efectos de luz'], color: 'cyan' },
              { tier: 'Ally', items: ['Aura púrpura', 'Tatuajes de luz', 'Accesorios exclusivos', 'Trail de partículas'], color: 'purple' },
              { tier: 'Celestial', items: ['Aura dorada', 'Corona de luz', 'Wings effect', 'Presencia divina'], color: 'amber' }
            ].map((item) => (
              <div 
                key={item.tier}
                className={`p-4 rounded-xl border
                  ${item.color === 'zinc' ? 'bg-zinc-500/10 border-zinc-500/30' : ''}
                  ${item.color === 'cyan' ? 'bg-cyan-500/10 border-cyan-500/30' : ''}
                  ${item.color === 'purple' ? 'bg-purple-500/10 border-purple-500/30' : ''}
                  ${item.color === 'amber' ? 'bg-amber-500/10 border-amber-500/30' : ''}
                `}
              >
                <h4 className={`font-orbitron font-bold mb-2
                  ${item.color === 'zinc' ? 'text-zinc-400' : ''}
                  ${item.color === 'cyan' ? 'text-cyan-400' : ''}
                  ${item.color === 'purple' ? 'text-purple-400' : ''}
                  ${item.color === 'amber' ? 'text-amber-400' : ''}
                `}>{item.tier}</h4>
                <ul className="space-y-1">
                  {item.items.map((i) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-center gap-1">
                      <span className={`w-1 h-1 rounded-full
                        ${item.color === 'zinc' ? 'bg-zinc-400' : ''}
                        ${item.color === 'cyan' ? 'bg-cyan-400' : ''}
                        ${item.color === 'purple' ? 'bg-purple-400' : ''}
                        ${item.color === 'amber' ? 'bg-amber-400' : ''}
                      `} />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.section>
    </div>
  );
}
