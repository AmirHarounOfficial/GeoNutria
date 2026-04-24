import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  FileText, Calendar, TrendingUp, Download, Filter,
  Leaf, Activity, Droplets, AlertTriangle, ChevronRight
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { useApp } from '../contexts/AppContext';

interface Report {
  id: string;
  title: string;
  date: string;
  type: 'diagnostic' | 'field' | 'iot' | 'analysis';
  status: 'completed' | 'in-progress' | 'urgent';
  field?: string;
  icon: React.ElementType;
  summary: string;
}

const mockReports: Report[] = [
  {
    id: '1',
    title: 'Leaf Disease Analysis - Field A',
    date: '2026-03-30',
    type: 'diagnostic',
    status: 'urgent',
    field: 'Field A',
    icon: Leaf,
    summary: 'Bacterial blight detected on 12% of sampled leaves'
  },
  {
    id: '2',
    title: 'Weekly IoT Health Report',
    date: '2026-03-28',
    type: 'iot',
    status: 'completed',
    icon: Activity,
    summary: 'All sensors operational. Average soil moisture: 65%'
  },
  {
    id: '3',
    title: 'Soil Analysis - Field B',
    date: '2026-03-27',
    type: 'diagnostic',
    status: 'completed',
    field: 'Field B',
    icon: Droplets,
    summary: 'Loamy soil detected. pH: 6.8, Nitrogen: High'
  },
  {
    id: '4',
    title: 'Monthly Crop Health Summary',
    date: '2026-03-25',
    type: 'analysis',
    status: 'completed',
    icon: TrendingUp,
    summary: 'Overall farm health improved by 8% this month'
  },
  {
    id: '5',
    title: 'Palm Tree Count - Aerial Survey',
    date: '2026-03-23',
    type: 'analysis',
    status: 'completed',
    icon: Leaf,
    summary: '156 palm trees identified. 3 new growths detected'
  },
  {
    id: '6',
    title: 'Disease Alert - Field C',
    date: '2026-03-20',
    type: 'diagnostic',
    status: 'urgent',
    field: 'Field C',
    icon: AlertTriangle,
    summary: 'Red palm weevil signs detected in 2 locations'
  },
];

export default function Reports() {
  const navigate = useNavigate();
  const { language } = useApp();
  const [activeTab, setActiveTab] = useState('all');

  const filteredReports = activeTab === 'all' 
    ? mockReports 
    : mockReports.filter(r => r.type === activeTab);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'urgent': return 'bg-destructive text-white';
      case 'in-progress': return 'bg-secondary text-white';
      case 'completed': return 'bg-accent text-white';
      default: return 'bg-muted';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'urgent': return language === 'ar' ? 'عاجل' : 'Urgent';
      case 'in-progress': return language === 'ar' ? 'قيد التنفيذ' : 'In Progress';
      case 'completed': return language === 'ar' ? 'مكتمل' : 'Completed';
      default: return status;
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <TopBar title={language === 'ar' ? 'التقارير' : 'Reports'} showBack />
      
      <div className="flex-1 px-4 py-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-xs text-muted-foreground">
                  {language === 'ar' ? 'إجمالي التقارير' : 'Total Reports'}
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-destructive/10 p-2 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-xs text-muted-foreground">
                  {language === 'ar' ? 'تقارير عاجلة' : 'Urgent Reports'}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filter Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-5">
            <TabsTrigger value="all" className="text-xs">
              {language === 'ar' ? 'الكل' : 'All'}
            </TabsTrigger>
            <TabsTrigger value="diagnostic" className="text-xs">
              {language === 'ar' ? 'تشخيص' : 'Scans'}
            </TabsTrigger>
            <TabsTrigger value="iot" className="text-xs">
              IoT
            </TabsTrigger>
            <TabsTrigger value="field" className="text-xs">
              {language === 'ar' ? 'حقول' : 'Fields'}
            </TabsTrigger>
            <TabsTrigger value="analysis" className="text-xs">
              {language === 'ar' ? 'تحليل' : 'Analysis'}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Export Button */}
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => {/* Export functionality */}}
        >
          <Download className="w-4 h-4 mr-2" />
          {language === 'ar' ? 'تصدير التقارير' : 'Export Reports'}
        </Button>

        {/* Reports List */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">
            {language === 'ar' ? 'التقارير الحديثة' : 'Recent Reports'}
          </h3>
          
          {filteredReports.map((report) => {
            const Icon = report.icon;
            return (
              <Card
                key={report.id}
                className="p-4 cursor-pointer hover:shadow-lg transition-all active:scale-98"
                onClick={() => navigate(`/app/reports/${report.id}`)}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-xl">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-semibold text-sm leading-tight">
                        {report.title}
                      </h4>
                      <Badge className={getStatusColor(report.status)}>
                        {getStatusLabel(report.status)}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {report.summary}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {new Date(report.date).toLocaleDateString(
                            language === 'ar' ? 'ar-SA' : 'en-US',
                            { month: 'short', day: 'numeric', year: 'numeric' }
                          )}
                        </span>
                      </div>
                      
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredReports.length === 0 && (
          <Card className="p-8 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              {language === 'ar' ? 'لا توجد تقارير' : 'No reports found'}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
