import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("drivers").select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const supabase = await createClient();
  
  // Check session
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    console.error("Auth error in driver registration:", authError);
    return NextResponse.json({ error: "Unauthorized: Please log in to register drivers." }, { status: 401 });
  }

  const body = await req.json();
  const { data, error } = await supabase.from("drivers").insert([body]);
  
  if (error) {
    console.error("Database error in driver registration:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  
  return NextResponse.json({ success: true, data });
}
