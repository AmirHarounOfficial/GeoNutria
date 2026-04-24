import React from 'react';
import { useNavigate } from 'react-router';
import { 
  User, Building, CreditCard, Bell, Settings, HelpCircle, 
  FileText, Globe, ChevronRight, LogOut, Shield, Edit
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { useApp } from '../contexts/AppContext';
import { translations } from '../utils/translations';

export default function Profile() {
  const navigate = useNavigate();
  const { userName, farmName, language, setLanguage, currentPlan } = useApp();
  const t = translations[language];

  const menuItems = [
    { 
      icon: User, 
      label: t.profileInfo,
      labelAr: 'معلومات الملف الشخصي',
      path: '/app/edit-profile'
    },
    { 
      icon: CreditCard, 
      label: t.subscriptionBilling,
      labelAr: 'الاشتراك والفواتير',
      path: '/app/subscription',
      badge: currentPlan === 'pro' ? (language === 'ar' ? 'احترافي' : 'Pro') : (language === 'ar' ? 'أساسي' : 'Basic')
    },
    { 
      icon: Building, 
      label: t.farmDetails,
      labelAr: 'تفاصيل المزرعة',
      path: '/app/farm-details'
    },
    { 
      icon: Bell, 
      label: t.notifications,
      labelAr: 'الإشعارات',
      path: '/app/notifications'
    },
    { 
      icon: FileText, 
      label: t.reports,
      labelAr: 'التقارير',
      path: '/app/reports'
    },
    { 
      icon: Settings, 
      label: t.settings,
      labelAr: 'الإعدادات',
      path: '/app/settings'
    },
    { 
      icon: HelpCircle, 
      label: t.helpSupport,
      labelAr: 'المساعدة والدعم',
      path: '/app/help'
    },
    { 
      icon: Shield, 
      label: t.security,
      labelAr: 'الأمان والخصوصية',
      path: '/app/security'
    },
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <TopBar title={t.profile} />
      
      <div className="flex-1 px-4 py-6 space-y-6 pb-6">
        {/* Profile Header */}
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="flex items-center gap-4">
            <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-semibold">
              {userName.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{userName}</h2>
              <p className="text-sm text-muted-foreground">{farmName}</p>
              <Badge variant="secondary" className="mt-2">
                {language === 'ar' ? 'مالك المزرعة' : 'Farm Owner'}
              </Badge>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => navigate('/app/edit-profile')}
            >
              <Edit className="w-5 h-5" />
            </Button>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-3 text-center">
            <p className="text-2xl font-bold text-primary">4</p>
            <p className="text-xs text-muted-foreground mt-1">
              {language === 'ar' ? 'حقول' : 'Fields'}
            </p>
          </Card>
          <Card className="p-3 text-center">
            <p className="text-2xl font-bold text-accent">92%</p>
            <p className="text-xs text-muted-foreground mt-1">
              {language === 'ar' ? 'الصحة' : 'Health'}
            </p>
          </Card>
          <Card className="p-3 text-center">
            <p className="text-2xl font-bold text-secondary">156</p>
            <p className="text-xs text-muted-foreground mt-1">
              {language === 'ar' ? 'فحوصات' : 'Scans'}
            </p>
          </Card>
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={index}
                className="p-4 cursor-pointer hover:shadow-md transition-all active:scale-98"
                onClick={() => navigate(item.path)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-muted p-2 rounded-lg">
                      <Icon className="w-5 h-5 text-foreground" />
                    </div>
                    <span className="font-medium">
                      {language === 'ar' ? item.labelAr : item.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Language Toggle */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-muted p-2 rounded-lg">
                <Globe className="w-5 h-5 text-foreground" />
              </div>
              <span className="font-medium">{t.language}</span>
            </div>
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium"
            >
              {language === 'en' ? 'العربية' : 'English'}
            </button>
          </div>
        </Card>

        {/* Logout */}
        <button
          onClick={() => navigate('/login')}
          className="w-full flex items-center justify-center gap-2 p-4 text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">{t.logout}</span>
        </button>

        {/* App Info */}
        <div className="text-center text-sm text-muted-foreground pb-4">
          <p>GeoNutria v1.0.0</p>
          <p className="mt-1">
            {language === 'ar' 
              ? '© 2026 GeoNutria. جميع الحقوق محفوظة.'
              : '© 2026 GeoNutria. All rights reserved.'}
          </p>
        </div>
      </div>
    </div>
  );
}