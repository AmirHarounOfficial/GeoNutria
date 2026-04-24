import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  User, Globe, Bell, Lock, CreditCard, HelpCircle,
  LogOut, ChevronRight, Moon, Sun, Smartphone,
  Mail, Shield, FileText, Info, Trash2
} from 'lucide-react';
import TopBar from '../components/TopBar';
import { Card } from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import { Separator } from '../components/ui/separator';
import { Button } from '../components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';
import { useApp } from '../contexts/AppContext';

interface SettingItem {
  icon: React.ElementType;
  label: string;
  labelAr: string;
  value?: string;
  type: 'navigation' | 'toggle' | 'action';
  action?: () => void;
  toggleValue?: boolean;
  onToggle?: (value: boolean) => void;
}

export default function Settings() {
  const navigate = useNavigate();
  const { language, setLanguage, userName, farmName, darkMode, setDarkMode } = useApp();
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const accountSettings: SettingItem[] = [
    {
      icon: User,
      label: 'Profile Information',
      labelAr: 'معلومات الملف الشخصي',
      type: 'navigation',
      action: () => navigate('/app/profile')
    },
    {
      icon: Globe,
      label: 'Language',
      labelAr: 'اللغة',
      value: language === 'ar' ? 'العربية' : 'English',
      type: 'action',
      action: () => setLanguage(language === 'ar' ? 'en' : 'ar')
    },
    {
      icon: CreditCard,
      label: 'Subscription & Billing',
      labelAr: 'الاشتراك والفواتير',
      type: 'navigation',
      action: () => navigate('/app/subscription')
    },
  ];

  const notificationSettings: SettingItem[] = [
    {
      icon: Bell,
      label: 'Push Notifications',
      labelAr: 'الإشعارات الفورية',
      type: 'toggle',
      toggleValue: notifications,
      onToggle: setNotifications
    },
    {
      icon: Mail,
      label: 'Email Notifications',
      labelAr: 'إشعارات البريد الإلكتروني',
      type: 'toggle',
      toggleValue: emailNotifications,
      onToggle: setEmailNotifications
    },
  ];

  const appearanceSettings: SettingItem[] = [
    {
      icon: darkMode ? Moon : Sun,
      label: 'Dark Mode',
      labelAr: 'الوضع الداكن',
      type: 'toggle',
      toggleValue: darkMode,
      onToggle: setDarkMode
    },
  ];

  const securitySettings: SettingItem[] = [
    {
      icon: Lock,
      label: 'Change Password',
      labelAr: 'تغيير كلمة المرور',
      type: 'navigation',
      action: () => {/* Navigate to change password */}
    },
    {
      icon: Shield,
      label: 'Two-Factor Authentication',
      labelAr: 'المصادقة الثنائية',
      type: 'navigation',
      action: () => {/* Navigate to 2FA settings */}
    },
    {
      icon: Smartphone,
      label: 'Connected Devices',
      labelAr: 'الأجهزة المتصلة',
      type: 'navigation',
      action: () => {/* Navigate to devices */}
    },
  ];

  const supportSettings: SettingItem[] = [
    {
      icon: HelpCircle,
      label: 'Help & Support',
      labelAr: 'المساعدة والدعم',
      type: 'navigation',
      action: () => {/* Navigate to help */}
    },
    {
      icon: FileText,
      label: 'Terms of Service',
      labelAr: 'شروط الخدمة',
      type: 'navigation',
      action: () => {/* Navigate to terms */}
    },
    {
      icon: Info,
      label: 'Privacy Policy',
      labelAr: 'سياسة الخصوصية',
      type: 'navigation',
      action: () => {/* Navigate to privacy */}
    },
  ];

  const renderSettingItem = (item: SettingItem) => {
    const Icon = item.icon;
    const label = language === 'ar' ? item.labelAr : item.label;

    return (
      <div
        key={label}
        className="flex items-center justify-between py-3 cursor-pointer active:bg-muted/50 transition-colors rounded-lg px-2 -mx-2"
        onClick={() => {
          if (item.type === 'navigation' || item.type === 'action') {
            item.action?.();
          }
        }}
      >
        <div className="flex items-center gap-3 flex-1">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Icon className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">{label}</p>
            {item.value && (
              <p className="text-xs text-muted-foreground mt-0.5">{item.value}</p>
            )}
          </div>
        </div>
        
        {item.type === 'toggle' ? (
          <Switch
            checked={item.toggleValue}
            onCheckedChange={item.onToggle}
          />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        )}
      </div>
    );
  };

  const handleLogout = () => {
    // In real app, clear auth tokens and user data
    navigate('/login');
  };

  const handleDeleteAccount = () => {
    // In real app, call API to delete account
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <TopBar title={language === 'ar' ? 'الإعدادات' : 'Settings'} showBack />
      
      <div className="flex-1 px-4 py-6 space-y-6 pb-6">
        {/* User Profile Card */}
        <Card className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <div className="flex items-center gap-4">
            <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold">
              {userName.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">{userName}</h3>
              <p className="text-sm text-muted-foreground">{farmName}</p>
            </div>
          </div>
        </Card>

        {/* Account Settings */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-2">
            {language === 'ar' ? 'الحساب' : 'ACCOUNT'}
          </h3>
          <Card className="p-4">
            {accountSettings.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingItem(item)}
                {index < accountSettings.length - 1 && <Separator className="my-2" />}
              </React.Fragment>
            ))}
          </Card>
        </div>

        {/* Notifications */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-2">
            {language === 'ar' ? 'الإشعارات' : 'NOTIFICATIONS'}
          </h3>
          <Card className="p-4">
            {notificationSettings.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingItem(item)}
                {index < notificationSettings.length - 1 && <Separator className="my-2" />}
              </React.Fragment>
            ))}
          </Card>
        </div>

        {/* Appearance */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-2">
            {language === 'ar' ? 'المظهر' : 'APPEARANCE'}
          </h3>
          <Card className="p-4">
            {appearanceSettings.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingItem(item)}
              </React.Fragment>
            ))}
          </Card>
        </div>

        {/* Security & Privacy */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-2">
            {language === 'ar' ? 'الأمان والخصوصية' : 'SECURITY & PRIVACY'}
          </h3>
          <Card className="p-4">
            {securitySettings.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingItem(item)}
                {index < securitySettings.length - 1 && <Separator className="my-2" />}
              </React.Fragment>
            ))}
          </Card>
        </div>

        {/* Support & Legal */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-2">
            {language === 'ar' ? 'الدعم والقانون' : 'SUPPORT & LEGAL'}
          </h3>
          <Card className="p-4">
            {supportSettings.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingItem(item)}
                {index < supportSettings.length - 1 && <Separator className="my-2" />}
              </React.Fragment>
            ))}
          </Card>
        </div>

        {/* App Version */}
        <Card className="p-4 bg-muted/30">
          <div className="text-center text-sm text-muted-foreground">
            <p>GeoNutria v1.0.0</p>
            <p className="text-xs mt-1">
              {language === 'ar' ? 'آخر تحديث: 1 أبريل 2026' : 'Last updated: April 1, 2026'}
            </p>
          </div>
        </Card>

        {/* Logout Button */}
        <Button 
          variant="outline" 
          className="w-full border-destructive/30 text-destructive hover:bg-destructive hover:text-white"
          onClick={() => setShowLogoutDialog(true)}
        >
          <LogOut className="w-4 h-4 mr-2" />
          {language === 'ar' ? 'تسجيل الخروج' : 'Log Out'}
        </Button>

        {/* Delete Account */}
        <Button 
          variant="ghost" 
          className="w-full text-destructive hover:bg-destructive/10"
          onClick={() => setShowDeleteDialog(true)}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          {language === 'ar' ? 'حذف الحساب' : 'Delete Account'}
        </Button>
      </div>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {language === 'ar' ? 'تأكيد تسجيل الخروج' : 'Confirm Logout'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {language === 'ar' 
                ? 'هل أنت متأكد أنك تريد تسجيل الخروج من حسابك؟'
                : 'Are you sure you want to log out of your account?'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout} className="bg-destructive text-white">
              {language === 'ar' ? 'تسجيل الخروج' : 'Log Out'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Account Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {language === 'ar' ? 'حذف الحساب نهائياً' : 'Delete Account Permanently'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {language === 'ar' 
                ? 'تحذير: هذا الإجراء لا رجعة فيه. سيتم حذف جميع بياناتك وتقاريرك وحقولك بشكل دائم. لن تتمكن من استعادة هذه المعلومات.'
                : 'Warning: This action cannot be undone. All your data, reports, and fields will be permanently deleted. You will not be able to recover this information.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteAccount} 
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {language === 'ar' ? 'حذف الحساب' : 'Delete Account'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}