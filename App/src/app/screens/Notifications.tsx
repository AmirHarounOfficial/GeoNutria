import React from 'react';
import TopBar from '../components/TopBar';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { AlertTriangle, Activity, CheckCircle, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const notifications = [
  {
    type: 'alert',
    icon: AlertTriangle,
    title: 'Disease Alert - Field A',
    message: 'Early blight detected in Field A. Immediate action recommended.',
    time: '2 hours ago',
    read: false,
    priority: 'high'
  },
  {
    type: 'info',
    icon: Activity,
    title: 'IoT Sensor Update',
    message: 'Field B soil moisture dropped to 45%. Consider irrigation.',
    time: '5 hours ago',
    read: false,
    priority: 'medium'
  },
  {
    type: 'success',
    icon: CheckCircle,
    title: 'Analysis Complete',
    message: 'Your palm tree counting analysis is ready to view.',
    time: '1 day ago',
    read: true,
    priority: 'low'
  },
  {
    type: 'info',
    icon: Info,
    title: 'Credit Reminder',
    message: 'You have 200 credits remaining this month.',
    time: '2 days ago',
    read: true,
    priority: 'low'
  },
];

export default function Notifications() {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <TopBar title="Notifications" showBack showNotifications={false} />
      
      <div className="flex-1 px-4 py-6 space-y-4">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-3 mt-4">
            {notifications.map((notification, index) => {
              const Icon = notification.icon;
              const iconColor = 
                notification.type === 'alert' ? 'text-destructive' :
                notification.type === 'success' ? 'text-accent' :
                'text-primary';
              
              return (
                <Card 
                  key={index} 
                  className={`p-4 ${!notification.read ? 'bg-primary/5 border-primary/20' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      notification.type === 'alert' ? 'bg-destructive/10' :
                      notification.type === 'success' ? 'bg-accent/10' :
                      'bg-primary/10'
                    }`}>
                      <Icon className={`w-5 h-5 ${iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-sm">{notification.title}</h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1.5"></div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                        {notification.priority === 'high' && (
                          <Badge variant="destructive" className="text-xs">Urgent</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
