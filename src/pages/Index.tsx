import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { DashboardContent } from '@/components/dashboard/DashboardContent';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
      </div>

      {/* Layout */}
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <DashboardContent activeSection={activeSection} />
    </div>
  );
};

export default Index;
