import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Building, MapPin, Ruler, Leaf, Calendar } from 'lucide-react';
import TopBar from '../components/TopBar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { useApp } from '../contexts/AppContext';
import { translations } from '../utils/translations';

export default function FarmDetails() {
  const navigate = useNavigate();
  const { language, farmName } = useApp();
  const t = translations[language];
  
  const [formData, setFormData] = useState({
    farmName: farmName,
    size: '25',
    location: 'Riyadh, Saudi Arabia',
    cropTypes: 'Tomatoes, Peppers, Cucumbers',
    establishedDate: '2020-03-15'
  });

  const handleSave = () => {
    // In real app, save to backend
    navigate('/app/profile');
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <TopBar title={t.farmDetails} showBack />
      
      <div className="flex-1 px-4 py-6 space-y-6 pb-6">
        {/* Header Card */}
        <Card className="p-5 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 p-3 rounded-xl">
              <Building className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{farmName}</h3>
              <p className="text-sm text-muted-foreground">
                {language === 'ar' ? 'معلومات المزرعة' : 'Farm Information'}
              </p>
            </div>
          </div>
        </Card>

        {/* Form Fields */}
        <Card className="p-5 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="farmName" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              {language === 'ar' ? 'اسم المزرعة' : 'Farm Name'}
            </Label>
            <Input
              id="farmName"
              value={formData.farmName}
              onChange={(e) => setFormData({...formData, farmName: e.target.value})}
              placeholder={language === 'ar' ? 'أدخل اسم المزرعة' : 'Enter farm name'}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="size" className="flex items-center gap-2">
              <Ruler className="w-4 h-4" />
              {t.farmSize}
            </Label>
            <div className="relative">
              <Input
                id="size"
                type="number"
                value={formData.size}
                onChange={(e) => setFormData({...formData, size: e.target.value})}
                placeholder={language === 'ar' ? 'أدخل حجم المزرعة' : 'Enter farm size'}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                {language === 'ar' ? 'هكتار' : 'hectares'}
              </span>
            </div>
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
              placeholder={language === 'ar' ? 'أدخل الموقع' : 'Enter location'}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cropTypes" className="flex items-center gap-2">
              <Leaf className="w-4 h-4" />
              {t.cropTypes}
            </Label>
            <Textarea
              id="cropTypes"
              value={formData.cropTypes}
              onChange={(e) => setFormData({...formData, cropTypes: e.target.value})}
              placeholder={language === 'ar' ? 'أدخل أنواع المحاصيل' : 'Enter crop types'}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="establishedDate" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {language === 'ar' ? 'تاريخ التأسيس' : 'Established Date'}
            </Label>
            <Input
              id="establishedDate"
              type="date"
              value={formData.establishedDate}
              onChange={(e) => setFormData({...formData, establishedDate: e.target.value})}
            />
          </div>
        </Card>

        {/* Stats Card */}
        <Card className="p-5">
          <h3 className="font-semibold mb-4">
            {language === 'ar' ? 'إحصائيات المزرعة' : 'Farm Statistics'}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">
                {language === 'ar' ? 'إجمالي الحقول' : 'Total Fields'}
              </p>
              <p className="text-2xl font-bold text-primary">4</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {language === 'ar' ? 'المحاصيل النشطة' : 'Active Crops'}
              </p>
              <p className="text-2xl font-bold text-accent">3</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {language === 'ar' ? 'عدد المستشعرات' : 'Sensors'}
              </p>
              <p className="text-2xl font-bold text-secondary">12</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {language === 'ar' ? 'سنوات العمل' : 'Years Active'}
              </p>
              <p className="text-2xl font-bold text-primary">6</p>
            </div>
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
