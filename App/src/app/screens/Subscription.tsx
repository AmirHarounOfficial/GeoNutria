import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Check, Star, Building2, Zap, CreditCard, X } from 'lucide-react';
import TopBar from '../components/TopBar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { useApp } from '../contexts/AppContext';
import { translations } from '../utils/translations';

const plans = [
  {
    id: 'free',
    name: 'Free',
    nameAr: 'مجاني',
    price: 0,
    period: 'month',
    credits: 20,
    icon: Zap,
    color: 'bg-muted',
    features: [
      'Limited features',
      'Basic support',
      'Lower priority AI',
      '1 farm only'
    ],
    featuresAr: [
      'ميزات محدودة',
      'دعم أساسي',
      'أولوية ذكاء اصطناعي منخفضة',
      'مزرعة واحدة فقط'
    ],
    current: false
  },
  {
    id: 'basic',
    name: 'Basic',
    nameAr: 'أساسي',
    price: 29,
    period: 'month',
    credits: 200,
    icon: Zap,
    color: 'bg-primary',
    features: [
      'All AI features',
      'Email support',
      'Standard priority',
      'Up to 3 farms',
      'Monthly reports'
    ],
    featuresAr: [
      'جميع ميزات الذكاء الاصطناعي',
      'دعم عبر البريد الإلكتروني',
      'أولوية قياسية',
      'حتى 3 مزارع',
      'تقارير شهرية'
    ],
    current: true,
    badge: 'Current Plan',
    badgeAr: 'الخطة الحالية'
  },
  {
    id: 'pro',
    name: 'Pro',
    nameAr: 'احترافي',
    price: 79,
    period: 'month',
    credits: 1000,
    icon: Star,
    color: 'bg-secondary',
    features: [
      'All Basic features',
      'Priority AI processing',
      '24/7 phone support',
      'Unlimited farms',
      'Weekly reports',
      'API access'
    ],
    featuresAr: [
      'جميع الميزات الأساسية',
      'معالجة ذكاء اصطناعي ذات أولوية',
      'دعم هاتفي 24/7',
      'مزارع غير محدودة',
      'تقارير أسبوعية',
      'وصول API'
    ],
    current: false,
    badge: 'Most Popular',
    badgeAr: 'الأكثر شعبية',
    recommended: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    nameAr: 'مؤسسات',
    price: 199,
    period: 'month',
    credits: 'Custom',
    creditsAr: 'مخصص',
    icon: Building2,
    color: 'bg-accent',
    features: [
      'All Pro features',
      'Dedicated support',
      'Custom AI models',
      'Team access',
      'On-site training',
      'SLA guarantee'
    ],
    featuresAr: [
      'جميع الميزات الاحترافية',
      'دعم مخصص',
      'نماذج ذكاء اصطناعي مخصصة',
      'وصول الفريق',
      'تدريب في الموقع',
      'ضمان SLA'
    ],
    current: false,
    badge: 'Best Value',
    badgeAr: 'أفضل قيمة'
  }
];

