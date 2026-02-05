 import { useState, useEffect, useCallback } from 'react';
 import { supabase } from '@/integrations/supabase/client';
 import type { RealtimeChannel } from '@supabase/supabase-js';
 
 interface UseRealtimeOptions {
   table: string;
   filter?: { column: string; value: string };
   orderBy?: { column: string; ascending?: boolean };
   limit?: number;
   enabled?: boolean;
 }
 
 export function useRealtimeData({
   table,
   filter,
   orderBy,
   limit = 50,
   enabled = true
 }: UseRealtimeOptions) {
   const [data, setData] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
 
   const fetchData = useCallback(async () => {
     if (!enabled) return;
     
     try {
       setLoading(true);
       // Use any to avoid deep type instantiation issues
       const { data: result, error: fetchError } = await (supabase as any)
         .from(table)
         .select('*')
         .order(orderBy?.column || 'created_at', { ascending: orderBy?.ascending ?? false })
         .limit(limit);
       
       if (fetchError) throw fetchError;
       setData(result || []);
       setError(null);
     } catch (err) {
       const e = err as Error;
       setError(e.message);
       console.error(`[REALTIME] Error fetching ${table}:`, e.message);
     } finally {
       setLoading(false);
     }
   }, [table, filter?.column, filter?.value, orderBy?.column, orderBy?.ascending, limit, enabled]);
 
   useEffect(() => {
     fetchData();
   }, [fetchData]);
 
   useEffect(() => {
     if (!enabled) return;
 
     const channel: RealtimeChannel = supabase
       .channel(`${table}_changes`)
       .on(
         'postgres_changes',
         { event: '*', schema: 'public', table },
         (payload) => {
           console.log(`[REALTIME] ${table} change:`, payload.eventType);
           
           if (payload.eventType === 'INSERT') {
             setData(prev => [payload.new as any, ...prev].slice(0, limit));
           } else if (payload.eventType === 'UPDATE') {
             setData(prev => prev.map(item => 
               item.id === (payload.new as any).id ? payload.new as any : item
             ));
           } else if (payload.eventType === 'DELETE') {
             setData(prev => prev.filter(item => item.id !== (payload.old as any).id));
           }
         }
       )
       .subscribe();
 
     return () => {
       supabase.removeChannel(channel);
     };
   }, [table, limit, enabled]);
 
   return { data, loading, error, refetch: fetchData };
 }
 
 // Specific hooks for common data types
 export function usePosts() {
   return useRealtimeData({
     table: 'posts',
     orderBy: { column: 'created_at', ascending: false },
     limit: 20
   });
 }
 
 export function useMessages(threadId?: string) {
   return useRealtimeData({
     table: 'messages',
     filter: threadId ? { column: 'thread_id', value: threadId } : undefined,
     orderBy: { column: 'created_at', ascending: true },
     limit: 100,
     enabled: !!threadId
   });
 }
 
 export function useNotifications(userId?: string) {
   return useRealtimeData({
     table: 'notifications',
     filter: userId ? { column: 'user_id', value: userId } : undefined,
     orderBy: { column: 'created_at', ascending: false },
     limit: 50,
     enabled: !!userId
   });
 }
 
 export function useConcerts() {
   return useRealtimeData({
     table: 'concerts',
     orderBy: { column: 'starts_at', ascending: true },
     limit: 20
   });
 }
 
 export function useLotteries() {
   return useRealtimeData({
     table: 'lotteries',
     orderBy: { column: 'draw_at', ascending: true },
     limit: 10
   });
 }
 
 export function useCourses() {
   return useRealtimeData({
     table: 'courses',
     orderBy: { column: 'created_at', ascending: false },
     limit: 20
   });
 }