import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, X, Sparkles } from "lucide-react";
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
        <DialogContent className="max-w-md bg-card/95 backdrop-blur-sm border-gradient">
          <DialogHeader className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center animate-bounce-in shadow-prize">
              <IconComponent className="w-10 h-10 text-white" />
            </div>
            
            <DialogTitle className="text-3xl font-bold text-gradient">
              Congratulations! 🎉
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 pt-4">
            <Card className="p-6 text-center space-y-4 bg-gradient-to-br from-card to-card/50">
              <h3 className="text-2xl font-bold" style={{ color: prize.color }}>
                {prize.name}
              </h3>
              <p className="text-muted-foreground">
                {prize.description}
              </p>

              {(prize.type === "discount" || prize.type === "product" || prize.type === "bonus") && (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">
                    Your {prize.type === "discount" ? "discount code" : "reward code"}:
                  </p>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <code className="flex-1 text-lg font-mono font-bold">
                      {prize.value}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(prize.value)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {prize.type === "points" && (
                <div className="p-4 bg-gradient-gold/20 rounded-lg">
                  <p className="text-lg font-bold text-game-accent">
                    {prize.value} added to your account!
                  </p>
                </div>
              )}
            </Card>

            <div className="flex gap-3">
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1"
              >
                <X className="w-4 h-4 mr-2" />
                Close
              </Button>
              <Button
                onClick={() => {
                  onClose();
                  // Trigger another spin
                  setTimeout(() => {
                    window.location.reload();
                  }, 500);
                }}
                className="flex-1 bg-gradient-main"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Spin Again
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-gold confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute text-game-accent confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                fontSize: `${12 + Math.random() * 8}px`
              }}
            >
              ⭐
            </div>
          ))}
        </div>
      )}
    </>
  );
};