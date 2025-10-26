import { createClient } from "@supabase/supabase-js";

import type { Database } from "@type/database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient<Database, { PostgrestVersion: "13.0.5" }>(supabaseUrl, supabaseKey);

export default supabase;
