import React from 'react';
import { Link, useLocation } from 'react-router';
import { Home, Activity, MapPin, MessageSquare, User } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { translations } from '../utils/translations';

export default function BottomNav() {
  const location = useLocation();
  const { language } = useApp();
  const t = translations[language];
  
  const navItems = [
    { path: '/app', icon: Home, label: t.home },
    { path: '/app/diagnostics', icon: Activity, label: t.diagnostics },
    { path: '/app/fields', icon: MapPin, label: t.fields },
    { path: '/app/ai-consultant', icon: MessageSquare, label: t.aiConsultant },
    { path: '/app/profile', icon: User, label: t.profile },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] pb-safe z-40">
      {/* Floating Navigation Container */}
      <div className="rounded-3xl bg-card/95 backdrop-blur-xl border border-border shadow-2xl overflow-hidden m-[0px]">
        {/* Gradient accent line */}
        
        <div className="flex items-center justify-around relative px-[8px] py-[12px]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
              (item.path !== '/app' && location.pathname.startsWith(item.path));
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative flex flex-col items-center gap-1.5 min-w-[60px] group"
              >
                {/* Active indicator background */}
                {isActive && (
                  <div className="absolute inset-0 -top-1 flex items-center justify-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-md"></div>
                  </div>
                )}
                
                {/* Icon container */}
                <div className={`relative z-10 p-2 rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-br from-primary to-accent shadow-lg scale-110' 
                    : 'group-hover:bg-muted/50 group-active:scale-95'
                }`}>
                  <Icon 
                    className={`w-5 h-5 transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-muted-foreground group-hover:text-foreground'
                    }`} 
                  />
                </div>
                
                {/* Label */}
                <span 
                  className={`text-xs transition-all duration-300 relative z-10 ${
                    isActive ? 'text-primary font-semibold' : 'text-muted-foreground group-hover:text-foreground'
                  }`}
                >
                  {item.label}
                </span>
                
                {/* Active dot indicator */}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full shadow-lg">
                    <div className="absolute inset-0 bg-primary rounded-full animate-ping"></div>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}