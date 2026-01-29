import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Ticket, 
  Clock, 
  Trophy, 
  Users,
  Coins,
  Sparkles,
  History
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Lottery {
  id: string;
  title: string;
  description: string;
  prizePool: number;
  ticketPrice: number;
  maxTickets: number;
  soldTickets: number;
  status: 'active' | 'drawing' | 'completed';
  drawAt: string;
  timeRemaining: string;
}

interface Winner {
  lotteryTitle: string;
  winnerName: string;
  prize: number;
  date: string;
}

const mockLotteries: Lottery[] = [
  {
    id: '1',
    title: 'Sorteo Obsidiana Premium',
    description: 'Gana acceso VIP a todos los DreamSpaces por 1 año',
    prizePool: 50000,
    ticketPrice: 10,
    maxTickets: 10000,
    soldTickets: 7532,
    status: 'active',
    drawAt: '2026-02-14',
    timeRemaining: '15d 8h 23m'
  },
  {
    id: '2',
    title: 'Lotería Creadores XR',
    description: 'Kit completo de herramientas para creadores',
    prizePool: 25000,
    ticketPrice: 25,
    maxTickets: 2000,
    soldTickets: 1456,
    status: 'active',
    drawAt: '2026-02-07',
    timeRemaining: '8d 4h 12m'
  }
];

const mockWinners: Winner[] = [
  { lotteryTitle: 'Gran Sorteo Navideño', winnerName: 'Usuario***123', prize: 100000, date: '2025-12-25' },
  { lotteryTitle: 'Lotería de Año Nuevo', winnerName: 'Creador***456', prize: 75000, date: '2026-01-01' },
];

export function LotterySection() {
  const [selectedLottery, setSelectedLottery] = useState<Lottery | null>(null);
  const [ticketCount, setTicketCount] = useState(1);

  const getStatusBadge = (status: Lottery['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50">Activa</Badge>;
      case 'drawing':
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50 animate-pulse">Sorteando</Badge>;
      case 'completed':
        return <Badge variant="secondary">Finalizada</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-orbitron text-2xl md:text-3xl font-bold gradient-text mb-2">
          Lotería TAMV
        </h1>
        <p className="text-muted-foreground">
          Sorteos con economía justa y transparencia total en BookPI
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <GlassCard className="text-center p-4">
          <Coins className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="font-orbitron text-2xl font-bold">75K</div>
          <div className="text-sm text-muted-foreground">QS en Premios</div>
        </GlassCard>
        <GlassCard className="text-center p-4">
          <Ticket className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="font-orbitron text-2xl font-bold">8.9K</div>
          <div className="text-sm text-muted-foreground">Boletos Vendidos</div>
        </GlassCard>
        <GlassCard className="text-center p-4">
          <Users className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="font-orbitron text-2xl font-bold">2.3K</div>
          <div className="text-sm text-muted-foreground">Participantes</div>
        </GlassCard>
        <GlassCard className="text-center p-4">
          <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="font-orbitron text-2xl font-bold">47</div>
          <div className="text-sm text-muted-foreground">Ganadores</div>
        </GlassCard>
      </motion.div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Sorteos Activos</TabsTrigger>
          <TabsTrigger value="mytickets">Mis Boletos</TabsTrigger>
          <TabsTrigger value="winners">Ganadores</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {mockLotteries.map((lottery, index) => (
            <motion.div
              key={lottery.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <GlassCard className="overflow-hidden" glow={index === 0 ? 'gold' : undefined}>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusBadge(lottery.status)}
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {lottery.timeRemaining}
                        </div>
                      </div>
                      <h3 className="font-orbitron text-xl font-bold">{lottery.title}</h3>
                      <p className="text-muted-foreground">{lottery.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Premio Total</div>
                      <div className="font-orbitron text-3xl font-bold text-primary">
                        {lottery.prizePool.toLocaleString()} QS
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-background/50 rounded-lg p-3 text-center">
                      <div className="text-sm text-muted-foreground">Precio</div>
                      <div className="font-bold">{lottery.ticketPrice} QS</div>
                    </div>
                    <div className="bg-background/50 rounded-lg p-3 text-center">
                      <div className="text-sm text-muted-foreground">Vendidos</div>
                      <div className="font-bold">{lottery.soldTickets.toLocaleString()}</div>
                    </div>
                    <div className="bg-background/50 rounded-lg p-3 text-center">
                      <div className="text-sm text-muted-foreground">Disponibles</div>
                      <div className="font-bold">{(lottery.maxTickets - lottery.soldTickets).toLocaleString()}</div>
                    </div>
                    <div className="bg-background/50 rounded-lg p-3 text-center">
                      <div className="text-sm text-muted-foreground">Probabilidad</div>
                      <div className="font-bold">1/{(lottery.maxTickets / 100).toFixed(0)}</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Boletos vendidos</span>
                      <span>{Math.round((lottery.soldTickets / lottery.maxTickets) * 100)}%</span>
                    </div>
                    <Progress value={(lottery.soldTickets / lottery.maxTickets) * 100} />
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                      >
                        -
                      </Button>
                      <span className="w-12 text-center font-bold">{ticketCount}</span>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setTicketCount(ticketCount + 1)}
                      >
                        +
                      </Button>
                    </div>
                    <Button className="flex-1 gap-2">
                      <Ticket className="w-5 h-5" />
                      Comprar ({ticketCount * lottery.ticketPrice} QS)
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="mytickets">
          <GlassCard className="text-center py-12">
            <Ticket className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-orbitron text-lg font-bold mb-2">No tienes boletos activos</h3>
            <p className="text-muted-foreground mb-4">Compra boletos para participar en los sorteos</p>
            <Button>Ver Sorteos</Button>
          </GlassCard>
        </TabsContent>

        <TabsContent value="winners">
          <div className="space-y-4">
            {mockWinners.map((winner, index) => (
              <GlassCard key={index}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-background" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{winner.lotteryTitle}</h4>
                    <p className="text-sm text-muted-foreground">{winner.winnerName}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-orbitron font-bold text-primary">{winner.prize.toLocaleString()} QS</div>
                    <div className="text-sm text-muted-foreground">{winner.date}</div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
