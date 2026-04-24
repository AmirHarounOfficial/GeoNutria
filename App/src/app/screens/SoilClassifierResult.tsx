import React from 'react';
import TopBar from '../components/TopBar';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import ConfidenceBar from '../components/ConfidenceBar';

export default function SoilClassifierResult() {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <TopBar title="Soil Classification Result" showBack />
      <div className="flex-1 px-4 py-6 space-y-4">
        <Card className="p-4">
          <h3 className="font-semibold text-lg mb-2">Loamy Soil</h3>
          <ConfidenceBar confidence={92} label="Classification Confidence" />
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Excellent soil type for most crops. Good water retention and drainage.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
