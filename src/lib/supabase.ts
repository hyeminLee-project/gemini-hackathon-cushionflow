import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASESUPABASE_URL ?? "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

if (!supabaseUrl || !supabaseKey) {
  console.warn("Supabase environment variables are not set. DB operations will be skipped.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