export default function Subscription() {
  const navigate = useNavigate();
  const { language, currentPlan, setCurrentPlan, addCredits } = useApp();
  const t = translations[language];
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleSelectPlan = (plan: typeof plans[0]) => {
    if (plan.id === currentPlan || plan.current) return;
    setSelectedPlan(plan);
    setShowConfirmDialog(true);
  };

  const handleConfirmUpgrade = () => {
    if (selectedPlan) {
      // Simulate payment and upgrade
      setCurrentPlan(selectedPlan.id as any);
      addCredits(typeof selectedPlan.credits === 'number' ? selectedPlan.credits : 500);
      setShowConfirmDialog(false);
      setSelectedPlan(null);
      
      // Show success message (you can add toast here)
      setTimeout(() => {
        navigate('/app/home');
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <TopBar title={t.subscriptionPlans} showBack />
      
      <div className="flex-1 px-4 py-6 space-y-6 pb-6">
        {/* Billing Toggle */}
        <Tabs value={billing} onValueChange={(v) => setBilling(v as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="monthly">
              {language === 'ar' ? 'شهري' : 'Monthly'}
            </TabsTrigger>
            <TabsTrigger value="yearly">
              {language === 'ar' ? 'سنوي' : 'Yearly'}
              <Badge variant="secondary" className="ml-2 text-xs">
                {language === 'ar' ? 'وفر 20٪' : 'Save 20%'}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Plans */}
        <div className="space-y-4">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const price = billing === 'yearly' && typeof plan.price === 'number' 
              ? Math.round(plan.price * 12 * 0.8) 
              : plan.price;
            
            return (
              <Card
                key={index}
                className={`p-5 ${
                  plan.recommended 
                    ? 'border-2 border-secondary shadow-lg' 
                    : plan.current
                    ? 'border-2 border-primary'
                    : ''
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`${plan.color} p-2.5 rounded-xl`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {language === 'ar' ? plan.nameAr : plan.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {typeof plan.credits === 'number' 
                          ? `${plan.credits} ${language === 'ar' ? 'نقطة/شهر' : 'credits/month'}`
                          : language === 'ar' ? plan.creditsAr : plan.credits}
                      </p>
                    </div>
                  </div>
                  {plan.badge && (
                    <Badge variant={plan.recommended ? 'default' : 'secondary'}>
                      {language === 'ar' ? plan.badgeAr : plan.badge}
                    </Badge>
                  )}
                </div>

                {/* Price */}
                <div className="mb-4">
                  {typeof price === 'number' ? (
                    <>
                      <span className="text-3xl font-bold">${price}</span>
                      <span className="text-muted-foreground">
                        /{billing === 'yearly' 
                          ? (language === 'ar' ? 'سنة' : 'year') 
                          : (language === 'ar' ? 'شهر' : 'month')}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold">
                      {language === 'ar' ? 'تسعير مخصص' : 'Custom Pricing'}
                    </span>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-5">
                  {(language === 'ar' ? plan.featuresAr : plan.features).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <Button
                  className="w-full"
                  variant={plan.current ? 'secondary' : 'default'}
                  disabled={plan.current}
                  onClick={() => handleSelectPlan(plan)}
                >
                  {plan.current 
                    ? t.currentlyActive
                    : plan.id === 'free' 
                    ? (language === 'ar' ? 'التخفيض' : 'Downgrade')
                    : t.upgrade}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Info */}
        <Card className="p-4 bg-muted/50">
          <p className="text-sm text-muted-foreground">
            {language === 'ar' 
              ? '💳 جميع الخطط تتضمن معالجة دفع آمنة ويمكن إلغاؤها في أي وقت. تُعاد ضبط النقاط شهرياً ولا تُرحّل.'
              : '💳 All plans include secure payment processing and can be cancelled anytime. Credits reset monthly and don\'t roll over.'}
          </p>
        </Card>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {language === 'ar' ? 'تأكيد الترقية' : 'Confirm Upgrade'}
            </DialogTitle>
            <DialogDescription>
              {language === 'ar' 
                ? `هل تريد الترقية إلى خطة ${selectedPlan?.nameAr}؟ سيتم تحديث رصيد النقاط الخاص بك فوراً.`
                : `Do you want to upgrade to the ${selectedPlan?.name} plan? Your credit balance will be updated immediately.`}
            </DialogDescription>
          </DialogHeader>
          
          {selectedPlan && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="text-sm font-medium">
                    {language === 'ar' ? 'الخطة المختارة' : 'Selected Plan'}
                  </p>
                  <p className="text-lg font-bold">
                    {language === 'ar' ? selectedPlan.nameAr : selectedPlan.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">
                    ${billing === 'yearly' && typeof selectedPlan.price === 'number'
                      ? Math.round(selectedPlan.price * 12 * 0.8)
                      : selectedPlan.price}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    /{billing === 'yearly' 
                      ? (language === 'ar' ? 'سنة' : 'year')
                      : (language === 'ar' ? 'شهر' : 'month')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-3 bg-accent/10 rounded-lg">
                <CreditCard className="w-5 h-5 text-accent" />
                <p className="text-sm">
                  {language === 'ar'
                    ? 'سيتم خصم المبلغ من طريقة الدفع المحفوظة'
                    : 'Amount will be charged to your saved payment method'}
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              {t.cancel}
            </Button>
            <Button onClick={handleConfirmUpgrade}>
              {t.confirm}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}