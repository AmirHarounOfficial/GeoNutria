import React from 'react';
import { useNavigate } from 'react-router';
import { MapPin, Plus, Activity, Droplets, Wifi, WifiOff } from 'lucide-react';
import TopBar from '../components/TopBar';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

const fields = [
  {
    id: 1,
    name: 'Field A - North Zone',
    size: '2.5 hectares',
    crop: 'Tomatoes',
    status: 'healthy',
    sensorStatus: 'online',
    soilMoisture: 65,
    lastUpdate: '10 min ago'
  },
  {
    id: 2,
    name: 'Field B - East Zone',
    size: '3.2 hectares',
    crop: 'Cucumbers',
    status: 'moderate',
    sensorStatus: 'online',
    soilMoisture: 45,
    lastUpdate: '25 min ago'
  },
  {
    id: 3,
    name: 'Field C - West Zone',
    size: '1.8 hectares',
    crop: 'Peppers',
    status: 'healthy',
    sensorStatus: 'offline',
    soilMoisture: 72,
    lastUpdate: '2 hours ago'
  },
  {
    id: 4,
    name: 'Field D - South Zone',
    size: '4.1 hectares',
    crop: 'Palm Trees',
    status: 'attention',
    sensorStatus: 'online',
    soilMoisture: 38,
    lastUpdate: '5 min ago'
  },
];

export default function Fields() {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'healthy': return 'bg-accent text-white';
      case 'moderate': return 'bg-secondary text-white';
      case 'attention': return 'bg-destructive text-white';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <TopBar title="My Fields" />
      
      <div className="flex-1 px-4 py-6 space-y-4 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Farm Overview</h2>
            <p className="text-sm text-muted-foreground">
              {fields.length} active fields · 11.6 hectares
            </p>
          </div>
          <Button size="sm" className="gap-2" onClick={() => navigate('/app/fields/add')}>
            <Plus className="w-4 h-4" />
            Add Field
          </Button>
        </div>

        <div className="space-y-3">
          {fields.map((field) => (
            <Card
              key={field.id}
              className="p-4 cursor-pointer hover:shadow-lg transition-all"
              onClick={() => navigate(`/app/fields/${field.id}`)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{field.name}</h3>
                    <p className="text-xs text-muted-foreground">{field.size} · {field.crop}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(field.status)}>
                  {field.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                  <Droplets className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Moisture</p>
                    <p className="text-sm font-medium">{field.soilMoisture}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                  {field.sensorStatus === 'online' ? (
                    <Wifi className="w-4 h-4 text-accent" />
                  ) : (
                    <WifiOff className="w-4 h-4 text-muted-foreground" />
                  )}
                  <div>
                    <p className="text-xs text-muted-foreground">Sensors</p>
                    <p className="text-sm font-medium capitalize">{field.sensorStatus}</p>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Last updated {field.lastUpdate}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}