import React from 'react';
import { Outlet } from 'react-router';
import MobileContainer from '../components/MobileContainer';
import BottomNav from '../components/BottomNav';

export default function Root() {
  return (
    <MobileContainer>
      <div className="flex flex-col h-full pb-20">
        <Outlet />
      </div>
      <BottomNav />
    </MobileContainer>
  );
}
