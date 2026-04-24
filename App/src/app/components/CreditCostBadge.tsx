import React from 'react';
import { Coins } from 'lucide-react';
import { Badge } from './ui/badge';

interface CreditCostBadgeProps {
  cost: number;
  className?: string;
}

export default function CreditCostBadge({ cost, className = '' }: CreditCostBadgeProps) {
  return (
    <Badge variant="secondary" className={`flex items-center gap-1 ${className}`}>
      <Coins className="w-3 h-3" />
      <span>{cost} credits</span>
    </Badge>
  );
}
