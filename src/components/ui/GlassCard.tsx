import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  glow?: 'cyan' | 'purple' | 'gold' | 'none';
  hover?: boolean;
}

export function GlassCard({ 
  children, 
  className, 
  glow = 'none',
  hover = true,
  ...props 
}: GlassCardProps) {
  const glowStyles = {
    cyan: 'hover:shadow-glow-cyan',
    purple: 'hover:shadow-glow-purple',
    gold: 'hover:shadow-glow-gold',
    none: ''
  };

  return (
    <motion.div
      className={cn(
        'glass-card p-6 transition-all duration-300',
        hover && 'hover:border-primary/40 hover:scale-[1.02]',
        glowStyles[glow],
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
