 import { useState, useEffect, createContext, useContext } from 'react';
 import { supabase } from '@/integrations/supabase/client';
 import type { User, Session } from '@supabase/supabase-js';
 
 interface AuthState {
   user: User | null;
   session: Session | null;
   loading: boolean;
   error: string | null;
 }
 
 interface AuthContextType extends AuthState {
   signIn: (email: string, password: string) => Promise<void>;
   signUp: (email: string, password: string, displayName?: string) => Promise<void>;
   signOut: () => Promise<void>;
   resetPassword: (email: string) => Promise<void>;
 }
 
 export function useAuth(): AuthContextType {
   const [state, setState] = useState<AuthState>({
     user: null,
     session: null,
     loading: true,
     error: null
   });
 
   useEffect(() => {
     // Get initial session
     supabase.auth.getSession().then(({ data: { session } }) => {
       setState(prev => ({
         ...prev,
         session,
         user: session?.user ?? null,
         loading: false
       }));
     });
 
     // Listen for auth changes
     const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
       setState(prev => ({
         ...prev,
         session,
         user: session?.user ?? null,
         loading: false
       }));
     });
 
     return () => subscription.unsubscribe();
   }, []);
 
   const signIn = async (email: string, password: string) => {
     setState(prev => ({ ...prev, loading: true, error: null }));
     try {
       const { error } = await supabase.auth.signInWithPassword({ email, password });
       if (error) throw error;
     } catch (err) {
       const error = err as Error;
       setState(prev => ({ ...prev, error: error.message, loading: false }));
       throw error;
     }
   };
 
   const signUp = async (email: string, password: string, displayName?: string) => {
     setState(prev => ({ ...prev, loading: true, error: null }));
     try {
       const { error, data } = await supabase.auth.signUp({ 
         email, 
         password,
         options: {
           data: { display_name: displayName }
         }
       });
       if (error) throw error;
       
       // Create user profile if signup successful
       if (data.user) {
         await supabase.from('users').insert({
           id: data.user.id,
           email: data.user.email,
           display_name: displayName || email.split('@')[0],
           tier: 'citizen',
           quantum_seeds: 100
         });
       }
     } catch (err) {
       const error = err as Error;
       setState(prev => ({ ...prev, error: error.message, loading: false }));
       throw error;
     }
   };
 
   const signOut = async () => {
     setState(prev => ({ ...prev, loading: true, error: null }));
     try {
       const { error } = await supabase.auth.signOut();
       if (error) throw error;
     } catch (err) {
       const error = err as Error;
       setState(prev => ({ ...prev, error: error.message, loading: false }));
       throw error;
     }
   };
 
   const resetPassword = async (email: string) => {
     setState(prev => ({ ...prev, loading: true, error: null }));
     try {
       const { error } = await supabase.auth.resetPasswordForEmail(email);
       if (error) throw error;
     } catch (err) {
       const error = err as Error;
       setState(prev => ({ ...prev, error: error.message, loading: false }));
       throw error;
     } finally {
       setState(prev => ({ ...prev, loading: false }));
     }
   };
 
   return {
     ...state,
     signIn,
     signUp,
     signOut,
     resetPassword
   };
 }