import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Sprout, Mail, Lock, User, Building } from 'lucide-react';
import MobileContainer from '../components/MobileContainer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useApp } from '../contexts/AppContext';

export default function Signup() {
  const navigate = useNavigate();
  const { language } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    farmName: '',
  });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/app');
  };

  return (
    <MobileContainer>
      <div className="flex flex-col h-full bg-background overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border px-4 py-3">
          <button
            onClick={() => navigate('/login')}
            className="text-primary text-sm"
          >
            ← {language === 'en' ? 'Back to login' : 'العودة للدخول'}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 py-8">
          <div className="w-full max-w-sm mx-auto space-y-6">
            {/* Logo & Title */}
            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <div className="bg-primary/10 p-5 rounded-2xl">
                  <Sprout className="w-10 h-10 text-primary" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {language === 'en' ? 'Create Account' : 'إنشاء حساب'}
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  {language === 'en' 
                    ? 'Join GeoNutria to transform your farm' 
                    : 'انضم إلى GeoNutria لتحويل مزرعتك'}
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  {language === 'en' ? 'Full Name' : 'الاسم الكامل'}
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder={language === 'en' ? 'Ahmed Hassan' : 'أحمد حسن'}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmName">
                  {language === 'en' ? 'Farm Name' : 'اسم المزرعة'}
                </Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="farmName"
                    type="text"
                    placeholder={language === 'en' ? 'Green Valley Farm' : 'مزرعة الوادي الأخضر'}
                    value={formData.farmName}
                    onChange={(e) => setFormData({...formData, farmName: e.target.value})}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  {language === 'en' ? 'Email' : 'البريد الإلكتروني'}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={language === 'en' ? 'your@email.com' : 'البريد@الإلكتروني.com'}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  {language === 'en' ? 'Password' : 'كلمة المرور'}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="pl-10"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                {language === 'en' ? 'Create Account' : 'إنشاء الحساب'}
              </Button>
            </form>

            {/* Terms */}
            <p className="text-xs text-muted-foreground text-center">
              {language === 'en' 
                ? 'By creating an account, you agree to our Terms of Service and Privacy Policy' 
                : 'بإنشاء حساب، فإنك توافق على شروط الخدمة وسياسة الخصوصية'}
            </p>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
}
