import { createClient } from "@supabase/supabase-js";
 
let supabaseClient: ReturnType<typeof createClient> | null = null;
 
export function getSupabase() {
  if (supabaseClient) return supabaseClient;
 
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL;
 
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;
 
  if (!supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is missing.");
  }
 
  if (!serviceKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is missing."
    );
  }
 
  supabaseClient = createClient(
    supabaseUrl,
    serviceKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
 
  return supabaseClient;
}
 