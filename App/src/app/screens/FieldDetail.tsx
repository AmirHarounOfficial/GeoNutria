import React, { useState } from 'react';
import { useParams } from 'react-router';
import { 
  MapPin, Activity, FileText, History, TrendingUp, Droplets,
  Thermometer, Wind, Sun
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const sensorData = [
  { time: '6am', moisture: 58, temp: 22 },
  { time: '9am', moisture: 56, temp: 25 },
  { time: '12pm', moisture: 52, temp: 28 },
  { time: '3pm', moisture: 48, temp: 29 },
  { time: '6pm', moisture: 45, temp: 26 },
];

export default function FieldDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <TopBar title="Field A - North Zone" showBack />
      
      <div className="flex-1 px-4 py-6 space-y-4 pb-6">
        {/* Field Info */}
        <Card className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <div className="flex items-start gap-3">
            <div className="bg-primary/20 p-3 rounded-xl">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold mb-1">Field A - North Zone</h2>
              <p className="text-sm text-muted-foreground mb-2">
                2.5 hectares · Tomatoes · Planted Mar 15, 2026
              </p>
              <Badge className="bg-accent text-white">Healthy</Badge>
            </div>
          </div>
        </Card>

        {/* Current Readings */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Soil Moisture</span>
            </div>
            <p className="text-xl font-semibold">65%</p>
            <p className="text-xs text-accent mt-1">Optimal</p>
          </Card>
          <Card className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <Thermometer className="w-4 h-4 text-secondary" />
              <span className="text-xs text-muted-foreground">Temperature</span>
            </div>
            <p className="text-xl font-semibold">26°C</p>
            <p className="text-xs text-accent mt-1">Good</p>
          </Card>
          <Card className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <Wind className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground">Humidity</span>
            </div>
            <p className="text-xl font-semibold">68%</p>
            <p className="text-xs text-muted-foreground mt-1">Normal</p>
          </Card>
          <Card className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <Sun className="w-4 h-4 text-secondary" />
              <span className="text-xs text-muted-foreground">Light</span>
            </div>
            <p className="text-xl font-semibold">850 lx</p>
            <p className="text-xs text-accent mt-1">Excellent</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Sensors</TabsTrigger>
            <TabsTrigger value="diagnoses">Diagnoses</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 mt-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Soil Moisture Trend</h3>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={sensorData} id="field-moisture-chart">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} domain={[40, 65]} />
                  <Line 
                    type="monotone" 
                    dataKey="moisture" 
                    stroke="#0F4C5C" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-4 bg-accent/5 border-accent/30">
              <h4 className="font-semibold text-sm mb-2">Recommendation</h4>
              <p className="text-sm text-muted-foreground">
                Soil conditions are optimal. Continue current irrigation schedule.
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="diagnoses" className="space-y-3 mt-4">
            {[
              { type: 'IoT Health Check', result: 'Healthy', time: '2 hours ago', status: 'success' },
              { type: 'Leaf Disease Scan', result: 'Early Blight Detected', time: '1 day ago', status: 'warning' },
              { type: 'Soil Analysis', result: 'Loamy Soil', time: '3 days ago', status: 'success' },
            ].map((diagnosis, index) => (
              <Card key={index} className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium">{diagnosis.type}</h4>
                  <Badge variant={diagnosis.status === 'success' ? 'default' : 'destructive'}>
                    {diagnosis.result}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{diagnosis.time}</p>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="history" className="space-y-3 mt-4">
            {[
              { action: 'Fertilizer Applied', details: 'NPK 10-20-10', date: 'Mar 28, 2026' },
              { action: 'Irrigation Adjusted', details: 'Schedule updated', date: 'Mar 25, 2026' },
              { action: 'Disease Treatment', details: 'Fungicide applied', date: 'Mar 20, 2026' },
              { action: 'Planting Completed', details: 'Tomatoes planted', date: 'Mar 15, 2026' },
            ].map((event, index) => (
              <Card key={index} className="p-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-primary"></div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{event.action}</h4>
                    <p className="text-xs text-muted-foreground">{event.details}</p>
                    <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}