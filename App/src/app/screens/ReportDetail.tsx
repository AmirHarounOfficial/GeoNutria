import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { 
  Calendar, Download, Share2, MapPin, TrendingUp,
  Leaf, AlertTriangle, CheckCircle2, Info
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import ConfidenceBar from '../components/ConfidenceBar';
import { useApp } from '../contexts/AppContext';

export default function ReportDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useApp();

  // Mock report data - in real app, this would be fetched based on id
  const report = {
    id,
    title: 'Leaf Disease Analysis - Field A',
    date: '2026-03-30',
    status: 'urgent',
    field: 'Field A',
    location: 'Section 3B, Northwest Quadrant',
    analysisType: 'Leaf Disease Detection',
    creditsCost: 15,
    results: {
      primary: {
        disease: 'Bacterial Blight',
        confidence: 87,
        severity: 'Moderate'
      },
      details: [
        { label: 'Affected Area', value: '12% of sampled leaves' },
        { label: 'Spread Rate', value: 'Medium (monitored)' },
        { label: 'Weather Impact', value: 'High humidity favorable for spread' },
        { label: 'Recommended Action', value: 'Immediate treatment required' }
      ]
    },
    recommendations: [
      {
        priority: 'high',
        action: 'Apply copper-based bactericide',
        timing: 'Within 24-48 hours',
        details: 'Spray all affected plants and 5m radius around infection sites'
      },
      {
        priority: 'medium',
        action: 'Remove severely infected leaves',
        timing: 'Immediately',
        details: 'Dispose of infected material away from healthy plants'
      },
      {
        priority: 'medium',
        action: 'Monitor adjacent plants',
        timing: 'Daily for next 2 weeks',
        details: 'Check for early signs of infection spread'
      },
      {
        priority: 'low',
        action: 'Improve air circulation',
        timing: 'Within 1 week',
        details: 'Prune dense foliage to reduce humidity around plants'
      }
    ],
    imageUrl: null // Would contain actual image in real app
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-destructive text-white';
      case 'medium': return 'bg-secondary text-white';
      case 'low': return 'bg-accent text-white';
      default: return 'bg-muted';
    }
  };

  const getPriorityLabel = (priority: string) => {
    if (language === 'ar') {
      switch(priority) {
        case 'high': return 'عالية';
        case 'medium': return 'متوسطة';
        case 'low': return 'منخفضة';
        default: return priority;
      }
    }
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <TopBar title={language === 'ar' ? 'تفاصيل التقرير' : 'Report Details'} showBack />
      
      <div className="flex-1 px-4 py-6 space-y-6 pb-6">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-xl font-bold flex-1">{report.title}</h2>
            <Badge className="bg-destructive text-white">
              {language === 'ar' ? 'عاجل' : 'Urgent'}
            </Badge>
          </div>
          
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(report.date).toLocaleDateString(
                  language === 'ar' ? 'ar-SA' : 'en-US',
                  { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
                )}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{report.field} • {report.location}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            {language === 'ar' ? 'تنزيل' : 'Download'}
          </Button>
          <Button variant="outline" className="flex-1">
            <Share2 className="w-4 h-4 mr-2" />
            {language === 'ar' ? 'مشاركة' : 'Share'}
          </Button>
        </div>

        {/* Image Preview */}
        <Card className="p-4">
          <div className="w-full h-48 bg-muted/30 rounded-xl flex items-center justify-center mb-3">
            <Leaf className="w-16 h-16 text-muted-foreground" />
          </div>
          <p className="text-xs text-center text-muted-foreground">
            {language === 'ar' ? 'الصورة المحللة' : 'Analyzed Image'}
          </p>
        </Card>

        {/* Primary Results */}
        <Card className="p-4 bg-destructive/5 border-destructive/20">
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-destructive/10 p-2 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">
                {language === 'ar' ? 'النتيجة الأساسية' : 'Primary Finding'}
              </h3>
              <p className="text-2xl font-bold text-destructive mb-2">
                {report.results.primary.disease}
              </p>
              <ConfidenceBar 
                confidence={report.results.primary.confidence} 
                label={language === 'ar' ? 'درجة الثقة' : 'Confidence'} 
              />
            </div>
          </div>
          
          <Badge variant="outline" className="border-destructive/30">
            {language === 'ar' ? 'الشدة' : 'Severity'}: {report.results.primary.severity}
          </Badge>
        </Card>

        {/* Detailed Analysis */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">
            {language === 'ar' ? 'التحليل التفصيلي' : 'Detailed Analysis'}
          </h3>
          
          <div className="space-y-3">
            {report.results.details.map((detail, index) => (
              <div key={index}>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-sm text-muted-foreground">
                    {detail.label}
                  </span>
                  <span className="text-sm font-medium text-right">
                    {detail.value}
                  </span>
                </div>
                {index < report.results.details.length - 1 && (
                  <Separator className="mt-3" />
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Recommendations */}
        <div>
          <h3 className="text-lg font-semibold mb-3">
            {language === 'ar' ? 'التوصيات' : 'Recommendations'}
          </h3>
          
          <div className="space-y-3">
            {report.recommendations.map((rec, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Info className="w-4 h-4 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-sm">{rec.action}</h4>
                      <Badge className={getPriorityColor(rec.priority)}>
                        {getPriorityLabel(rec.priority)}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {rec.details}
                    </p>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{rec.timing}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Analysis Metadata */}
        <Card className="p-4 bg-muted/30">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="w-4 h-4" />
            <span>
              {language === 'ar' 
                ? `تم التحليل باستخدام ${report.creditsCost} نقطة` 
                : `Analysis performed using ${report.creditsCost} credits`}
            </span>
          </div>
        </Card>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Button 
            className="w-full bg-primary text-white"
            onClick={() => navigate('/app/fields/1')}
          >
            {language === 'ar' ? 'عرض تفاصيل الحقل' : 'View Field Details'}
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/app/leaf-disease')}
          >
            {language === 'ar' ? 'إجراء تحليل جديد' : 'Run New Analysis'}
          </Button>
        </div>
      </div>
    </div>
  );
}
