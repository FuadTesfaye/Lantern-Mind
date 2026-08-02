import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Load .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, ".env") });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log("Testing Supabase connection...");

  const testEmail = `test_${Date.now()}@example.com`;

  // 1. Insert
  console.log(`Inserting test subscriber: ${testEmail}`);
  const { data: insertData, error: insertError } = await supabase
    .from("subscribers")
    .insert([{ email: testEmail }])
    .select();

  if (insertError) {
    console.error("Insert failed:", insertError);
    return;
  }

  console.log("Insert success:", insertData);

  // 2. Read
  console.log("Fetching subscribers...");
  const { data: readData, error: readError } = await supabase
    .from("subscribers")
    .select("*")
    .eq("email", testEmail);

  if (readError) {
    console.error("Read failed:", readError);
    return;
  }

  console.log("Read success:", readData);
  console.log("Connection and data recording are working cleanly!");
}

testConnection();
