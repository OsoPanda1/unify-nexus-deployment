 import { useState, useCallback } from 'react';
 import { supabase } from '@/integrations/supabase/client';
 
 interface IsabellaMessage {
   id: string;
   role: 'user' | 'assistant';
   content: string;
   layer?: string;
   timestamp: Date;
 }
 
 interface IsabellaMeta {
   sessionId: string;
   conversationHash: string;
   layer: string;
   ethicalState: 'normal' | 'sensitive' | 'critical';
   riskLevel: 'low' | 'medium' | 'high';
   governanceFlag: string;
   hitlRequired: boolean;
   aignScore: number;
   isCreator: boolean;
 }
 
 export function useIsabella() {
   const [messages, setMessages] = useState<IsabellaMessage[]>([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [meta, setMeta] = useState<IsabellaMeta>({
     sessionId: crypto.randomUUID(),
     conversationHash: 'init',
     layer: 'L2_SOCIAL',
     ethicalState: 'normal',
     riskLevel: 'low',
     governanceFlag: 'STANDARD',
     hitlRequired: false,
     aignScore: 100,
     isCreator: false
   });
 
   const sendMessage = useCallback(async (content: string, userId?: string) => {
     setLoading(true);
     setError(null);
 
     // Add user message immediately
     const userMessage: IsabellaMessage = {
       id: crypto.randomUUID(),
       role: 'user',
       content,
       timestamp: new Date()
     };
     setMessages(prev => [...prev, userMessage]);
 
     try {
       const { data, error: fnError } = await supabase.functions.invoke('isabella-chat', {
         body: {
           message: content,
           sessionId: meta.sessionId,
           userId,
           context: { previousMessages: messages.slice(-5) }
         }
       });
 
       if (fnError) throw fnError;
 
       // Add assistant response
       const assistantMessage: IsabellaMessage = {
         id: crypto.randomUUID(),
         role: 'assistant',
         content: data.message,
         layer: data.layer,
         timestamp: new Date()
       };
       setMessages(prev => [...prev, assistantMessage]);
 
       // Update meta
       setMeta(prev => ({
         ...prev,
         layer: data.layer,
         conversationHash: data.metadata?.sessionId || prev.conversationHash,
         aignScore: Math.round((data.metadata?.ethicalScore || 1) * 100)
       }));
 
       return data;
     } catch (err) {
       const e = err as Error;
       setError(e.message);
       console.error('[ISABELLA] Error:', e.message);
       
       // Add error message
       const errorMessage: IsabellaMessage = {
         id: crypto.randomUUID(),
         role: 'assistant',
         content: 'Lo siento, hubo un problema procesando tu mensaje. Por favor, intenta de nuevo.',
         timestamp: new Date()
       };
       setMessages(prev => [...prev, errorMessage]);
       throw e;
     } finally {
       setLoading(false);
     }
   }, [meta.sessionId, messages]);
 
   const clearConversation = useCallback(() => {
     setMessages([]);
     setMeta(prev => ({
       ...prev,
       sessionId: crypto.randomUUID(),
       conversationHash: 'init',
       layer: 'L2_SOCIAL'
     }));
   }, []);
 
   return {
     messages,
     loading,
     error,
     meta,
     sendMessage,
     clearConversation
   };
 }