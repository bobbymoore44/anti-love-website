import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

console.log("✅ Register Interest edge function starting...");

serve(async (req) => {
  console.log("=== 📨 NEW INTEREST REGISTRATION REQUEST ===");
  console.log("Method:", req.method);
  console.log("Timestamp:", new Date().toISOString());

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const data = await req.json();
    console.log("📥 Incoming data:", JSON.stringify(data, null, 2));

    const { email, firstName, productHandle, productTitle, productId, styleCode, size, colour } = data;

    // Validate required fields
    if (!email || !productHandle) {
      console.error("❌ Missing required fields:", { email, productHandle });
      return new Response(
        JSON.stringify({ error: "Email and product handle are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    console.log("🔧 Environment check:", {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseKey,
    });

    if (!supabaseUrl || !supabaseKey) {
      console.error("❌ Missing Supabase environment variables");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Save to database
    const recordToInsert = {
      email,
      first_name: firstName || null,
      product_handle: productHandle,
      product_title: productTitle,
      product_id: productId || null,
      style_code: styleCode || null,
      size: size || null,
      colour: colour || null,
    };

    console.log("💾 Saving to database:", recordToInsert);

    const { data: insertData, error: insertError } = await supabase
      .from("interests")
      .insert(recordToInsert)
      .select();

    console.log("📊 Database insert result:", { 
      success: !insertError, 
      recordCount: insertData?.length || 0,
      error: insertError 
    });

    if (insertError) {
      console.error("❌ Database insert failed:", insertError);
      return new Response(
        JSON.stringify({ 
          error: `Failed to save interest: ${insertError.message}`,
          details: insertError 
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("✅ Interest saved successfully!");
    console.log("📝 Saved record:", insertData);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Interest registered successfully",
        data: insertData 
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("💥 FATAL ERROR:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    const errorDetails = error instanceof Error ? error.stack : String(error);
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: errorDetails
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
