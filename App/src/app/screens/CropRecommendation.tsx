import React from 'react';
import { useNavigate } from 'react-router';
import TopBar from '../components/TopBar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import CreditCostBadge from '../components/CreditCostBadge';

export default function CropRecommendation() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <TopBar title="Crop Recommendation" showBack />
      <div className="flex-1 px-4 py-6 space-y-4">
        <div className="text-center">
          <CreditCostBadge cost={4} className="text-base px-4 py-2" />
        </div>
        <Card className="p-4 space-y-3">
          <div>
            <Label>Nitrogen (N) ppm</Label>
            <Input type="number" defaultValue="45" />
          </div>
          <div>
            <Label>Phosphorus (P) ppm</Label>
            <Input type="number" defaultValue="38" />
          </div>
          <div>
            <Label>Potassium (K) ppm</Label>
            <Input type="number" defaultValue="52" />
          </div>
          <div>
            <Label>Temperature °C</Label>
            <Input type="number" defaultValue="28" />
          </div>
          <div>
            <Label>Humidity %</Label>
            <Input type="number" defaultValue="68" />
          </div>
          <div>
            <Label>pH</Label>
            <Input type="number" defaultValue="6.5" step="0.1" />
          </div>
          <div>
            <Label>Rainfall mm</Label>
            <Input type="number" defaultValue="150" />
          </div>
        </Card>
        <Button size="lg" className="w-full" onClick={() => navigate('/app/crop-recommendation/result')}>
          Get Recommendations
        </Button>
      </div>
    </div>
  );
}
