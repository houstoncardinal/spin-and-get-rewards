import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, X, Sparkles, Star } from "lucide-react";
import { toast } from "sonner";

interface Prize {
  id: string;
  name: string;
  description: string;
  type: "discount" | "product" | "points" | "bonus";
  value: string;
  icon: any;
  color: string;
}

interface PrizeModalProps {
  prize: Prize | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PrizeModal = ({ prize, isOpen, onClose }: PrizeModalProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen && prize) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, prize]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Code copied to clipboard!");
  };

  if (!prize) return null;

  const IconComponent = prize.icon;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-lg glass-effect border-luxury">
          <DialogHeader className="text-center space-y-6">
            <div className="mx-auto w-24 h-24 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold border-4 border-luxury-charcoal">
              <IconComponent className="w-12 h-12 text-luxury-black" />
            </div>
            
            <DialogTitle className="text-4xl font-display font-bold text-luxury-black tracking-tight">
              Congratulations
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-8 pt-6">
            <div className="w-16 h-px bg-gradient-gold mx-auto"></div>
            <Card className="p-8 text-center space-y-6 bg-white border-luxury shadow-elegant">
              <h3 className="text-3xl font-display font-bold text-luxury-black">
                {prize.name}
              </h3>
              <p className="text-luxury-gray font-light text-lg leading-relaxed">
                {prize.description}
              </p>

              {(prize.type === "discount" || prize.type === "product" || prize.type === "bonus") && (
                <div className="space-y-4">
                  <p className="text-sm font-medium text-luxury-gray uppercase tracking-wide">
                    {prize.type === "discount" ? "Exclusive Code" : "Access Code"}
                  </p>
                  <div className="flex items-center gap-3 p-4 bg-luxury-pearl border border-luxury-silver rounded-lg">
                    <code className="flex-1 text-xl font-mono font-bold text-luxury-black tracking-wider">
                      {prize.value}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(prize.value)}
                      className="border-luxury-charcoal hover:bg-luxury-charcoal hover:text-white"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {prize.type === "points" && (
                <div className="p-6 bg-gradient-gold/10 border border-luxury-gold rounded-lg">
                  <p className="text-xl font-medium text-luxury-black">
                    {prize.value} — Elevation Confirmed
                  </p>
                </div>
              )}
            </Card>

            <div className="flex gap-4 pt-4">
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1 border-luxury-charcoal text-luxury-charcoal hover:bg-luxury-charcoal hover:text-white"
              >
                <X className="w-4 h-4 mr-2" />
                Dismiss
              </Button>
              <Button
                onClick={() => {
                  onClose();
                  // Trigger another spin
                  setTimeout(() => {
                    window.location.reload();
                  }, 500);
                }}
                className="flex-1 bg-luxury-black hover:bg-luxury-charcoal text-white"
              >
                <Star className="w-4 h-4 mr-2" />
                Continue
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Subtle Celebration Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-luxury-gold rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
                animation: `subtle-float ${3 + Math.random() * 2}s ease-in-out infinite`
              }}
            />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute text-luxury-gold opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${4 + Math.random() * 2}s`,
                fontSize: `${8 + Math.random() * 4}px`,
                animation: `subtle-float ${4 + Math.random() * 2}s ease-in-out infinite`
              }}
            >
              ✦
            </div>
          ))}
        </div>
      )}
    </>
  );
};