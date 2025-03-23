import { createClient } from "@supabase/supabase-js";
const supabaseUrl =
  import.meta.env.REACT_APP_SUPABASE_URL ||
  "https://kygbgbkictowrxsacpoc.supabase.co";
const supabaseKey =
  import.meta.env.REACT_APP_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5Z2JnYmtpY3Rvd3J4c2FjcG9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2ODM3MTAsImV4cCI6MjA1ODI1OTcxMH0.a9VOG0JOgmfIl0kv5s-62_v2sLBPvcTFqPB6b_AFQRI";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
