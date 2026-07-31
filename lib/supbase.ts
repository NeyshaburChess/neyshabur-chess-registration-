import { createClient } from "@supabase/supabase-js";
 
let client:
  | ReturnType<typeof createClient>
  | null = null;
 
export function getSupabase() {
  if (client) return client;
 
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
 
  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is not defined."
    );
  }
 
  if (!serviceKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not defined."
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
 