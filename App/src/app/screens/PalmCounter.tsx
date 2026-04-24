import React from 'react';
import { useNavigate } from 'react-router';
import { Upload } from 'lucide-react';
import TopBar from '../components/TopBar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import CreditCostBadge from '../components/CreditCostBadge';

export default function PalmCounter() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <TopBar title="Aerial Palm Counter" showBack />
      <div className="flex-1 px-4 py-6 space-y-6">
        <div className="text-center">
          <CreditCostBadge cost={6} className="text-base px-4 py-2" />
          <p className="text-sm text-muted-foreground mt-2">
            Count palm trees from drone or satellite imagery
          </p>
        </div>
        <Card className="p-8 border-dashed">
          <p className="text-center text-muted-foreground">Upload aerial image</p>
        </Card>
        <Button size="lg" className="w-full gap-2" onClick={() => navigate('/app/palm-counter/result')}>
          <Upload className="w-5 h-5" /> Upload Drone Image
        </Button>
      </div>
    </div>
  );
}
