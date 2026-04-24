import React from 'react';
import { Camera, Upload } from 'lucide-react';
import { useNavigate } from 'react-router';
import TopBar from '../components/TopBar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import CreditCostBadge from '../components/CreditCostBadge';

export default function SoilClassifier() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <TopBar title="Soil Classification" showBack />
      <div className="flex-1 px-4 py-6 space-y-6">
        <div className="text-center">
          <CreditCostBadge cost={3} className="text-base px-4 py-2" />
        </div>
        <Card className="p-8 border-dashed">
          <p className="text-center text-muted-foreground">Upload soil image</p>
        </Card>
        <Button size="lg" className="w-full gap-2" onClick={() => navigate('/app/soil-classifier/result')}>
          <Camera className="w-5 h-5" /> Capture Soil Image
        </Button>
      </div>
    </div>
  );
}
