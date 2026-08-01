import { createClient, type SupabaseClient } from "@supabase/supabase-js";
 
let supabase: SupabaseClient | null = null;
 
export function getSupabase(): SupabaseClient {
  if (supabase) {
    return supabase;
  }
 
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    process.env.SUPABASE_URL;
 
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;
 
  if (!supabaseUrl) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is missing."
    );
  }
 
  if (!serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is missing."
    );
  }
 
  supabase = createClient(
    supabaseUrl,
    serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      global: {
        fetch,
      },
    }
  );
 
  return supabase;
}
 
export default getSupabase;
 