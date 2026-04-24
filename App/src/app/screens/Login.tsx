import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Sprout, Mail, Lock, Globe } from 'lucide-react';
import MobileContainer from '../components/MobileContainer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useApp } from '../contexts/AppContext';

export default function Login() {
  const navigate = useNavigate();
  const { language, setLanguage } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/app');
  };

  return (
    <MobileContainer>
      <div className="flex flex-col h-full bg-background">
        {/* Language Toggle */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm">{language === 'en' ? 'العربية' : 'English'}</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center px-6">
          <div className="w-full max-w-sm mx-auto space-y-8">
            {/* Logo & Title */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="bg-primary/10 p-6 rounded-2xl">
                  <Sprout className="w-12 h-12 text-primary" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  {language === 'en' ? 'Welcome Back' : 'مرحباً بعودتك'}
                </h1>
                <p className="text-muted-foreground mt-2">
                  {language === 'en' 
                    ? 'Sign in to your GeoNutria account' 
                    : 'سجل الدخول إلى حسابك في GeoNutria'}
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                {language === 'en' ? 'Sign In' : 'تسجيل الدخول'}
              </Button>
            </form>

            {/* Links */}
            <div className="space-y-4 text-center">
              <button className="text-sm text-primary hover:underline">
                {language === 'en' ? 'Forgot password?' : 'نسيت كلمة المرور؟'}
              </button>
              
              <div className="text-sm text-muted-foreground">
                {language === 'en' ? "Don't have an account? " : 'ليس لديك حساب؟ '}
                <button
                  onClick={() => navigate('/signup')}
                  className="text-primary hover:underline"
                >
                  {language === 'en' ? 'Sign up' : 'إنشاء حساب'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
}
