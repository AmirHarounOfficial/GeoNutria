import React from 'react';

interface ConfidenceBarProps {
  confidence: number;
  label?: string;
  showPercentage?: boolean;
}

export default function ConfidenceBar({ 
  confidence, 
  label, 
  showPercentage = true 
}: ConfidenceBarProps) {
  const getColor = (conf: number) => {
    if (conf >= 80) return 'bg-accent';
    if (conf >= 60) return 'bg-secondary';
    return 'bg-muted-foreground';
  };

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{label}</span>
          {showPercentage && (
            <span className="font-medium text-foreground">{confidence}%</span>
          )}
        </div>
      )}
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full ${getColor(confidence)} transition-all duration-500 rounded-full`}
          style={{ width: `${confidence}%` }}
        />
      </div>
    </div>
  );
}
