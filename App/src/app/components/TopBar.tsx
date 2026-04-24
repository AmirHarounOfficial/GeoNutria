import React from 'react';
import { ArrowLeft, Bell, Coins, Sparkles, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useApp } from '../contexts/AppContext';
import { Badge } from './ui/badge';
import { translations } from '../utils/translations';

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  showCredits?: boolean;
  showNotifications?: boolean;
}

export default function TopBar({ 
  title, 
  showBack = false, 
  showCredits = true, 
  showNotifications = true 
}: TopBarProps) {
  const navigate = useNavigate();
  const { credits, language } = useApp();
  const t = translations[language];

  return (
    <div className="sticky top-0 z-40 backdrop-blur-xl bg-gradient-to-r from-primary/95 via-primary/90 to-accent/95 border-b border-white/20 shadow-lg">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-3">
            {showBack ? (
              <button
                onClick={() => navigate(-1)}
                className="group p-2 -ml-2 hover:bg-white/20 rounded-full transition-all duration-300 active:scale-95"
              >
                <ArrowLeft className="w-5 h-5 text-white group-hover:translate-x-[-2px] transition-transform" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Leaf className="w-6 h-6 text-secondary animate-pulse" />
                  <div className="absolute inset-0 blur-md bg-secondary/50 rounded-full"></div>
                </div>
                <span className="text-lg font-semibold text-white tracking-tight">
                  GeoNutria
                </span>
              </div>
            )}
            {title && showBack && (
              <h1 className="text-lg font-medium text-white drop-shadow-sm">{title}</h1>
            )}
          </div>
          
          {/* Right Section */}
          <div className="flex items-center gap-2">
            {showCredits && (
              <button
                onClick={() => navigate('/app/credits')}
                className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-secondary/90 to-secondary rounded-full hover:from-secondary hover:to-secondary/80 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 border border-white/30"
              >
                <div className="relative">
                  <Coins className="w-4 h-4 text-white group-hover:rotate-12 transition-transform duration-300" />
                  <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                </div>
                <span className="text-sm font-bold text-white">{credits}</span>
              </button>
            )}
            
            {showNotifications && (
              <button
                onClick={() => navigate('/app/notifications')}
                className="group relative p-2.5 hover:bg-white/20 rounded-full transition-all duration-300 active:scale-95"
              >
                <Bell className="w-5 h-5 text-white group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                <Badge className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center p-0 bg-destructive text-white text-xs border-2 border-primary shadow-lg animate-pulse">
                  3
                </Badge>
                {/* Notification pulse ring */}
                <div className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-destructive rounded-full animate-ping opacity-75"></div>
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Decorative gradient line */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </div>
  );
}