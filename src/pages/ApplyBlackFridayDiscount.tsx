import { useState } from "react";
import { Button } from "@/components/ui/button";
import { applyBlackFridayDiscount, preSaleVariants } from "@/lib/applyBlackFridayDiscount";
import { toast } from "sonner";

export default function ApplyBlackFridayDiscount() {
  const [isApplying, setIsApplying] = useState(false);

  const handleApplyDiscount = async () => {
    setIsApplying(true);
    try {
      const result = await applyBlackFridayDiscount(preSaleVariants);
      const successful = result.results.filter((r: any) => r.success).length;
      const failed = result.results.filter((r: any) => !r.success).length;
      
      toast.success(`Black Friday Discount Applied!`, {
        description: `Successfully updated ${successful} variants${failed > 0 ? `, ${failed} failed` : ''}`
      });
    } catch (error) {
      toast.error("Failed to apply discount", {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="container mx-auto py-20 px-4">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold">Apply Black Friday Discount</h1>
        <p className="text-muted-foreground">
          This will apply a 30% discount to all pre-sale products in your store.
        </p>
        <Button 
          onClick={handleApplyDiscount} 
          disabled={isApplying}
          size="lg"
          className="mt-8"
        >
          {isApplying ? "Applying Discount..." : "Apply 30% Discount to All Pre-Sale Products"}
        </Button>
      </div>
    </div>
  );
}
