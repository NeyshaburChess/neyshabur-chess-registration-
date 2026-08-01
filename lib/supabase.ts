import { createClient } from "@supabase/supabase-js";
 
let client:
  | ReturnType<typeof createClient>
  | null = null;
 
export function getSupabase() {
  if (client) return client;
 
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL;
 
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;
 
  if (!url) {
    throw new Error(
      "SUPABASE URL is not defined."
    );
  }
 
  if (!serviceKey) {
    throw new Error(
      "SUPABASE SERVICE ROLE KEY is not defined."
    );
  }
 
  client = createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
 
  return client;
}
 