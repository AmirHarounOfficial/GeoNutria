import React, { useState } from 'react';
import { Lock, Smartphone, Key, Shield, Eye, EyeOff, Check } from 'lucide-react';
import TopBar from '../components/TopBar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Separator } from '../components/ui/separator';
import { useApp } from '../contexts/AppContext';
import { translations } from '../utils/translations';

export default function Security() {
  const { language } = useApp();
  const t = translations[language];
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const connectedDevices = [
    {
      name: 'iPhone 14 Pro',
      location: 'Riyadh, Saudi Arabia',
      lastActive: language === 'ar' ? 'نشط الآن' : 'Active now',
      current: true
    },
    {
      name: 'iPad Air',
      location: 'Riyadh, Saudi Arabia',
      lastActive: language === 'ar' ? 'منذ يومين' : '2 days ago',
      current: false
    }
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <TopBar title={t.security} showBack />
      
      <div className="flex-1 px-4 py-6 space-y-6 pb-6">
        {/* Change Password Section */}
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold">{t.changePassword}</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">
                {language === 'ar' ? 'كلمة المرور الحالية' : 'Current Password'}
              </Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">
                {language === 'ar' ? 'كلمة المرور الجديدة' : 'New Password'}
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                {language === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password'}
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
              />
            </div>

            <Button className="w-full">
              {language === 'ar' ? 'تحديث كلمة المرور' : 'Update Password'}
            </Button>
          </div>
        </Card>

        {/* Two-Factor Authentication */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{t.twoFactorAuth}</h3>
                <p className="text-xs text-muted-foreground">
                  {language === 'ar' 
                    ? 'طبقة إضافية من الأمان لحسابك'
                    : 'Add an extra layer of security to your account'}
                </p>
              </div>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={setTwoFactorEnabled}
            />
          </div>

          {twoFactorEnabled && (
            <>
              <Separator className="my-4" />
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-accent" />
                  <span>{language === 'ar' ? 'SMS إلى +966 ••• •••• 67' : 'SMS to +966 ••• •••• 67'}</span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  {language === 'ar' ? 'تكوين المصادقة' : 'Configure Authentication'}
                </Button>
              </div>
            </>
          )}
        </Card>

        {/* Connected Devices */}
        <div>
          <h3 className="font-semibold mb-3">{t.connectedDevices}</h3>
          <div className="space-y-3">
            {connectedDevices.map((device, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="bg-muted p-2 rounded-lg">
                      <Smartphone className="w-5 h-5 text-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm">{device.name}</h4>
                        {device.current && (
                          <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded">
                            {language === 'ar' ? 'هذا الجهاز' : 'This device'}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{device.location}</p>
                      <p className="text-xs text-muted-foreground mt-1">{device.lastActive}</p>
                    </div>
                  </div>
                  {!device.current && (
                    <Button variant="ghost" size="sm" className="text-destructive">
                      {language === 'ar' ? 'إزالة' : 'Remove'}
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Security Tips */}
        <Card className="p-4 bg-accent/5 border-accent/30">
          <div className="flex items-start gap-3">
            <Key className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm mb-2">
                {language === 'ar' ? 'نصائح الأمان' : 'Security Tips'}
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• {language === 'ar' ? 'استخدم كلمة مرور قوية وفريدة' : 'Use a strong and unique password'}</li>
                <li>• {language === 'ar' ? 'فعّل المصادقة الثنائية' : 'Enable two-factor authentication'}</li>
                <li>• {language === 'ar' ? 'راجع الأجهزة المتصلة بانتظام' : 'Review connected devices regularly'}</li>
                <li>• {language === 'ar' ? 'لا تشارك بيانات حسابك' : 'Never share your account credentials'}</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}