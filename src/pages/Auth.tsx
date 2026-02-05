 import { useState } from 'react';
 import { motion } from 'framer-motion';
 import { useNavigate } from 'react-router-dom';
 import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Label } from '@/components/ui/label';
 import { GlassCard } from '@/components/ui/GlassCard';
 import { useAuth } from '@/hooks/useAuth';
 import { useToast } from '@/hooks/use-toast';
 
 export default function Auth() {
   const [mode, setMode] = useState<'login' | 'register' | 'reset'>('login');
   const [showPassword, setShowPassword] = useState(false);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [displayName, setDisplayName] = useState('');
   const [isSubmitting, setIsSubmitting] = useState(false);
   
   const { signIn, signUp, resetPassword } = useAuth();
   const { toast } = useToast();
   const navigate = useNavigate();
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setIsSubmitting(true);
 
     try {
       if (mode === 'login') {
         await signIn(email, password);
         toast({ title: 'Bienvenido', description: 'Has iniciado sesión correctamente' });
         navigate('/');
       } else if (mode === 'register') {
         await signUp(email, password, displayName);
         toast({ 
           title: 'Cuenta creada', 
           description: 'Revisa tu correo para verificar tu cuenta' 
         });
       } else {
         await resetPassword(email);
         toast({ 
           title: 'Correo enviado', 
           description: 'Revisa tu bandeja para restablecer tu contraseña' 
         });
         setMode('login');
       }
     } catch (err) {
       const error = err as Error;
       toast({ 
         title: 'Error', 
         description: error.message,
         variant: 'destructive'
       });
     } finally {
       setIsSubmitting(false);
     }
   };
 
   return (
     <div className="min-h-screen bg-background flex items-center justify-center p-4">
       {/* Background effects */}
       <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
         <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px]" />
         <div className="absolute inset-0 grid-pattern opacity-20" />
       </div>
 
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="w-full max-w-md relative z-10"
       >
         <GlassCard glow="cyan" className="p-8">
           {/* Header */}
           <div className="text-center mb-8">
             <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center">
               <Sparkles className="w-8 h-8 text-primary" />
             </div>
             <h1 className="font-orbitron text-2xl font-bold gradient-text mb-2">
               TAMV MD-X4
             </h1>
             <p className="text-muted-foreground text-sm">
               {mode === 'login' && 'Inicia sesión en el ecosistema'}
               {mode === 'register' && 'Crea tu identidad soberana'}
               {mode === 'reset' && 'Recupera tu acceso'}
             </p>
           </div>
 
           {/* Form */}
           <form onSubmit={handleSubmit} className="space-y-4">
             {mode === 'register' && (
               <div className="space-y-2">
                 <Label htmlFor="displayName">Nombre de usuario</Label>
                 <div className="relative">
                   <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                   <Input
                     id="displayName"
                     type="text"
                     value={displayName}
                     onChange={(e) => setDisplayName(e.target.value)}
                     placeholder="Tu nombre en TAMV"
                     className="pl-10"
                     required
                   />
                 </div>
               </div>
             )}
 
             <div className="space-y-2">
               <Label htmlFor="email">Correo electrónico</Label>
               <div className="relative">
                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                 <Input
                   id="email"
                   type="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="tu@email.com"
                   className="pl-10"
                   required
                 />
               </div>
             </div>
 
             {mode !== 'reset' && (
               <div className="space-y-2">
                 <Label htmlFor="password">Contraseña</Label>
                 <div className="relative">
                   <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                   <Input
                     id="password"
                     type={showPassword ? 'text' : 'password'}
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     placeholder="••••••••"
                     className="pl-10 pr-10"
                     required
                     minLength={6}
                   />
                   <button
                     type="button"
                     onClick={() => setShowPassword(!showPassword)}
                     className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                   >
                     {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                   </button>
                 </div>
               </div>
             )}
 
             <Button 
               type="submit" 
               className="w-full gap-2"
               disabled={isSubmitting}
             >
               {isSubmitting ? (
                 <span className="animate-pulse">Procesando...</span>
               ) : (
                 <>
                   {mode === 'login' && 'Iniciar Sesión'}
                   {mode === 'register' && 'Crear Cuenta'}
                   {mode === 'reset' && 'Enviar Enlace'}
                   <ArrowRight className="w-4 h-4" />
                 </>
               )}
             </Button>
           </form>
 
           {/* Mode switcher */}
           <div className="mt-6 pt-6 border-t border-border text-center text-sm">
             {mode === 'login' && (
               <>
                 <button 
                   onClick={() => setMode('reset')}
                   className="text-muted-foreground hover:text-primary transition-colors"
                 >
                   ¿Olvidaste tu contraseña?
                 </button>
                 <div className="mt-3">
                   ¿No tienes cuenta?{' '}
                   <button 
                     onClick={() => setMode('register')}
                     className="text-primary hover:underline font-medium"
                   >
                     Regístrate
                   </button>
                 </div>
               </>
             )}
             {mode === 'register' && (
               <div>
                 ¿Ya tienes cuenta?{' '}
                 <button 
                   onClick={() => setMode('login')}
                   className="text-primary hover:underline font-medium"
                 >
                   Inicia sesión
                 </button>
               </div>
             )}
             {mode === 'reset' && (
               <button 
                 onClick={() => setMode('login')}
                 className="text-primary hover:underline font-medium"
               >
                 Volver al inicio de sesión
               </button>
             )}
           </div>
         </GlassCard>
 
         {/* Footer */}
         <p className="text-center text-xs text-muted-foreground mt-6">
           Al continuar, aceptas los términos del ecosistema TAMV y la gobernanza Dekateotl
         </p>
       </motion.div>
     </div>
   );
 }