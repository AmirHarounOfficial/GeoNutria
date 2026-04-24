import React from 'react';
import { useNavigate } from 'react-router';
import { 
  Leaf, Droplets, Activity, TrendingUp, Trees, AlertTriangle,
  Camera, Microscope, MessageSquare, Upload, Cloud, Sun
} from 'lucide-react';
import TopBar from '../components/TopBar';
import KPICard from '../components/KPICard';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useApp } from '../contexts/AppContext';
import { translations } from '../utils/translations';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const cropHealthData = [
  { day: 'Mon', health: 85 },
  { day: 'Tue', health: 82 },
  { day: 'Wed', health: 88 },
  { day: 'Thu', health: 86 },
  { day: 'Fri', health: 90 },
  { day: 'Sat', health: 89 },
  { day: 'Sun', health: 92 },
];

export default function Home() {
  const navigate = useNavigate();
  const { language, userName, farmName } = useApp();
  const t = translations[language];

  const quickActions = [
    { icon: Camera, label: t.scanLeaf, path: '/app/leaf-disease', color: 'bg-accent' },
    { icon: Microscope, label: t.scanSoil, path: '/app/soil-classifier', color: 'bg-secondary' },
    { icon: Activity, label: t.checkIoT, path: '/app/iot-diagnosis', color: 'bg-primary' },
    { icon: MessageSquare, label: t.askAI, path: '/app/ai-consultant', color: 'bg-accent' },
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <TopBar />
      
      <div className="flex-1 px-4 py-6 space-y-6 pb-6">
        {/* Greeting */}
        <div className="space-y-1">
          <p className="text-muted-foreground">{t.welcomeBack},</p>
          <h2 className="text-2xl font-semibold text-foreground">{userName}</h2>
          <p className="text-sm text-muted-foreground">{farmName}</p>
        </div>

        {/* Weather & Farm Status */}
        <Card className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-3 rounded-full">
                <Sun className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Today's Weather</p>
                <p className="text-xl font-semibold">28°C · Sunny</p>
              </div>
            </div>
            <Badge className="bg-accent text-white hover:bg-accent">
              {t.healthy}
            </Badge>
          </div>
        </Card>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-3">
          <KPICard
            icon={<Leaf className="w-4 h-4" />}
            label={t.activeFields}
            value="4"
            trend="up"
            trendValue="+1"
          />
          <KPICard
            icon={<Activity className="w-4 h-4" />}
            label={t.sensorHealth}
            value="98%"
            trend="up"
            trendValue="+2%"
          />
          <KPICard
            icon={<AlertTriangle className="w-4 h-4" />}
            label={t.diseaseAlerts}
            value="2"
            trend="down"
            trendValue="-1"
          />
          <KPICard
            icon={<Trees className="w-4 h-4" />}
            label={t.palmCount}
            value="156"
          />
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold mb-3">{t.quickActions}</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={() => navigate(action.path)}
                  className="flex flex-col items-center gap-3 p-4 bg-card border border-border rounded-2xl hover:shadow-lg transition-all active:scale-95"
                >
                  <div className={`${action.color} p-3 rounded-xl`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-center">
                    {action.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Crop Health Trend */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">
            {language === 'ar' ? 'اتجاه صحة المحاصيل' : 'Crop Health Trend'}
          </h3>
          <div className="w-full -mx-2">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={cropHealthData} margin={{ left: -20, right: 10 }} id="home-health-chart">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="day" 
                  tick={{ fontSize: 12 }}
                  stroke="#9ca3af"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="#9ca3af"
                  domain={[70, 100]}
                />
                <Line 
                  type="monotone" 
                  dataKey="health" 
                  stroke="#0F4C5C" 
                  strokeWidth={3}
                  dot={{ fill: '#0F4C5C', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">{t.recentActivity}</h3>
            <button 
              className="text-sm text-primary"
              onClick={() => navigate('/app/reports')}
            >
              View All
            </button>
          </div>
          <div className="space-y-2">
            {[
              { type: 'Leaf Scan', field: 'Field A', time: '2 hours ago', status: 'success' },
              { type: 'IoT Reading', field: 'Field B', time: '5 hours ago', status: 'success' },
              { type: 'Disease Alert', field: 'Field C', time: '1 day ago', status: 'warning' },
            ].map((activity, index) => (
              <Card key={index} className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'success' ? 'bg-accent' : 'bg-secondary'
                    }`} />
                    <div>
                      <p className="text-sm font-medium">{activity.type}</p>
                      <p className="text-xs text-muted-foreground">{activity.field}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <Card className="p-4 bg-accent/5 border-accent/30">
          <div className="flex items-start gap-3">
            <div className="bg-accent p-2 rounded-lg">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm mb-1">Irrigation Reminder</h4>
              <p className="text-sm text-muted-foreground">
                Field B soil moisture is at 45%. Consider watering in the next 24 hours.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}