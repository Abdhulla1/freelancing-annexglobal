import DashboardWrapper from '@/components/Admin/DashboardWrapper/DashboardWrapper';
import DashboardNavbar from '@/components/Static/DashboardLayout/DashboardNavbar';
import SideMenu from '@/components/Static/DashboardLayout/SideMenu';
import React from 'react';
import { cookies } from 'next/headers';

export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies(); // ✅ await is required here
  const userData = cookieStore.get('userContext');
  const parsed = userData ? JSON.parse(userData.value) : null;


  return (
    <>
      <DashboardWrapper userData={parsed}>
        {children}
      </DashboardWrapper>
    </>
  );
}
