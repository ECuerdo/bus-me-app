import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  
  const response = NextResponse.json({ success: true });
  
  // Clear any potential legacy cookies if they exist
  response.cookies.set("vos_access_token", "", { maxAge: 0 });
  
  return response;
}
