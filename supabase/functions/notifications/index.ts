 import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
 import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
 
 const corsHeaders = {
   'Access-Control-Allow-Origin': '*',
   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
 };
 
 interface NotificationPayload {
   userId: string;
   type: 'message' | 'like' | 'follow' | 'economy' | 'security' | 'concert' | 'lottery';
   title: string;
   body?: string;
   payload?: Record<string, any>;
   priority?: number;
 }
 
 serve(async (req) => {
   if (req.method === 'OPTIONS') {
     return new Response('ok', { headers: corsHeaders });
   }
 
   try {
     const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
     const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
     const supabase = createClient(supabaseUrl, supabaseKey);
 
     const url = new URL(req.url);
     const action = url.pathname.split('/').pop();
 
     if (req.method === 'POST' && action === 'send') {
       const notification: NotificationPayload = await req.json();
 
       if (!notification.userId || !notification.type || !notification.title) {
         throw new Error('Missing required fields: userId, type, title');
       }
 
       console.log('[NOTIFICATIONS] Sending:', { userId: notification.userId, type: notification.type });
 
       const { data, error } = await supabase
         .from('notifications')
         .insert({
           user_id: notification.userId,
           type: notification.type,
           title: notification.title,
           body: notification.body,
           payload: notification.payload || {},
           priority: notification.priority || 1,
           is_read: false
         })
         .select()
         .single();
 
       if (error) throw error;
 
       console.log('[NOTIFICATIONS] Sent:', { id: data.id });
 
       return new Response(
         JSON.stringify({ success: true, notification: data }),
         { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
       );
     }
 
     if (req.method === 'GET' && action === 'list') {
       const userId = url.searchParams.get('userId');
       const limit = parseInt(url.searchParams.get('limit') || '50');
       const unreadOnly = url.searchParams.get('unreadOnly') === 'true';
 
       if (!userId) throw new Error('userId is required');
 
       let query = supabase
         .from('notifications')
         .select('*')
         .eq('user_id', userId)
         .order('created_at', { ascending: false })
         .limit(limit);
 
       if (unreadOnly) {
         query = query.eq('is_read', false);
       }
 
       const { data, error } = await query;
       if (error) throw error;
 
       return new Response(
         JSON.stringify({ notifications: data, count: data.length }),
         { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
       );
     }
 
     if (req.method === 'POST' && action === 'mark-read') {
       const { notificationIds, userId } = await req.json();
 
       if (!notificationIds || !Array.isArray(notificationIds)) {
         throw new Error('notificationIds array is required');
       }
 
       const { error } = await supabase
         .from('notifications')
         .update({ is_read: true })
         .in('id', notificationIds)
         .eq('user_id', userId);
 
       if (error) throw error;
 
       console.log('[NOTIFICATIONS] Marked as read:', { count: notificationIds.length });
 
       return new Response(
         JSON.stringify({ success: true, markedCount: notificationIds.length }),
         { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
       );
     }
 
     if (req.method === 'GET' && action === 'badge') {
       const userId = url.searchParams.get('userId');
       if (!userId) throw new Error('userId is required');
 
       const { data, error } = await supabase
         .from('notifications')
         .select('type')
         .eq('user_id', userId)
         .eq('is_read', false);
 
       if (error) throw error;
 
       const badge = {
         total: data.length,
         byType: data.reduce((acc, n) => {
           acc[n.type] = (acc[n.type] || 0) + 1;
           return acc;
         }, {} as Record<string, number>)
       };
 
       return new Response(
         JSON.stringify(badge),
         { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
       );
     }
 
     throw new Error('Invalid action');
   } catch (err) {
     const error = err as Error;
     console.error('[NOTIFICATIONS] Error:', error.message);
     return new Response(
       JSON.stringify({ error: error.message }),
       { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
     );
   }
 });