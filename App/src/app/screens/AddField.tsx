import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { MapPin, Ruler, Sprout, Calendar, Wifi, Save, X, Map } from 'lucide-react';
import TopBar from '../components/TopBar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useApp } from '../contexts/AppContext';
import { translations } from '../utils/translations';

export default function AddField() {
  const navigate = useNavigate();
  const { language } = useApp();
  const t = translations[language];

  const [formData, setFormData] = useState({
    name: '',
    size: '',
    cropType: '',
    zone: '',
    sensorId: '',
    plantingDate: '',
  });

  const cropTypes = [
    'Tomatoes',
    'Cucumbers',
    'Peppers',
    'Palm Trees',
    'Wheat',
    'Corn',
    'Rice',
    'Potatoes',
    'Lettuce',
    'Carrots',
  ];

  const zones = [
    'North Zone',
    'South Zone',
    'East Zone',
    'West Zone',
    'Central Zone',
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Validate form
    if (!formData.name || !formData.size || !formData.cropType || !formData.zone) {
      alert('Please fill in all required fields');
      return;
    }
    
    // In a real app, this would save to backend/database
    console.log('Saving field:', formData);
    
    // Navigate back to fields list
    navigate('/app/fields');
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-background">
      <TopBar title={t.addField} showBack />
      
      <div className="flex-1 px-4 py-6 space-y-6 pb-24">
        {/* Header Card */}
        <Card className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <div className="flex items-start gap-3">
            <div className="bg-primary/20 p-3 rounded-xl">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Create New Field</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Add a new field to your farm for monitoring and management
              </p>
            </div>
          </div>
        </Card>

        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <div className="w-1 h-5 bg-primary rounded-full"></div>
            Basic Information
          </h3>

          <Card className="p-4 space-y-4">
            {/* Field Name */}
            <div className="space-y-2">
              <Label htmlFor="fieldName" className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                {t.fieldName} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="fieldName"
                placeholder="e.g., Field A - North Zone"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="bg-input-background"
              />
            </div>

            {/* Field Size */}
            <div className="space-y-2">
              <Label htmlFor="fieldSize" className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-primary" />
                {t.fieldSize} <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="fieldSize"
                  type="number"
                  step="0.1"
                  placeholder="0.0"
                  value={formData.size}
                  onChange={(e) => handleInputChange('size', e.target.value)}
                  className="bg-input-background pr-20"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  hectares
                </span>
              </div>
            </div>

            {/* Crop Type */}
            <div className="space-y-2">
              <Label htmlFor="cropType" className="flex items-center gap-2">
                <Sprout className="w-4 h-4 text-primary" />
                {t.cropType} <span className="text-destructive">*</span>
              </Label>
              <select
                id="cropType"
                value={formData.cropType}
                onChange={(e) => handleInputChange('cropType', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select crop type</option>
                {cropTypes.map((crop) => (
                  <option key={crop} value={crop}>
                    {crop}
                  </option>
                ))}
              </select>
            </div>

            {/* Zone */}
            <div className="space-y-2">
              <Label htmlFor="zone" className="flex items-center gap-2">
                <Map className="w-4 h-4 text-primary" />
                Zone/Location <span className="text-destructive">*</span>
              </Label>
              <select
                id="zone"
                value={formData.zone}
                onChange={(e) => handleInputChange('zone', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select zone</option>
                {zones.map((zone) => (
                  <option key={zone} value={zone}>
                    {zone}
                  </option>
                ))}
              </select>
            </div>

            {/* Planting Date */}
            <div className="space-y-2">
              <Label htmlFor="plantingDate" className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                {t.plantingDate}
              </Label>
              <Input
                id="plantingDate"
                type="date"
                value={formData.plantingDate}
                onChange={(e) => handleInputChange('plantingDate', e.target.value)}
                className="bg-input-background"
              />
            </div>
          </Card>
        </div>

        {/* IoT Sensor Configuration */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <div className="w-1 h-5 bg-accent rounded-full"></div>
            IoT Sensor Configuration
          </h3>

          <Card className="p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sensorId" className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-accent" />
                Sensor ID (Optional)
              </Label>
              <Input
                id="sensorId"
                placeholder="e.g., SENSOR-001"
                value={formData.sensorId}
                onChange={(e) => handleInputChange('sensorId', e.target.value)}
                className="bg-input-background"
              />
              <p className="text-xs text-muted-foreground">
                Enter the ID of your IoT sensor to enable real-time monitoring
              </p>
            </div>

            <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
              <div className="flex items-start gap-2">
                <Wifi className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <div className="text-xs text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">Sensor Setup Guide</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Make sure your sensor is powered on</li>
                    <li>Connect sensor to WiFi network</li>
                    <li>Find sensor ID on the device label</li>
                    <li>Enter the ID above to link to this field</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Map Preview Placeholder */}
        <Card className="p-4 space-y-3">
          <h3 className="font-semibold text-foreground">Field Location</h3>
          <div className="w-full h-40 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
            <div className="text-center">
              <Map className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Map view coming soon</p>
              <p className="text-xs text-muted-foreground">Pin your field location on the map</p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border m-[0px]">
          <div className="max-w-[430px] mx-auto flex gap-3">
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={() => navigate('/app/fields')}
            >
              <X className="w-4 h-4" />
              {t.cancel}
            </Button>
            <Button
              className="flex-1 gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              onClick={handleSave}
            >
              <Save className="w-4 h-4" />
              {t.save}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
