import React from 'react';
import TopBar from '../components/TopBar';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { TrendingUp } from 'lucide-react';

export default function YieldPredictionResult() {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <TopBar title="Yield Prediction Result" showBack />
      <div className="flex-1 px-4 py-6 space-y-4">
        <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-accent p-4 rounded-2xl">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2">42,500 kg/ha</h3>
          <p className="text-muted-foreground">Estimated Yield</p>
          <Badge variant="default" className="mt-4">High Confidence: 89%</Badge>
        </Card>
        <Card className="p-4">
          <h4 className="font-semibold mb-2">Comparison</h4>
          <p className="text-sm text-muted-foreground">
            Your predicted yield is 15% above the regional average for tomatoes.
          </p>
        </Card>
        <Card className="p-4 bg-accent/5">
          <h4 className="font-semibold mb-2">Recommendations</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Maintain current nutrient levels</li>
            <li>• Continue irrigation schedule</li>
            <li>• Monitor for pests during harvest</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
