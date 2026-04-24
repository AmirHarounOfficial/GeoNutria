import React from 'react';
import TopBar from '../components/TopBar';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export default function LeafSegmentation() {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <TopBar title="Leaf Segmentation" showBack />
      <div className="flex-1 px-4 py-6 space-y-4">
        <Card className="p-4">
          <div className="w-full h-64 bg-muted/50 rounded-xl flex items-center justify-center mb-4">
            <span className="text-muted-foreground">Segmented canopy view</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Leaves Detected</p>
              <p className="text-2xl font-bold">47</p>
            </div>
            <Badge variant="default">Confidence: 91%</Badge>
          </div>
        </Card>
        <Card className="p-4">
          <h4 className="font-semibold mb-2">Canopy Analysis</h4>
          <p className="text-sm text-muted-foreground">
            Dense canopy with healthy leaf distribution. No significant gaps detected.
          </p>
        </Card>
      </div>
    </div>
  );
}
