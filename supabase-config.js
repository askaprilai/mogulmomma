// Supabase configuration for production
const SUPABASE_URL = 'https://vdzoetjdkqvoqiuiaywz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkem9ldGpka3F2b3FpdWlheXd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5OTcxNDEsImV4cCI6MjA3MDU3MzE0MX0.9A-5tQibWBu29kMfaSokt_NWZGCrY_Qg_7fVwcPNe1Y';

// Initialize Supabase client
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('Supabase client initialized for production');