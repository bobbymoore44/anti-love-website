import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { registerProductInterest, type InterestData } from "@/lib/shopify";
import { Loader2, CheckCircle2 } from "lucide-react";

interface InterestModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  productHandle: string;
  productTitle: string;
  styleCode?: string;
  availableSizes?: string[];
  availableColours?: string[];
}

export const InterestModal = ({
  isOpen,
  onClose,
  productId,
  productHandle,
  productTitle,
  styleCode,
  availableSizes = ["S", "M", "L", "XL"],
  availableColours = [],
}: InterestModalProps) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [size, setSize] = useState("");
  const [colour, setColour] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email address is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const interestData: InterestData = {
        email,
        firstName,
        productHandle,
        productTitle,
        productId,
        styleCode,
        size,
        colour,
      };

      const result = await registerProductInterest(interestData);
      
      // Check if there was a warning (Shopify failed but Supabase succeeded)
      if (result?.warning) {
        console.warn('Shopify sync failed but interest saved:', result.warning);
      }
      
      setIsSuccess(true);

      // Track analytics event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'interest_submitted', {
          product_id: productId,
          product_handle: productHandle,
        });
      }
    } catch (err: any) {
      const errorMessage = err?.message || "Something went wrong saving your interest. Please try again in a moment.";
      setError(errorMessage);
      console.error('Interest registration error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setFirstName("");
    setSize("");
    setColour("");
    setIsSuccess(false);
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-background border-white/10">
        {!isSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-foreground">
                Register Your Interest
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Tell us your details and we'll let you know if this piece becomes available in a future Anti-Love drop.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/5 border-white/10 text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-foreground">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Your name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-white/5 border-white/10 text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="size" className="text-foreground">
                  Preferred Size
                </Label>
                <Select value={size} onValueChange={setSize}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-foreground">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSizes.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {availableColours.length > 0 && (
                <div className="space-y-2">
                  <Label htmlFor="colour" className="text-foreground">
                    Preferred Colour
                  </Label>
                  <Select value={colour} onValueChange={setColour}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-foreground">
                      <SelectValue placeholder="Select colour" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableColours.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {error && (
                <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-md p-3">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-wider"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Interest"
                )}
              </Button>
            </form>
          </>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle2 className="w-16 h-16 text-primary" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-foreground">
                Thank You!
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-base">
                Your interest has been registered for <span className="font-semibold text-foreground">{productTitle}</span>.
                <br />
                <br />
                We'll email you if this piece becomes available in a future drop.
              </DialogDescription>
            </DialogHeader>
            <Button
              onClick={handleClose}
              className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-wider"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
