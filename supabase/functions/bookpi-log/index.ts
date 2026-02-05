 import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
 import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
 
 const corsHeaders = {
   'Access-Control-Allow-Origin': '*',
   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
 };
 
 interface BookPIEvent {
   type: string;
   entityType: string;
   entityId: string;
   action: string;
   actorId?: string;
   evidence: Record<string, any>;
   prevHash?: string;
 }
 
 // In-memory last hash for chain (in production, fetch from DB)
 let lastKnownHash = 'GENESIS_TAMV_MD_X4';
 
 serve(async (req) => {
   if (req.method === 'OPTIONS') {
     return new Response('ok', { headers: corsHeaders });
   }
 
   try {
     const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
     const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
     const supabase = createClient(supabaseUrl, supabaseKey);
 
     const event: BookPIEvent = await req.json();
 
     if (!event.type || !event.entityType || !event.action) {
       throw new Error('Missing required fields: type, entityType, action');
     }
 
     console.log('[BOOKPI] Recording event:', { type: event.type, action: event.action });
 
     // Get the last hash from database for proper chaining
     const { data: lastBundle } = await supabase
       .from('audit_bundles')
       .select('hash')
       .order('created_at', { ascending: false })
       .limit(1)
       .single();
 
     const prevHash = lastBundle?.hash || lastKnownHash;
 
     // Generate new hash
     const hashContent = JSON.stringify({
       prevHash,
       event,
       timestamp: new Date().toISOString()
     });
     const newHash = await generateHash(hashContent);
 
     // Insert audit bundle
     const { data, error } = await supabase
       .from('audit_bundles')
       .insert({
         action_type: `${event.entityType}_${event.action}`,
         user_id: event.actorId || null,
         evidence: {
           ...event.evidence,
           entityId: event.entityId,
           prevHash
         },
         hash: newHash,
         anchored: true
       })
       .select()
       .single();
 
     if (error) {
       console.error('[BOOKPI] Database error:', error);
       throw error;
     }
 
     // Update last known hash
     lastKnownHash = newHash;
 
     console.log('[BOOKPI] Event recorded:', { id: data.id, hash: newHash.substring(0, 16) });
 
     return new Response(
       JSON.stringify({
         success: true,
         bundleId: data.id,
         hash: newHash,
         prevHash,
         timestamp: data.created_at
       }),
       { 
         headers: { ...corsHeaders, 'Content-Type': 'application/json' },
         status: 200 
       }
     );
   } catch (err) {
     const error = err as Error;
     console.error('[BOOKPI] Error:', error.message);
     return new Response(
       JSON.stringify({ error: error.message }),
       { 
         headers: { ...corsHeaders, 'Content-Type': 'application/json' },
         status: 500 
       }
     );
   }
 });
 
 async function generateHash(content: string): Promise<string> {
   const encoder = new TextEncoder();
   const data = encoder.encode(content);
   const hashBuffer = await crypto.subtle.digest('SHA-256', data);
   const hashArray = Array.from(new Uint8Array(hashBuffer));
   return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
 }