import React from 'react';
import TopBar from '../components/TopBar';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import ConfidenceBar from '../components/ConfidenceBar';

export default function PalmDisease() {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <TopBar title="Palm Disease Detection" showBack />
      <div className="flex-1 px-4 py-6 space-y-4">
        <Card className="p-4 bg-gradient-to-br from-secondary/10 to-secondary/5">
          <Badge variant="destructive" className="mb-3">Disease Detected</Badge>
          <h3 className="font-semibold text-lg mb-2">Red Palm Weevil</h3>
          <ConfidenceBar confidence={84} label="Detection Confidence" />
        </Card>
        <Card className="p-4 bg-accent/5">
          <h4 className="font-semibold mb-2">Immediate Actions</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Inspect trunk for entry holes</li>
            <li>• Apply systemic insecticide</li>
            <li>• Remove and burn infected palms</li>
            <li>• Set up pheromone traps</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
