import { motion } from 'framer-motion';
import { Activity, Bell, Settings, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onMenuToggle?: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border/50 backdrop-blur-xl bg-background/80"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Logo & Brand */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={onMenuToggle}
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="font-orbitron font-bold text-primary-foreground text-sm">T</span>
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_hsl(160_80%_45%)]" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-orbitron font-bold text-lg gradient-text">TAMV MD-X4</h1>
              <p className="text-xs text-muted-foreground -mt-0.5">Ecosistema Inmersivo 4D</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar células, módulos, endpoints..."
              className={cn(
                "w-full h-10 pl-10 pr-4 rounded-lg",
                "bg-muted/50 border border-border/50",
                "text-sm placeholder:text-muted-foreground",
                "focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20",
                "transition-all duration-200"
              )}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* System Status */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-jetbrains text-emerald-400">99.97% Uptime</span>
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </Button>

          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>

          {/* User Avatar */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center ml-2 cursor-pointer hover:scale-105 transition-transform">
            <span className="font-orbitron font-bold text-xs text-foreground">OP</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
