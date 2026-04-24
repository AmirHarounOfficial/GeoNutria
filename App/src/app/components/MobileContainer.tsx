import React, { ReactNode } from 'react';

interface MobileContainerProps {
  children: ReactNode;
  className?: string;
}

export default function MobileContainer({ children, className = '' }: MobileContainerProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-[0px]">
      <div className={`w-full max-w-[430px] min-h-[calc(100vh-2rem)] bg-background shadow-2xl overflow-hidden ${className} m-[0px]`}>
        {children}
      </div>
    </div>
  );
}
