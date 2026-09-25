interface VariantUpdate {
  variantId: number;
  originalPrice: string;
  discountedPrice: string;
}

export async function applyBlackFridayDiscount(variants: VariantUpdate[]) {
  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/apply-black-friday-discount`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ variants }),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to apply discount: ${response.statusText}`);
  }

  return await response.json();
}

// Pre-sale products to discount
export const preSaleVariants: VariantUpdate[] = [
  // Anti-Love Hoodie - £95 → £66.50
  { variantId: 45394760138913, originalPrice: "95.00", discountedPrice: "66.50" }, // Pink/S
  { variantId: 45394760171681, originalPrice: "95.00", discountedPrice: "66.50" }, // Pink/M
  { variantId: 45394760204449, originalPrice: "95.00", discountedPrice: "66.50" }, // Pink/L
  { variantId: 45394760237217, originalPrice: "95.00", discountedPrice: "66.50" }, // Grey/S
  { variantId: 45394760269985, originalPrice: "95.00", discountedPrice: "66.50" }, // Grey/M
  { variantId: 45394760302753, originalPrice: "95.00", discountedPrice: "66.50" }, // Grey/L
  { variantId: 45394760335521, originalPrice: "95.00", discountedPrice: "66.50" }, // Black/S
  { variantId: 45394760368289, originalPrice: "95.00", discountedPrice: "66.50" }, // Black/M
  { variantId: 45394760401057, originalPrice: "95.00", discountedPrice: "66.50" }, // Black/L
  { variantId: 45394760433825, originalPrice: "95.00", discountedPrice: "66.50" }, // Stone/S
  { variantId: 45394760466593, originalPrice: "95.00", discountedPrice: "66.50" }, // Stone/M
  { variantId: 45394760499361, originalPrice: "95.00", discountedPrice: "66.50" }, // Stone/L
  
  // Anti-Love Jogger - £85 → £59.50
  { variantId: 45394777735329, originalPrice: "85.00", discountedPrice: "59.50" }, // Pink/S
  { variantId: 45394777768097, originalPrice: "85.00", discountedPrice: "59.50" }, // Pink/M
  { variantId: 45394777800865, originalPrice: "85.00", discountedPrice: "59.50" }, // Pink/L
  { variantId: 45394777833633, originalPrice: "85.00", discountedPrice: "59.50" }, // Black/S
  { variantId: 45394777866401, originalPrice: "85.00", discountedPrice: "59.50" }, // Black/M
  { variantId: 45394777899169, originalPrice: "85.00", discountedPrice: "59.50" }, // Black/L
  { variantId: 45394777931937, originalPrice: "85.00", discountedPrice: "59.50" }, // Stone/S
  { variantId: 45394777964705, originalPrice: "85.00", discountedPrice: "59.50" }, // Stone/M
  { variantId: 45394777997473, originalPrice: "85.00", discountedPrice: "59.50" }, // Stone/L
  { variantId: 45394778030241, originalPrice: "85.00", discountedPrice: "59.50" }, // Grey/S
  { variantId: 45394778063009, originalPrice: "85.00", discountedPrice: "59.50" }, // Grey/M
  { variantId: 45394778095777, originalPrice: "85.00", discountedPrice: "59.50" }, // Grey/L
  
  // Anti-Love T-Shirt - £65 → £45.50
  { variantId: 45394770985121, originalPrice: "65.00", discountedPrice: "45.50" }, // Pink/S
  { variantId: 45394771017889, originalPrice: "65.00", discountedPrice: "45.50" }, // Pink/M
  { variantId: 45394771050657, originalPrice: "65.00", discountedPrice: "45.50" }, // Pink/L
  { variantId: 45394771083425, originalPrice: "65.00", discountedPrice: "45.50" }, // Grey/S
  { variantId: 45394771116193, originalPrice: "65.00", discountedPrice: "45.50" }, // Grey/M
  { variantId: 45394771148961, originalPrice: "65.00", discountedPrice: "45.50" }, // Grey/L
  { variantId: 45394771181729, originalPrice: "65.00", discountedPrice: "45.50" }, // Black/S
  { variantId: 45394771214497, originalPrice: "65.00", discountedPrice: "45.50" }, // Black/M
  { variantId: 45394771247265, originalPrice: "65.00", discountedPrice: "45.50" }, // Black/L
  { variantId: 45394771280033, originalPrice: "65.00", discountedPrice: "45.50" }, // Stone/S
  { variantId: 45394771312801, originalPrice: "65.00", discountedPrice: "45.50" }, // Stone/M
  { variantId: 45394771345569, originalPrice: "65.00", discountedPrice: "45.50" }, // Stone/L
  
  // Fractured Love T-Shirt - £65 → £45.50
  { variantId: 45394779046049, originalPrice: "65.00", discountedPrice: "45.50" }, // White/S
  { variantId: 45394779078817, originalPrice: "65.00", discountedPrice: "45.50" }, // White/M
  { variantId: 45394779111585, originalPrice: "65.00", discountedPrice: "45.50" }, // White/L
  { variantId: 45394779144353, originalPrice: "65.00", discountedPrice: "45.50" }, // Black/S
  { variantId: 45394779177121, originalPrice: "65.00", discountedPrice: "45.50" }, // Black/M
  { variantId: 45394779209889, originalPrice: "65.00", discountedPrice: "45.50" }, // Black/L
];
