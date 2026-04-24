import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { User, Mail, Phone, MapPin, Camera } from 'lucide-react';
import TopBar from '../components/TopBar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useApp } from '../contexts/AppContext';
import { translations } from '../utils/translations';

export default function EditProfile() {
  const navigate = useNavigate();
  const { language, userName, farmName } = useApp();
  const t = translations[language];
  
  const [formData, setFormData] = useState({
    fullName: userName,
    email: 'ahmed.hassan@example.com',
    phone: '+966 50 123 4567',
    location: 'Riyadh, Saudi Arabia'
  });

  const handleSave = () => {
    // In real app, save to backend
    navigate('/app/profile');
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <TopBar title={t.editProfile} showBack />
      
      <div className="flex-1 px-4 py-6 space-y-6 pb-6">
        {/* Profile Picture */}
        <Card className="p-6">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="bg-primary text-white w-24 h-24 rounded-full flex items-center justify-center text-3xl font-semibold">
                {userName.split(' ').map(n => n[0]).join('')}
              </div>
              <button className="absolute bottom-0 right-0 bg-accent text-white p-2 rounded-full hover:bg-accent/90">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground">
              {language === 'ar' ? 'انقر لتحديث صورة الملف الشخصي' : 'Click to update profile picture'}
            </p>
          </div>
        </Card>

        {/* Form Fields */}
        <Card className="p-5 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {t.fullName}
            </Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {t.email}
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {t.phone}
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder={language === 'ar' ? 'أدخل رقم هاتفك' : 'Enter your phone number'}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {t.location}
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder={language === 'ar' ? 'أدخل موقعك' : 'Enter your location'}
            />
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate('/app/profile')}
          >
            {t.cancel}
          </Button>
          <Button
            className="flex-1"
            onClick={handleSave}
          >
            {t.save}
          </Button>
        </div>
      </div>
    </div>
  );
}
