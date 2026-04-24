import React, { ReactNode } from 'react';
import { Card } from './ui/card';

interface KPICardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

export default function KPICard({
  icon,
  label,
  value,
  subtitle,
  trend,
  trendValue,
  className = ''
}: KPICardProps) {
  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            {icon}
            <span className="text-sm">{label}</span>
          </div>
          <div className="text-2xl font-semibold text-foreground mb-1">
            {value}
          </div>
          {subtitle && (
            <div className="text-xs text-muted-foreground">{subtitle}</div>
          )}
        </div>
        
        {trend && trendValue && (
          <div className={`text-xs font-medium px-2 py-1 rounded-full ${
            trend === 'up' ? 'bg-accent/20 text-accent' :
            trend === 'down' ? 'bg-destructive/20 text-destructive' :
            'bg-muted text-muted-foreground'
          }`}>
            {trendValue}
          </div>
        )}
      </div>
    </Card>
  );
}
