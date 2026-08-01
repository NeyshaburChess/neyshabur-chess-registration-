import { createClient } from "@supabase/supabase-js";
 
let supabaseClient: ReturnType<typeof createClient> | null = null;
 
export function getSupabase() {
  if (supabaseClient) {
    return supabaseClient;
  }
 
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
 
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
 
  if (!supabaseUrl) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is missing"
    );
  }
 
  if (!serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is missing. Add it to Cloudflare Runtime Variables."
    );
  }
 
  supabaseClient = createClient(
    supabaseUrl,
    serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
 
  return supabaseClient;
}
 