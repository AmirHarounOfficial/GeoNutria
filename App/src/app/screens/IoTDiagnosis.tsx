import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Activity, Droplets, Thermometer, Wind, Sun, Gauge, Leaf } from 'lucide-react';
import TopBar from '../components/TopBar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import CreditCostBadge from '../components/CreditCostBadge';
import { useApp } from '../contexts/AppContext';

const sensorFields = [
  { icon: Droplets, label: 'Soil Moisture (%)', name: 'moisture', value: '65', unit: '%' },
  { icon: Thermometer, label: 'Ambient Temp (°C)', name: 'ambientTemp', value: '28', unit: '°C' },
  { icon: Thermometer, label: 'Soil Temp (°C)', name: 'soilTemp', value: '24', unit: '°C' },
  { icon: Wind, label: 'Humidity (%)', name: 'humidity', value: '68', unit: '%' },
  { icon: Sun, label: 'Light (lux)', name: 'light', value: '850', unit: 'lx' },
  { icon: Gauge, label: 'pH', name: 'ph', value: '6.5', unit: '' },
  { icon: Leaf, label: 'Nitrogen (N)', name: 'nitrogen', value: '45', unit: 'ppm' },
  { icon: Leaf, label: 'Phosphorus (P)', name: 'phosphorus', value: '38', unit: 'ppm' },
  { icon: Leaf, label: 'Potassium (K)', name: 'potassium', value: '52', unit: 'ppm' },
  { icon: Leaf, label: 'Chlorophyll', name: 'chlorophyll', value: '42', unit: 'SPAD' },
  { icon: Activity, label: 'EC (mS/cm)', name: 'ec', value: '1.8', unit: 'mS/cm' },
];

export default function IoTDiagnosis() {
  const navigate = useNavigate();
  const { credits, deductCredits } = useApp();
  const [analyzing, setAnalyzing] = useState(false);
  const cost = 2;

  const handleAnalyze = () => {
    if (credits < cost) {
      navigate('/app/buy-credits');
      return;
    }
    
    setAnalyzing(true);
    setTimeout(() => {
      deductCredits(cost);
      setAnalyzing(false);
      // Show results in a modal or navigate
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <TopBar title="IoT Health Diagnosis" showBack />
      
      <div className="flex-1 px-4 py-6 space-y-6 pb-6">
        <div className="text-center space-y-2">
          <CreditCostBadge cost={cost} className="text-base px-4 py-2" />
          <p className="text-sm text-muted-foreground">
            Monitor crop health using 11 sensor parameters
          </p>
        </div>

        {/* Live Data Badge */}
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Sensor Readings</h3>
          <Badge variant="secondary" className="gap-1.5">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
            Live Data
          </Badge>
        </div>

        {/* Sensor Fields */}
        <div className="space-y-3">
          {sensorFields.map((field, index) => {
            const Icon = field.icon;
            return (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-primary" />
                    <Label className="text-sm">{field.label}</Label>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {field.unit}
                  </span>
                </div>
                <Input
                  type="number"
                  defaultValue={field.value}
                  className="text-lg font-semibold"
                />
              </Card>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="sticky bottom-0 bg-background pt-4 pb-6">
          <Button 
            size="lg" 
            className="w-full gap-2"
            onClick={handleAnalyze}
            disabled={analyzing}
          >
            <Activity className="w-5 h-5" />
            {analyzing ? 'Analyzing...' : 'Run AI Diagnosis'}
          </Button>
        </div>

        {/* Result Preview */}
        {analyzing && (
          <Card className="p-6 text-center bg-primary/5">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin">
                <Activity className="w-8 h-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Analyzing sensor data with AI...
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
