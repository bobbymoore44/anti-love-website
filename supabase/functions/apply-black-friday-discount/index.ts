import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SHOPIFY_ADMIN_ACCESS_TOKEN = Deno.env.get('SHOPIFY_ACCESS_TOKEN');
const SHOPIFY_STORE_DOMAIN = Deno.env.get('SHOPIFY_STORE_PERMANENT_DOMAIN');
const SHOPIFY_API_VERSION = '2025-01';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface VariantUpdate {
  variantId: number;
  originalPrice: string;
  discountedPrice: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { variants } = await req.json() as { variants: VariantUpdate[] };

    if (!SHOPIFY_ADMIN_ACCESS_TOKEN || !SHOPIFY_STORE_DOMAIN) {
      throw new Error('Missing Shopify configuration');
    }

    const results = [];
    
    // Update each variant
    for (const variant of variants) {
      const updateUrl = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/variants/${variant.variantId}.json`;
      
      const response = await fetch(updateUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': SHOPIFY_ADMIN_ACCESS_TOKEN,
        },
        body: JSON.stringify({
          variant: {
            id: variant.variantId,
            price: variant.discountedPrice,
            compare_at_price: variant.originalPrice,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to update variant ${variant.variantId}:`, errorText);
        results.push({ variantId: variant.variantId, success: false, error: errorText });
      } else {
        const data = await response.json();
        results.push({ variantId: variant.variantId, success: true, data: data.variant });
      }
    }

    return new Response(
      JSON.stringify({ success: true, results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});
