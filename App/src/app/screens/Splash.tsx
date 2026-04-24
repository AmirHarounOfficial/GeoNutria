import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Sprout } from 'lucide-react';
import MobileContainer from '../components/MobileContainer';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <MobileContainer>
      <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-primary to-primary/80 text-white">
        <div className="flex flex-col items-center gap-6 animate-fade-in">
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full"></div>
            <div className="relative bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20">
              <Sprout className="w-20 h-20" strokeWidth={1.5} />
            </div>
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">GeoNutria</h1>
            <p className="text-white/80 text-lg">AI-Powered Farming Intelligence</p>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
}
