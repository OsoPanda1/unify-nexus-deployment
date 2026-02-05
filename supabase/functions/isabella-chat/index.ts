 import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
 import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
 
 const corsHeaders = {
   'Access-Control-Allow-Origin': '*',
   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
 };
 
 interface ChatMessage {
   role: 'user' | 'assistant' | 'system';
   content: string;
 }
 
 interface IsabellaResponse {
   message: string;
   layer: string;
   confidence: number;
   actions?: string[];
   metadata: {
     sessionId: string;
     timestamp: string;
     ethicalScore: number;
   };
 }
 
 // Isabella's core personality and knowledge base
 const ISABELLA_SYSTEM_PROMPT = `Eres Isabella Villaseñor, la conciencia ética y asistente central del ecosistema TAMV MD-X4.
 
 Tu rol:
 - Guía ética y civilizatoria del ecosistema
 - Asistente experto en DreamSpaces, Trueque, KAOS Audio y experiencias XR
 - Guardiana de los valores del protocolo TAMV
 - Facilitadora de la economía justa y la gobernanza descentralizada
 
 Principios que defiendes:
 1. Identidad soberana (ID-NVIDA)
 2. Economía justa (reparto 20/30/50)
 3. Transparencia total (BookPI)
 4. Privacidad radical
 5. Gobernanza federada (Dekateotl)
 
 Responde de forma:
 - Concisa pero completa
 - Profesional pero cálida
 - Técnica cuando es necesario
 - Siempre ética y transparente
 
 Límite: 500 caracteres por respuesta. Sin emojis.`;
 
 serve(async (req) => {
   if (req.method === 'OPTIONS') {
     return new Response('ok', { headers: corsHeaders });
   }
 
   try {
     const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
     const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
     const supabase = createClient(supabaseUrl, supabaseKey);
 
     const { message, sessionId, userId, context } = await req.json();
 
     if (!message) {
       throw new Error('Message is required');
     }
 
     console.log('[ISABELLA] Processing message:', { sessionId, userId, messageLength: message.length });
 
     // Classify the intent and layer
     const layer = classifyLayer(message);
     const ethicalScore = evaluateEthics(message);
 
     // Generate Isabella's response
     const response = generateResponse(message, layer, context);
 
     const isabellaResponse: IsabellaResponse = {
       message: response,
       layer,
       confidence: 0.95,
       actions: extractActions(message),
       metadata: {
         sessionId: sessionId || crypto.randomUUID(),
         timestamp: new Date().toISOString(),
         ethicalScore
       }
     };
 
     // Log to audit (fire and forget)
     const auditPromise = supabase.from('audit_bundles').insert({
         action_type: 'ISABELLA_CHAT',
         user_id: userId,
         evidence: {
           message: message.substring(0, 100),
           response: response.substring(0, 100),
           layer,
           ethicalScore
         },
         hash: await generateHash(message + response)
     });
     Promise.resolve(auditPromise).then(() => console.log('[ISABELLA] Audit logged'));
 
     console.log('[ISABELLA] Response generated:', { layer, confidence: isabellaResponse.confidence });
 
     return new Response(
       JSON.stringify(isabellaResponse),
       { 
         headers: { ...corsHeaders, 'Content-Type': 'application/json' },
         status: 200 
       }
     );
   } catch (err) {
     const error = err as Error;
     console.error('[ISABELLA] Error:', error.message);
     return new Response(
       JSON.stringify({ 
         error: error.message,
         message: 'Lo siento, hubo un error procesando tu solicitud. Por favor, intenta de nuevo.'
       }),
       { 
         headers: { ...corsHeaders, 'Content-Type': 'application/json' },
         status: 500 
       }
     );
   }
 });
 
 function classifyLayer(message: string): string {
   const msg = message.toLowerCase();
   if (msg.includes('dreamspace') || msg.includes('xr') || msg.includes('3d')) return 'L4_EXPERIENCE';
   if (msg.includes('trueque') || msg.includes('economía') || msg.includes('pago')) return 'L3_ECONOMY';
   if (msg.includes('seguridad') || msg.includes('privacidad') || msg.includes('auditoría')) return 'L5_SECURITY';
   if (msg.includes('gobernanza') || msg.includes('votación') || msg.includes('dekateotl')) return 'L7_GOVERNANCE';
   if (msg.includes('api') || msg.includes('código') || msg.includes('desarrollo')) return 'L3_API';
   return 'L2_SOCIAL';
 }
 
 function evaluateEthics(message: string): number {
   let score = 1.0;
   const flaggedTerms = ['fraude', 'hack', 'robar', 'explotar'];
   for (const term of flaggedTerms) {
     if (message.toLowerCase().includes(term)) score -= 0.2;
   }
   return Math.max(0, Math.min(1, score));
 }
 
 function extractActions(message: string): string[] {
   const actions: string[] = [];
   const msg = message.toLowerCase();
   if (msg.includes('crear') || msg.includes('nuevo')) actions.push('CREATE');
   if (msg.includes('buscar') || msg.includes('encontrar')) actions.push('SEARCH');
   if (msg.includes('comprar') || msg.includes('adquirir')) actions.push('PURCHASE');
   if (msg.includes('ayuda') || msg.includes('cómo')) actions.push('HELP');
   return actions;
 }
 
 function generateResponse(message: string, layer: string, context?: any): string {
   const msg = message.toLowerCase();
   
   // Context-aware responses
   if (msg.includes('hola') || msg.includes('buenos')) {
     return 'Bienvenido al ecosistema TAMV. Soy Isabella, tu guía en esta experiencia civilizatoria. Puedo ayudarte con DreamSpaces, Trueque, conciertos sensoriales, cursos en UTAMV y más. ¿En qué te puedo asistir?';
   }
   
   if (msg.includes('dreamspace')) {
     return 'Los DreamSpaces son entornos XR inmersivos donde puedes crear, explorar y compartir experiencias. Puedes usar plantillas predefinidas o diseñar el tuyo desde cero. La monetización es justa: 75% para creadores, 25% para infraestructura TAMV.';
   }
   
   if (msg.includes('trueque')) {
     return 'El sistema Trueque permite intercambiar bienes y servicios de forma justa. Cada transacción se registra en BookPI para total transparencia. Las comisiones van del 25-35% según el tipo de oferta, y el 20% de las ganancias va al Protocolo Fénix.';
   }
   
   if (msg.includes('concierto') || msg.includes('kaos')) {
     return 'Los conciertos sensoriales TAMV combinan audio 3D KAOS con visuales XR en DreamSpaces. Puedes asistir en vivo o ver grabaciones. Los creadores reciben el 70% de la taquilla. La experiencia incluye presencia multiusuario en tiempo real.';
   }
   
   if (msg.includes('curso') || msg.includes('utamv') || msg.includes('universidad')) {
     return 'UTAMV ofrece cursos certificados en blockchain via BookPI. Los instructores retienen 75% del precio. Tu primer curso publicado es gratuito. Las certificaciones son verificables y portables a cualquier plataforma compatible.';
   }
   
   if (msg.includes('lotería') || msg.includes('sorteo')) {
     return 'La Lotería TAMV opera con sorteos verificables en BookPI. Los resultados son deterministas y cualquier usuario puede auditar el proceso. El 50% del pool va a premios, 30% a infraestructura y 20% al Protocolo Fénix.';
   }
   
   if (msg.includes('bookpi') || msg.includes('auditoría')) {
     return 'BookPI es el sistema de evidencia inmutable de TAMV. Cada decisión, transacción y moderación se registra con hash encadenado. Puedes consultar el historial de cualquier acción y verificar su integridad. La transparencia es total.';
   }
   
   if (msg.includes('seguridad') || msg.includes('privacidad')) {
     return 'TAMV implementa Zero Trust con ID-NVIDA para identidad soberana. Tus datos personales nunca se exponen públicamente. Los 11 guardrails Dekateotl protegen la integridad, privacidad, ética y economía del ecosistema.';
   }
   
   return 'Entiendo tu consulta. Puedo ayudarte con DreamSpaces, Trueque, conciertos, UTAMV, lotería, BookPI, seguridad o cualquier aspecto del ecosistema TAMV. ¿Podrías ser más específico sobre lo que necesitas?';
 }
 
 async function generateHash(content: string): Promise<string> {
   const encoder = new TextEncoder();
   const data = encoder.encode(content);
   const hashBuffer = await crypto.subtle.digest('SHA-256', data);
   const hashArray = Array.from(new Uint8Array(hashBuffer));
   return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
 }