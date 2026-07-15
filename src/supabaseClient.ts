import { createClient } from '@supabase/supabase-js';

// Fallback to a dummy valid URL so the app doesn't crash before the user sets up their .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_URL.startsWith('http') 
  ? import.meta.env.VITE_SUPABASE_URL 
  : 'https://placeholder-project.supabase.co';
  
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

if (supabaseUrl === 'https://placeholder-project.supabase.co') {
  console.warn('Missing or invalid Supabase environment variables. Please check your .env file and ensure VITE_SUPABASE_URL starts with https://');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
