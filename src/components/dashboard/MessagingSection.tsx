import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Send, 
  Phone, 
  Video, 
  MoreVertical,
  Paperclip,
  Smile,
  Check,
  CheckCheck
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface Thread {
  id: string;
  participant: {
    name: string;
    avatar: string;
    isOnline: boolean;
  };
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isPaidSession: boolean;
}

interface Message {
  id: string;
  content: string;
  isOwn: boolean;
  timestamp: string;
  isRead: boolean;
}

const mockThreads: Thread[] = [
  {
    id: '1',
    participant: { name: 'Isabella IA', avatar: '/src/assets/isabella-avatar.jpg', isOnline: true },
    lastMessage: 'Análisis de gobernanza completado',
    timestamp: '12:45',
    unreadCount: 2,
    isPaidSession: false
  },
  {
    id: '2',
    participant: { name: 'KAOS Studio', avatar: '', isOnline: true },
    lastMessage: 'Los presets están listos',
    timestamp: '11:30',
    unreadCount: 0,
    isPaidSession: false
  },
  {
    id: '3',
    participant: { name: 'Consultoría TAMV', avatar: '', isOnline: false },
    lastMessage: 'Sesión de asesoría programada',
    timestamp: 'Ayer',
    unreadCount: 0,
    isPaidSession: true
  }
];

const mockMessages: Message[] = [
  { id: '1', content: 'Hola, necesito ayuda con la configuración de mi DreamSpace', isOwn: true, timestamp: '12:30', isRead: true },
  { id: '2', content: 'Por supuesto. Puedo guiarte paso a paso. ¿Cuál es el tema principal que deseas explorar en tu espacio?', isOwn: false, timestamp: '12:32', isRead: true },
  { id: '3', content: 'Estoy pensando en un ambiente azteca-futurista para eventos XR', isOwn: true, timestamp: '12:35', isRead: true },
  { id: '4', content: 'Excelente elección. Te recomiendo comenzar con la plantilla "Obsidiana Imperial" y personalizar los materiales PBR para lograr el efecto deseado.', isOwn: false, timestamp: '12:40', isRead: true },
  { id: '5', content: 'Análisis de gobernanza completado. Tu DreamSpace cumple con los 11 guardrails de Dekateotl.', isOwn: false, timestamp: '12:45', isRead: false },
];

export function MessagingSection() {
  const [selectedThread, setSelectedThread] = useState<Thread | null>(mockThreads[0]);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    // TODO: Implement real message sending
    setMessage('');
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-orbitron text-2xl md:text-3xl font-bold gradient-text mb-2">
          Mensajes
        </h1>
        <p className="text-muted-foreground">
          Conversaciones directas y sesiones de asesoría
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-280px)] min-h-[500px]"
      >
        {/* Thread List */}
        <GlassCard className="lg:col-span-1 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border/50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar conversaciones..." 
                className="pl-10 bg-background/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {mockThreads.map((thread) => (
              <button
                key={thread.id}
                onClick={() => setSelectedThread(thread)}
                className={cn(
                  "w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors border-b border-border/30",
                  selectedThread?.id === thread.id && "bg-primary/10"
                )}
              >
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={thread.participant.avatar} />
                    <AvatarFallback>{thread.participant.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {thread.participant.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-background" />
                  )}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium truncate">{thread.participant.name}</span>
                    <span className="text-xs text-muted-foreground">{thread.timestamp}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground truncate">{thread.lastMessage}</span>
                    {thread.unreadCount > 0 && (
                      <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                        {thread.unreadCount}
                      </span>
                    )}
                  </div>
                  {thread.isPaidSession && (
                    <span className="text-xs text-amber-500 font-jetbrains">SESIÓN PAGADA</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Chat Area */}
        <GlassCard className="lg:col-span-2 flex flex-col overflow-hidden">
          {selectedThread ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedThread.participant.avatar} />
                    <AvatarFallback>{selectedThread.participant.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{selectedThread.participant.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {selectedThread.participant.isOnline ? 'En línea' : 'Desconectado'}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {mockMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex",
                      msg.isOwn ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[70%] p-3 rounded-2xl",
                        msg.isOwn 
                          ? "bg-primary text-primary-foreground rounded-br-md" 
                          : "bg-muted rounded-bl-md"
                      )}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <div className={cn(
                        "flex items-center gap-1 mt-1",
                        msg.isOwn ? "justify-end" : "justify-start"
                      )}>
                        <span className="text-xs opacity-70">{msg.timestamp}</span>
                        {msg.isOwn && (
                          msg.isRead 
                            ? <CheckCheck className="w-4 h-4 text-cyan-400" />
                            : <Check className="w-4 h-4 opacity-70" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="w-5 h-5" />
                  </Button>
                  <Input
                    placeholder="Escribe un mensaje..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1 bg-background/50"
                  />
                  <Button variant="ghost" size="icon">
                    <Smile className="w-5 h-5" />
                  </Button>
                  <Button size="icon" onClick={handleSend} disabled={!message.trim()}>
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              Selecciona una conversación para comenzar
            </div>
          )}
        </GlassCard>
      </motion.div>
    </div>
  );
}
