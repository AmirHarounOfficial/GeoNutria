import React from 'react';
import { useNavigate } from 'react-router';
import { Coins, TrendingDown, Calendar, Plus, Activity, Leaf, Microscope, MessageSquare } from 'lucide-react';
import TopBar from '../components/TopBar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useApp } from '../contexts/AppContext';
import { translations } from '../utils/translations';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const usageData = [
  { day: 'Mon', used: 12 },
  { day: 'Tue', used: 18 },
  { day: 'Wed', used: 15 },
  { day: 'Thu', used: 22 },
  { day: 'Fri', used: 19 },
  { day: 'Sat', used: 8 },
  { day: 'Sun', used: 6 },
];

const recentTransactions = [
  { type: 'deduction', action: 'Yield Prediction', amount: -5, time: '2 hours ago' },
  { type: 'deduction', action: 'Leaf Disease Scan', amount: -3, time: '5 hours ago' },
  { type: 'deduction', action: 'AI Chat (3 messages)', amount: -3, time: '1 day ago' },
  { type: 'addition', action: 'Monthly Reset', amount: +200, time: '3 days ago' },
  { type: 'deduction', action: 'Palm Counting', amount: -6, time: '4 days ago' },
];

export default function Credits() {
  const navigate = useNavigate();
  const { credits, language } = useApp();
  const t = translations[language];
  const remainingDays = 12;

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <TopBar title={language === 'ar' ? 'محفظة النقاط' : 'Credit Wallet'} showBack showCredits={false} />
      
      <div className="flex-1 px-4 py-6 space-y-6 pb-6">
        {/* Balance Card */}
        <Card className="p-6 bg-gradient-to-br from-primary to-primary/80 text-white">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-white/80 mb-1">{t.availableCredits}</p>
              <h2 className="text-4xl font-bold">{credits}</h2>
            </div>
            <div className="bg-white/20 p-3 rounded-xl">
              <Coins className="w-6 h-6" />
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-white/90">
            <Calendar className="w-4 h-4" />
            <span>{t.renewsIn} {remainingDays} {t.days}</span>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            size="lg" 
            className="gap-2"
            onClick={() => navigate('/app/buy-credits')}
          >
            <Plus className="w-5 h-5" />
            {t.buyCredits}
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="gap-2"
            onClick={() => navigate('/app/subscription')}
          >
            <TrendingDown className="w-5 h-5" />
            {language === 'ar' ? 'ترقية الخطة' : 'Upgrade Plan'}
          </Button>
        </div>

        {/* Usage Chart */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">{t.weeklyUsage}</h3>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={usageData} id="credits-usage-chart">
              <defs>
                <linearGradient id="colorUsed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0F4C5C" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0F4C5C" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Area 
                type="monotone" 
                dataKey="used" 
                stroke="#0F4C5C" 
                strokeWidth={2}
                fill="url(#colorUsed)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Cost Per Feature */}
        <div>
          <h3 className="font-semibold mb-3">{t.featureCosts}</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: Activity, label: 'IoT Diagnosis', labelAr: 'تشخيص IoT', cost: 2 },
              { icon: Leaf, label: 'Leaf Scan', labelAr: 'فحص الأوراق', cost: 3 },
              { icon: Microscope, label: 'Soil Scan', labelAr: 'فحص التربة', cost: 3 },
              { icon: MessageSquare, label: 'AI Chat', labelAr: 'محادثة AI', cost: 1 },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">
                      {language === 'ar' ? item.labelAr : item.label}
                    </span>
                  </div>
                  <p className="text-sm font-semibold">
                    {item.cost} {language === 'ar' ? 'نقاط' : 'credits'}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <h3 className="font-semibold mb-3">{t.recentTransactions}</h3>
          <div className="space-y-2">
            {recentTransactions.map((transaction, index) => (
              <Card key={index} className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{transaction.action}</p>
                    <p className="text-xs text-muted-foreground">{transaction.time}</p>
                  </div>
                  <span className={`text-sm font-semibold ${
                    transaction.type === 'addition' 
                      ? 'text-accent' 
                      : 'text-muted-foreground'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Warning */}
        {credits < 20 && (
          <Card className="p-4 bg-secondary/10 border-secondary/30">
            <div className="flex items-start gap-3">
              <Coins className="w-5 h-5 text-secondary flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-sm mb-1">{t.lowCreditBalance}</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {language === 'ar'
                    ? 'رصيد النقاط منخفض. فكر في ترقية خطتك أو شر��ء المزيد من النقاط.'
                    : "You're running low on credits. Consider upgrading your plan or buying more credits."}
                </p>
                <Button size="sm" onClick={() => navigate('/app/buy-credits')}>
                  {language === 'ar' ? 'اشترِ النقاط الآن' : 'Buy Credits Now'}
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}