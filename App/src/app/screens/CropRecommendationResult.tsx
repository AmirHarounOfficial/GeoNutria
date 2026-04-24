import React from 'react';
import TopBar from '../components/TopBar';
import { Card } from '../components/ui/card';
import ConfidenceBar from '../components/ConfidenceBar';
import { Leaf } from 'lucide-react';

const recommendations = [
  { crop: 'Rice', confidence: 94 },
  { crop: 'Wheat', confidence: 88 },
  { crop: 'Maize', confidence: 85 },
  { crop: 'Cotton', confidence: 79 },
  { crop: 'Sugarcane', confidence: 75 },
  { crop: 'Tomato', confidence: 72 },
  { crop: 'Potato', confidence: 68 },
];

export default function CropRecommendationResult() {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <TopBar title="Crop Recommendations" showBack />
      <div className="flex-1 px-4 py-6 space-y-4">
        <h3 className="font-semibold">Top 7 Recommended Crops</h3>
        {recommendations.map((rec, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-accent/20 p-2 rounded-lg">
                <Leaf className="w-5 h-5 text-accent" />
              </div>
              <h4 className="font-semibold">{rec.crop}</h4>
            </div>
            <ConfidenceBar confidence={rec.confidence} label="Suitability" />
          </Card>
        ))}
      </div>
    </div>
  );
}
