import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AppContextType {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
  credits: number;
  deductCredits: (amount: number) => void;
  addCredits: (amount: number) => void;
  userName: string;
  farmName: string;
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  currentPlan: 'basic' | 'pro' | 'enterprise';
  setCurrentPlan: (plan: 'basic' | 'pro' | 'enterprise') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [credits, setCredits] = useState(200);
  const [darkMode, setDarkMode] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<'basic' | 'pro' | 'enterprise'>('basic');
  const userName = "Ahmed Hassan";
  const farmName = "Green Valley Farm";

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const deductCredits = (amount: number) => {
    setCredits(prev => Math.max(0, prev - amount));
  };

  const addCredits = (amount: number) => {
    setCredits(prev => prev + amount);
  };

  return (
    <AppContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        credits, 
        deductCredits, 
        addCredits,
        userName,
        farmName,
        darkMode,
        setDarkMode,
        currentPlan,
        setCurrentPlan
      }}
    >
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className={language === 'ar' ? 'font-arabic' : ''}>
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};