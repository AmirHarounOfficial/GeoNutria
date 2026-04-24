import React from 'react';
import { useNavigate } from 'react-router';
import { AlertTriangle, CheckCircle, Save, Share2, MessageSquare } from 'lucide-react';
import TopBar from '../components/TopBar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import ConfidenceBar from '../components/ConfidenceBar';

export default function LeafDiseaseResult() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <TopBar title="Disease Detection Result" showBack />
      
      <div className="flex-1 px-4 py-6 space-y-6 pb-6">
        {/* Result Preview */}
        <Card className="p-4 bg-gradient-to-br from-secondary/10 to-secondary/5">
          <div className="flex items-center justify-center mb-4">
            <div className="w-full h-48 bg-muted/50 rounded-xl flex items-center justify-center">
              <span className="text-muted-foreground">Leaf Image Preview</span>
            </div>
          </div>
          <Badge variant="destructive" className="w-full justify-center py-2">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Disease Detected
          </Badge>
        </Card>

        {/* Disease Info */}
        <Card className="p-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">Early Blight</h3>
              <p className="text-sm text-muted-foreground">
                Alternaria solani · Fungal Disease
              </p>
            </div>

            <ConfidenceBar confidence={87} label="Detection Confidence" />

            <div className="pt-3 border-t border-border">
              <h4 className="font-semibold text-sm mb-2">Severity</h4>
              <Badge variant="secondary">Moderate</Badge>
            </div>
          </div>
        </Card>

        {/* Recommendations */}
        <Card className="p-4 bg-accent/5 border-accent/30">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-sm mb-2">Immediate Actions</h4>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>• Remove and destroy affected leaves</li>
                <li>• Apply copper-based fungicide</li>
                <li>• Improve air circulation around plants</li>
                <li>• Avoid overhead watering</li>
                <li>• Monitor weekly for spread</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Additional Info */}
        <Card className="p-4">
          <h4 className="font-semibold text-sm mb-3">Disease Details</h4>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Symptoms:</p>
              <p>Dark brown spots with concentric rings on older leaves, yellowing around spots</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Conditions:</p>
              <p>Thrives in warm, humid weather. Spreads through water splash and wind</p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="gap-2">
            <Save className="w-4 h-4" />
            Save Result
          </Button>
          <Button variant="outline" className="gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>

        <Button 
          className="w-full gap-2" 
          onClick={() => navigate('/app/ai-consultant')}
        >
          <MessageSquare className="w-4 h-4" />
          Consult AI Agronomist
        </Button>
      </div>
    </div>
  );
}
