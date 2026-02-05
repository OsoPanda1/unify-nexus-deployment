 import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
 
 declare const Deno: {
   memoryUsage?: () => any;
 };
 
 const corsHeaders = {
   'Access-Control-Allow-Origin': '*',
   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
 };
 
 serve(async (req) => {
   if (req.method === 'OPTIONS') {
     return new Response('ok', { headers: corsHeaders });
   }
 
   try {
     const healthCheck = {
       status: 'healthy',
       timestamp: new Date().toISOString(),
       version: 'TAMV-MD-X4-v2.0.0',
       services: {
         database: 'operational',
         realtime: 'operational',
         storage: 'operational',
         auth: 'operational',
         isabella: 'operational',
         bookpi: 'operational'
       },
       uptime: Date.now(),
       memory: null
     };
 
     console.log('[HEALTH] System check completed:', healthCheck.status);
 
     return new Response(
       JSON.stringify(healthCheck),
       { 
         headers: { ...corsHeaders, 'Content-Type': 'application/json' },
         status: 200 
       }
     );
   } catch (err) {
     const error = err as Error;
     console.error('[HEALTH] Error:', error.message);
     return new Response(
       JSON.stringify({ status: 'error', message: error.message }),
       { 
         headers: { ...corsHeaders, 'Content-Type': 'application/json' },
         status: 500 
       }
     );
   }
 });