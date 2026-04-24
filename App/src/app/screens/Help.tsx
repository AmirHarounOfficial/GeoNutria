import React from 'react';
import { MessageSquare, Book, Video, Mail, Phone, FileText, ExternalLink } from 'lucide-react';
import TopBar from '../components/TopBar';
import { Card } from '../components/ui/card';
import { useApp } from '../contexts/AppContext';
import { translations } from '../utils/translations';

export default function Help() {
  const { language } = useApp();
  const t = translations[language];

  const helpCategories = [
    {
      icon: Book,
      title: language === 'ar' ? 'مركز المعرفة' : 'Knowledge Base',
      description: language === 'ar' ? 'أدلة شاملة وأسئلة شائعة' : 'Comprehensive guides and FAQs',
      action: () => {}
    },
    {
      icon: Video,
      title: language === 'ar' ? 'دروس فيديو' : 'Video Tutorials',
      description: language === 'ar' ? 'تعلم كيفية استخدام GeoNutria' : 'Learn how to use GeoNutria',
      action: () => {}
    },
    {
      icon: MessageSquare,
      title: language === 'ar' ? 'دردشة مباشرة' : 'Live Chat',
      description: language === 'ar' ? 'تحدث مع فريق الدعم' : 'Chat with our support team',
      action: () => {}
    },
    {
      icon: Mail,
      title: language === 'ar' ? 'دعم البريد الإلكتروني' : 'Email Support',
      description: 'support@geonutria.com',
      action: () => window.open('mailto:support@geonutria.com')
    }
  ];

  const quickLinks = [
    { label: language === 'ar' ? 'البدء' : 'Getting Started', icon: Book },
    { label: language === 'ar' ? 'ميزات التشخيص' : 'Diagnostic Features', icon: FileText },
    { label: language === 'ar' ? 'إدارة الاشتراك' : 'Managing Subscription', icon: FileText },
    { label: language === 'ar' ? 'استكشاف الأخطاء' : 'Troubleshooting', icon: FileText }
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <TopBar title={t.helpSupport} showBack />
      
      <div className="flex-1 px-4 py-6 space-y-6 pb-6">
        {/* Header */}
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <h2 className="text-xl font-bold mb-2">
            {language === 'ar' ? 'كيف يمكننا مساعدتك؟' : 'How can we help you?'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {language === 'ar' 
              ? 'نحن هنا للمساعدة في أي أسئلة أو مشاكل قد تكون لديك'
              : "We're here to help with any questions or issues you might have"}
          </p>
        </Card>

        {/* Help Categories */}
        <div>
          <h3 className="font-semibold mb-3">
            {language === 'ar' ? 'تواصل معنا' : 'Get in Touch'}
          </h3>
          <div className="space-y-3">
            {helpCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card
                  key={index}
                  className="p-4 cursor-pointer hover:shadow-md transition-all active:scale-98"
                  onClick={category.action}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-xl">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{category.title}</h4>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Contact Information */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">
            {language === 'ar' ? 'معلومات الاتصال' : 'Contact Information'}
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">
                  {language === 'ar' ? 'الهاتف' : 'Phone'}
                </p>
                <p className="text-sm text-muted-foreground">+966 11 234 5678</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </p>
                <p className="text-sm text-muted-foreground">support@geonutria.com</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">
            {language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Card key={index} className="p-3">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Icon className="w-5 h-5 text-primary" />
                    <p className="text-xs font-medium">{link.label}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* App Version */}
        <Card className="p-4 bg-muted/30">
          <p className="text-center text-sm text-muted-foreground">
            GeoNutria v1.0.0
          </p>
        </Card>
      </div>
    </div>
  );
}