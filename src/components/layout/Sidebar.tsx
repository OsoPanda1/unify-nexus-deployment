import { 
  LayoutDashboard, 
  Boxes, 
  Layers, 
  Shield, 
  Database, 
  Activity,
  Settings,
  GitBranch,
  Cpu,
  Globe,
  ChevronLeft,
  Brain,
  Sparkles,
  Volume2,
  ShoppingBag,
  FileCheck,
  Crown,
  Code
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'cells', label: 'KnowledgeCells', icon: Boxes },
  { id: 'layers', label: 'Capas (L0-L4)', icon: Layers },
  { id: 'federation', label: 'Triple Federado', icon: Globe },
  { id: 'modules', label: 'Módulos', icon: Cpu },
  { id: 'divider1', label: '', icon: null },
  { id: 'isabella', label: 'Isabella IA', icon: Brain },
  { id: 'dreamspaces', label: 'DreamSpaces', icon: Sparkles },
  { id: 'kaos', label: 'KAOS Audio', icon: Volume2 },
  { id: 'trueque', label: 'Trueque', icon: ShoppingBag },
  { id: 'bookpi', label: 'BookPI', icon: FileCheck },
  { id: 'memberships', label: 'Memberships', icon: Crown },
  { id: 'divider2', label: '', icon: null },
  { id: 'devhub', label: 'DevHub', icon: Code },
  { id: 'pipelines', label: 'CI/CD', icon: GitBranch },
  { id: 'security', label: 'Seguridad', icon: Shield },
  { id: 'observability', label: 'Observabilidad', icon: Activity },
  { id: 'database', label: 'Base de Datos', icon: Database },
];

export function Sidebar({ isOpen, onClose, activeSection, onSectionChange }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-16 bottom-0 w-64 z-40",
          "bg-sidebar border-r border-sidebar-border",
          "transform transition-transform duration-300 ease-in-out",
          "md:translate-x-0 overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full p-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2 md:hidden"
            onClick={onClose}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <nav className="flex-1 space-y-1 mt-8 md:mt-0">
            {navItems.map((item, index) => {
              if (item.id.startsWith('divider')) {
                return <div key={item.id} className="h-px bg-sidebar-border my-3" />;
              }
              
              const Icon = item.icon!;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSectionChange(item.id);
                    onClose();
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg",
                    "text-sm font-medium transition-all duration-200",
                    isActive 
                      ? "bg-primary/10 text-primary border border-primary/20" 
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isActive && "text-primary")} />
                  <span>{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-sidebar-border">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent transition-colors">
              <Settings className="w-5 h-5" />
              <span>Configuración</span>
            </button>
            
            <div className="mt-4 p-4 rounded-lg bg-sidebar-accent/50 border border-sidebar-border">
              <p className="text-xs text-muted-foreground font-jetbrains">TAMV v2025.12.31</p>
              <p className="text-xs text-muted-foreground mt-1">Ecosistema Inmersivo 4D</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
