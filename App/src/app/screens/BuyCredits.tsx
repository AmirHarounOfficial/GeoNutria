import React, { useState } from 'react';
import { Coins, Check, CreditCard } from 'lucide-react';
import TopBar from '../components/TopBar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useApp } from '../contexts/AppContext';
import { useNavigate } from 'react-router';

const creditPackages = [
  {
    credits: 50,
    price: 9.99,
    bonus: 0,
    popular: false
  },
  {
    credits: 200,
    price: 29.99,
    bonus: 20,
    popular: true
  },
  {
    credits: 500,
    price: 69.99,
    bonus: 100,
    popular: false
  },
  {
    credits: 1000,
    price: 119.99,
    bonus: 300,
    popular: false
  }
];

export default function BuyCredits() {
  const navigate = useNavigate();
  const { addCredits } = useApp();
  const [selectedPackage, setSelectedPackage] = useState(1);
  const [purchasing, setPurchasing] = useState(false);

  const handlePurchase = () => {
    setPurchasing(true);
    setTimeout(() => {
      const pkg = creditPackages[selectedPackage];
      addCredits(pkg.credits + pkg.bonus);
      setPurchasing(false);
      navigate('/app/credits');
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <TopBar title="Buy Credits" showBack />
      
      <div className="flex-1 px-4 py-6 space-y-6 pb-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="bg-primary/10 p-4 rounded-2xl">
              <Coins className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h2 className="text-xl font-semibold">Choose Your Credit Package</h2>
          <p className="text-sm text-muted-foreground">
            One-time purchase, credits never expire
          </p>
        </div>

        {/* Packages */}
        <div className="space-y-3">
          {creditPackages.map((pkg, index) => (
            <Card
              key={index}
              className={`p-4 cursor-pointer transition-all ${
                selectedPackage === index 
                  ? 'border-2 border-primary shadow-lg' 
                  : 'border-2 border-transparent'
              } ${pkg.popular ? 'bg-primary/5' : ''}`}
              onClick={() => setSelectedPackage(index)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedPackage === index 
                      ? 'border-primary bg-primary' 
                      : 'border-muted-foreground'
                  }`}>
                    {selectedPackage === index && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">
                        {pkg.credits.toLocaleString()} Credits
                      </h3>
                      {pkg.popular && (
                        <Badge variant="default" className="text-xs">Most Popular</Badge>
                      )}
                    </div>
                    {pkg.bonus > 0 && (
                      <p className="text-sm text-accent">
                        + {pkg.bonus} bonus credits
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-xl font-bold">${pkg.price}</p>
                  <p className="text-xs text-muted-foreground">
                    ${(pkg.price / (pkg.credits + pkg.bonus)).toFixed(3)}/credit
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Selected Package Summary */}
        <Card className="p-4 bg-accent/5 border-accent/30">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Base Credits</span>
              <span className="font-medium">{creditPackages[selectedPackage].credits}</span>
            </div>
            {creditPackages[selectedPackage].bonus > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Bonus Credits</span>
                <span className="font-medium text-accent">+{creditPackages[selectedPackage].bonus}</span>
              </div>
            )}
            <div className="pt-3 border-t border-border flex items-center justify-between">
              <span className="font-semibold">Total Credits</span>
              <span className="text-xl font-bold text-primary">
                {creditPackages[selectedPackage].credits + creditPackages[selectedPackage].bonus}
              </span>
            </div>
          </div>
        </Card>

        {/* Payment Button */}
        <Button 
          size="lg" 
          className="w-full gap-2"
          onClick={handlePurchase}
          disabled={purchasing}
        >
          <CreditCard className="w-5 h-5" />
          {purchasing 
            ? 'Processing Payment...' 
            : `Pay $${creditPackages[selectedPackage].price}`}
        </Button>

        {/* Info */}
        <Card className="p-4 bg-muted/50">
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="flex items-start gap-2">
              <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <span>Credits are added instantly to your account</span>
            </p>
            <p className="flex items-start gap-2">
              <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <span>One-time purchase, no recurring charges</span>
            </p>
            <p className="flex items-start gap-2">
              <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <span>Credits never expire and can be used anytime</span>
            </p>
            <p className="flex items-start gap-2">
              <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <span>Secure payment processing</span>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
