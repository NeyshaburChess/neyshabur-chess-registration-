// lib/supabase.ts
 
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
 
let client: SupabaseClient | null = null;
 
export function getSupabase(): SupabaseClient {
  if (client) return client;
 
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    process.env.SUPABASE_URL;
 
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;
 
  if (!supabaseUrl) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is missing. Add it to Cloudflare Runtime Variables."
    );
  }
 
  if (!serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is missing. Add it to Cloudflare Runtime Variables."
    );
  }
 
  client = createClient(
    supabaseUrl,
    serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      global: {
        headers: {
          "X-Client-Info": "neyshabur-chess",
        },
      },
    }
  );
 
  return client;
}
 
export const supabase = getSupabase();
 