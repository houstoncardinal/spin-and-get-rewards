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
    description: "Exclusive half-price discount",
    type: "discount",
    value: "LUXURY50",
    icon: Percent,
    color: "hsl(var(--luxury-charcoal))"
  },
  {
    id: "2", 
    name: "Premium Gift",
    description: "Complimentary luxury item",
    type: "product",
    value: "PREMIUM-GIFT",
    icon: Gift,
    color: "hsl(var(--luxury-black))"
  },
  {
    id: "3",
    name: "Gold Tier",
    description: "Elevated membership status",
    type: "points", 
    value: "GOLD-STATUS",
    icon: Star,
    color: "hsl(var(--luxury-gold))"
  },
  {
    id: "4",
    name: "Curator's Choice",
    description: "Hand-selected exclusive piece",
    type: "bonus",
    value: "CURATOR-SELECT",
    icon: Trophy,
    color: "hsl(var(--luxury-charcoal))"
  },
  {
    id: "5",
    name: "25% OFF",
    description: "Quarter reduction privilege",
    type: "discount",
    value: "QUARTER25",
    icon: Percent,
    color: "hsl(var(--luxury-gray))"
  },
  {
    id: "6",
    name: "White Glove",
    description: "Complimentary concierge delivery",
    type: "bonus",
    value: "CONCIERGE",
    icon: Zap,
    color: "hsl(var(--luxury-black))"
  },
  {
    id: "7",
    name: "Silver Tier",
    description: "Enhanced member benefits",
    type: "points",
    value: "SILVER-STATUS", 
    icon: Star,
    color: "hsl(var(--luxury-silver))"
  },
  {
    id: "8",
    name: "Private Access",
    description: "Exclusive collection preview",
    type: "bonus",
    value: "PRIVATE-VIEW",
    icon: Sparkles,
    color: "hsl(var(--luxury-charcoal))"
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
    <div className="flex flex-col items-center justify-center min-h-screen p-8 space-y-12 bg-gradient-to-br from-luxury-pearl to-luxury-platinum">
      <div className="text-center space-y-6 max-w-4xl">
        <h1 className="text-7xl font-display font-bold text-luxury-black tracking-tight">
          Fortune's Wheel
        </h1>
        <div className="w-24 h-px bg-gradient-gold mx-auto"></div>
        <p className="text-xl text-luxury-gray leading-relaxed font-light">
          An exclusive opportunity awaits. Engage with our curated selection of distinguished rewards.
        </p>
      </div>

      <Card className="relative p-12 glass-effect shadow-luxury border-luxury">
        <div className="relative">
          {/* Wheel Container */}
          <div className="relative w-[28rem] h-[28rem] mx-auto">
            {/* Wheel */}
            <div 
              ref={wheelRef}
              className="relative w-full h-full rounded-full shadow-wheel overflow-hidden border-4 border-luxury-charcoal bg-white"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning ? 'transform 5s cubic-bezier(0.23, 1, 0.32, 1)' : 'none'
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
                      className="w-full h-full flex items-start justify-center pt-10 border-r border-luxury-platinum/20"
                      style={{ 
                        backgroundColor: index % 2 === 0 ? 'white' : prize.color,
                        borderRight: index === prizes.length - 1 ? 'none' : undefined
                      }}
                    >
                      <div 
                        className="flex flex-col items-center"
                        style={{ 
                          transform: `rotate(${segmentAngle / 2}deg)`,
                          color: index % 2 === 0 ? prize.color : 'white'
                        }}
                      >
                        <IconComponent className="w-7 h-7 mb-2" />
                        <span className="text-sm font-medium text-center leading-tight tracking-wide">
                          {prize.name.split(' ').map((word, i) => (
                            <div key={i} className="font-sans">{word}</div>
                          ))}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Center Hub */}
            <div className="absolute inset-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 bg-gradient-gold rounded-full shadow-gold border-4 border-luxury-charcoal flex items-center justify-center">
              <Star className="w-10 h-10 text-luxury-black" />
            </div>

            {/* Pointer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 z-10">
              <div className="w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-luxury-charcoal drop-shadow-lg"></div>
            </div>
          </div>

          {/* Spin Button */}
          <div className="mt-16 text-center">
            <Button
              onClick={spinWheel}
              disabled={isSpinning}
              size="lg"
              className="px-16 py-8 text-xl font-medium tracking-wide bg-luxury-black hover:bg-luxury-charcoal text-white border-2 border-luxury-charcoal hover:border-luxury-gold transition-all duration-300 shadow-luxury disabled:opacity-50 disabled:cursor-not-allowed luxury-shine"
            >
              {isSpinning ? (
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin" />
                  <span className="font-light">In Motion...</span>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Star className="w-6 h-6" />
                  <span className="font-medium">ENGAGE</span>
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