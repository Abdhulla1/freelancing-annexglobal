import DashboardWrapper from '@/components/Admin/DashboardWrapper/DashboardWrapper'
import DashboardNavbar from '@/components/Static/DashboardLayout/DashboardNavbar'
import SideMenu from '@/components/Static/DashboardLayout/SideMenu'
import React from 'react'

export default function DashboardLayout({children}) {
  return (
    <>
    <DashboardWrapper>    {children}</DashboardWrapper>

    </>
  )
}
