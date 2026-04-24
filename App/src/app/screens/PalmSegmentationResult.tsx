import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';

export default function PalmSegmentationResult() {
  const [view, setView] = useState('segmented');

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <TopBar title="Segmentation Result" showBack />
      <div className="flex-1 px-4 py-6 space-y-4">
        <Tabs value={view} onValueChange={setView} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="original">Original</TabsTrigger>
            <TabsTrigger value="segmented">Segmented</TabsTrigger>
            <TabsTrigger value="overlay">Overlay</TabsTrigger>
          </TabsList>
        </Tabs>
        <Card className="p-4">
          <div className="w-full h-64 bg-muted/50 rounded-xl flex items-center justify-center">
            <span className="text-muted-foreground">{view} view</span>
          </div>
        </Card>
        <Card className="p-4">
          <h4 className="font-semibold mb-2">Segmentation Quality</h4>
          <p className="text-2xl font-bold text-accent">95%</p>
          <p className="text-sm text-muted-foreground mt-1">Excellent isolation achieved</p>
        </Card>
        <Button size="lg" className="w-full">Continue to Disease Detection</Button>
      </div>
    </div>
  );
}
