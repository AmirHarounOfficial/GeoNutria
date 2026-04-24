import React from 'react';
import { useNavigate } from 'react-router';
import TopBar from '../components/TopBar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Label } from '../components/ui/label';
import CreditCostBadge from '../components/CreditCostBadge';

export default function YieldPrediction() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <TopBar title="Yield Prediction" showBack />
      <div className="flex-1 px-4 py-6 space-y-4">
        <div className="text-center">
          <CreditCostBadge cost={5} className="text-base px-4 py-2" />
        </div>
        <Card className="p-4 space-y-3">
          <div>
            <Label>Select Field</Label>
            <Select defaultValue="field-a">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="field-a">Field A - Tomatoes</SelectItem>
                <SelectItem value="field-b">Field B - Cucumbers</SelectItem>
                <SelectItem value="field-c">Field C - Peppers</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Target Crop</Label>
            <Select defaultValue="tomato">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tomato">Tomato</SelectItem>
                <SelectItem value="cucumber">Cucumber</SelectItem>
                <SelectItem value="pepper">Pepper</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>
        <Button size="lg" className="w-full" onClick={() => navigate('/app/yield-prediction/result')}>
          Predict Yield
        </Button>
      </div>
    </div>
  );
}
