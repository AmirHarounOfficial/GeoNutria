import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Camera, Upload, Image as ImageIcon } from 'lucide-react';
import TopBar from '../components/TopBar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import CreditCostBadge from '../components/CreditCostBadge';
import { useApp } from '../contexts/AppContext';

export default function LeafDisease() {
  const navigate = useNavigate();
  const { credits, deductCredits } = useApp();
  const [uploading, setUploading] = useState(false);
  const cost = 3;

  const handleAnalyze = () => {
    if (credits < cost) {
      navigate('/app/buy-credits');
      return;
    }
    
    setUploading(true);
    setTimeout(() => {
      deductCredits(cost);
      navigate('/app/leaf-disease/result');
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <TopBar title="Leaf Disease Scanner" showBack />
      
      <div className="flex-1 px-4 py-6 space-y-6 pb-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <CreditCostBadge cost={cost} className="text-base px-4 py-2" />
          </div>
          <p className="text-sm text-muted-foreground">
            Upload or capture a leaf image for AI disease analysis
          </p>
        </div>

        {/* Upload Zone */}
        <Card className="p-8 border-2 border-dashed border-primary/30 bg-primary/5">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="bg-primary/10 p-6 rounded-2xl">
              <ImageIcon className="w-12 h-12 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Upload Leaf Image</h3>
              <p className="text-sm text-muted-foreground">
                Take a clear photo of the affected leaf
              </p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            size="lg" 
            className="w-full gap-2"
            onClick={handleAnalyze}
            disabled={uploading}
          >
            <Camera className="w-5 h-5" />
            {uploading ? 'Processing...' : 'Take Photo'}
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="w-full gap-2"
            onClick={handleAnalyze}
            disabled={uploading}
          >
            <Upload className="w-5 h-5" />
            Upload from Gallery
          </Button>
        </div>

        {/* Tips */}
        <Card className="p-4 bg-muted/50">
          <h4 className="font-semibold text-sm mb-3">Tips for best results:</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">•</span>
              <span>Ensure good lighting and focus on the leaf</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">•</span>
              <span>Capture the entire affected area clearly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">•</span>
              <span>Avoid shadows or reflections on the leaf</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">•</span>
              <span>Hold camera steady for a sharp image</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
