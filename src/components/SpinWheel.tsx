import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Gift, Star, Percent, Trophy, Sparkles, Zap } from "lucide-react";
import { toast } from "sonner";
import { PrizeModal } from "./PrizeModal";

interface Prize {
  id: string;
  name: string;
  description: string;
  type: "discount" | "product" | "points" | "bonus";
  value: string;
  icon: typeof Gift;
  color: string;
}

const prizes: Prize[] = [
  {
    id: "1",
    name: "50% OFF",
    description: "Get 50% off your next purchase",
    type: "discount",
    value: "SAVE50",
    icon: Percent,
    color: "hsl(var(--game-warning))"
  },
  {
    id: "2", 
    name: "Free Product",
    description: "Choose any product for free",
    type: "product",
    value: "FREE-ITEM",
    icon: Gift,
    color: "hsl(var(--game-success))"
  },
  {
    id: "3",
    name: "1000 Points",
    description: "Earn 1000 bonus loyalty points",
    type: "points", 
    value: "1000 POINTS",
    icon: Star,
    color: "hsl(var(--game-accent))"
  },
  {
    id: "4",
    name: "Mystery Prize",
    description: "Unlock a special surprise",
    type: "bonus",
    value: "MYSTERY-BONUS",
    icon: Trophy,
    color: "hsl(var(--game-primary))"
  },
  {
    id: "5",
    name: "25% OFF",
    description: "Save 25% on your order",
    type: "discount",
    value: "SAVE25",
    icon: Percent,
    color: "hsl(var(--game-secondary))"
  },
  {
    id: "6",
    name: "Free Shipping",
    description: "Free shipping on any order",
    type: "bonus",
    value: "FREE-SHIP",
    icon: Zap,
    color: "hsl(var(--game-success))"
  },
  {
    id: "7",
    name: "500 Points",
    description: "Earn 500 bonus points",
    type: "points",
    value: "500 POINTS", 
    icon: Star,
    color: "hsl(var(--game-accent))"
  },
  {
    id: "8",
    name: "Exclusive Deal",
    description: "Access to exclusive offers",
    type: "bonus",
    value: "EXCLUSIVE-ACCESS",
    icon: Sparkles,
    color: "hsl(var(--game-primary))"
  }
];

export const SpinWheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);
  const [showPrizeModal, setShowPrizeModal] = useState(false);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spinWheel = useCallback(() => {
    if (isSpinning) return;

    setIsSpinning(true);
    
    // Generate random spin (3-5 full rotations + random segment)
    const fullRotations = 3 + Math.random() * 2;
    const segmentAngle = 360 / prizes.length;
    const randomSegment = Math.floor(Math.random() * prizes.length);
    const finalAngle = fullRotations * 360 + randomSegment * segmentAngle;
    
    setRotation(prev => prev + finalAngle);

    // Select the prize based on the final position
    const prizeIndex = (prizes.length - 1 - randomSegment) % prizes.length;
    const wonPrize = prizes[prizeIndex];

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedPrize(wonPrize);
      setShowPrizeModal(true);
      toast.success(`🎉 You won: ${wonPrize.name}!`);
    }, 4000);
  }, [isSpinning]);

  const segmentAngle = 360 / prizes.length;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-gradient">
          Spin to Win!
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Test your luck and win amazing prizes! Click the spin button to start your journey.
        </p>
      </div>

      <Card className="relative p-8 bg-card/50 backdrop-blur-sm border-gradient">
        <div className="relative">
          {/* Wheel Container */}
          <div className="relative w-96 h-96 mx-auto">
            {/* Wheel */}
            <div 
              ref={wheelRef}
              className="relative w-full h-full rounded-full shadow-wheel overflow-hidden"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning ? 'transform 4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
              }}
            >
              {prizes.map((prize, index) => {
                const startAngle = index * segmentAngle;
                const IconComponent = prize.icon;
                
                return (
                  <div
                    key={prize.id}
                    className="absolute inset-0 wheel-segment"
                    style={{
                      transform: `rotate(${startAngle}deg)`,
                      clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((segmentAngle * Math.PI) / 180)}% ${50 - 50 * Math.sin((segmentAngle * Math.PI) / 180)}%)`
                    }}
                  >
                    <div 
                      className="w-full h-full flex items-start justify-center pt-8"
                      style={{ backgroundColor: prize.color }}
                    >
                      <div 
                        className="flex flex-col items-center text-white"
                        style={{ transform: `rotate(${segmentAngle / 2}deg)` }}
                      >
                        <IconComponent className="w-6 h-6 mb-1" />
                        <span className="text-xs font-semibold text-center leading-tight">
                          {prize.name.split(' ').map((word, i) => (
                            <div key={i}>{word}</div>
                          ))}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Center Hub */}
            <div className="absolute inset-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 bg-gradient-gold rounded-full shadow-glow border-4 border-white flex items-center justify-center">
              <Star className="w-8 h-8 text-white" />
            </div>

            {/* Pointer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
              <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-white drop-shadow-lg"></div>
            </div>
          </div>

          {/* Spin Button */}
          <div className="mt-12 text-center">
            <Button
              onClick={spinWheel}
              disabled={isSpinning}
              size="lg"
              className="px-12 py-6 text-xl font-bold bg-gradient-main hover:scale-105 transition-transform duration-200 shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSpinning ? (
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Spinning...
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6" />
                  SPIN NOW!
                </div>
              )}
            </Button>
          </div>
        </div>
      </Card>

      <PrizeModal 
        prize={selectedPrize}
        isOpen={showPrizeModal}
        onClose={() => setShowPrizeModal(false)}
      />
    </div>
  );
};