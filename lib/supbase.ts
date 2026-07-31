import { createClient } from "@supabase/supabase-js";
 
 
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL;
 
 
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY;
 
 
 
console.log(
  "SUPABASE URL:",
  supabaseUrl ? "FOUND" : "MISSING"
);
 
 
console.log(
  "SUPABASE SERVICE KEY:",
  supabaseServiceKey ? "FOUND" : "MISSING"
);
 
 
 
if (!supabaseUrl || !supabaseServiceKey) {
 
  throw new Error(
    "Supabase environment variables are missing"
  );
 
}
 
 
 
export const supabase = createClient(
 
  supabaseUrl,
 
  supabaseServiceKey,
 
  {
 
    auth: {
 
      autoRefreshToken: false,
 
      persistSession: false,
 
    },
 
  }
 
);
 