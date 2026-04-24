import React from 'react';
import TopBar from '../components/TopBar';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Trees } from 'lucide-react';

export default function PalmCounterResult() {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <TopBar title="Palm Count Result" showBack />
      <div className="flex-1 px-4 py-6 space-y-4">
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary p-4 rounded-2xl">
              <Trees className="w-8 h-8 text-white" />
            </div>
          </div>
          <h3 className="text-3xl font-bold mb-2">156</h3>
          <p className="text-muted-foreground">Palm Trees Detected</p>
          <Badge variant="default" className="mt-4">Confidence: 93%</Badge>
        </Card>
        <Card className="p-4">
          <div className="w-full h-64 bg-muted/50 rounded-xl flex items-center justify-center">
            <span className="text-muted-foreground">Aerial view with detections</span>
          </div>
        </Card>
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-3 text-center">
            <p className="text-sm text-muted-foreground">Area Covered</p>
            <p className="text-lg font-bold">4.2 ha</p>
          </Card>
          <Card className="p-3 text-center">
            <p className="text-sm text-muted-foreground">Density</p>
            <p className="text-lg font-bold">37 trees/ha</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
