import React from 'react';
import { useNavigate } from 'react-router';
import { 
  Activity, Leaf, Microscope, TrendingUp, TreePine, Trees,
  Layers, Camera, ChevronRight
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { Card } from '../components/ui/card';
import CreditCostBadge from '../components/CreditCostBadge';
import { useApp } from '../contexts/AppContext';
import { translations } from '../utils/translations';

const diagnosticModules = [
  {
    icon: Activity,
    title: 'IoT Health Diagnosis',
    description: 'Monitor crop health from 11 sensor values',
    path: '/app/iot-diagnosis',
    cost: 2,
    color: 'bg-primary'
  },
  {
    icon: Leaf,
    title: 'Leaf Disease Scan',
    description: 'Identify plant diseases from images',
    path: '/app/leaf-disease',
    cost: 3,
    color: 'bg-accent'
  },
  {
    icon: Microscope,
    title: 'Soil Classification',
    description: 'Classify soil type from images',
    path: '/app/soil-classifier',
    cost: 3,
    color: 'bg-secondary'
  },
  {
    icon: TrendingUp,
    title: 'Crop Recommendation',
    description: 'Get top 7 suitable crops for your field',
    path: '/app/crop-recommendation',
    cost: 4,
    color: 'bg-accent'
  },
  {
    icon: TreePine,
    title: 'Yield Prediction',
    description: 'Estimate crop yield in kg/ha',
    path: '/app/yield-prediction',
    cost: 5,
    color: 'bg-primary'
  },
  {
    icon: Trees,
    title: 'Palm Segmentation',
    description: 'Isolate palm fronds for analysis',
    path: '/app/palm-segmentation',
    cost: 2,
    color: 'bg-secondary'
  },
  {
    icon: Camera,
    title: 'Palm Disease Detection',
    description: 'Detect diseases in palm trees',
    path: '/app/palm-disease',
    cost: 3,
    color: 'bg-accent'
  },
  {
    icon: Layers,
    title: 'Leaf Segmentation',
    description: 'Segment and visualize canopy',
    path: '/app/leaf-segmentation',
    cost: 2,
    color: 'bg-primary'
  },
  {
    icon: Trees,
    title: 'Aerial Palm Counting',
    description: 'Count palm trees from drone images',
    path: '/app/palm-counter',
    cost: 6,
    color: 'bg-secondary'
  },
];

export default function Diagnostics() {
  const navigate = useNavigate();
  const { language } = useApp();
  const t = translations[language];

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <TopBar title={t.diagnostics} />
      
      <div className="flex-1 space-y-4 px-[16px] pt-[24px] pb-[30px]">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">AI Diagnostic Modules</h2>
          <p className="text-sm text-muted-foreground">
            Select a module to analyze your farm data
          </p>
        </div>

        <div className="p-[0px] mx-[0px] mt-[0px] mb-[20px]">
          {diagnosticModules.map((module, index) => {
            const Icon = module.icon;
            return (
              <Card
                key={index}
                className="p-4 cursor-pointer hover:shadow-lg transition-all active:scale-98"
                onClick={() => navigate(module.path)}
              >
                <div className="flex items-center gap-4">
                  <div className={`${module.color} p-3 rounded-xl flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{module.title}</h3>
                      <CreditCostBadge cost={module.cost} />
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {module.description}
                    </p>
                  </div>
                  
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
