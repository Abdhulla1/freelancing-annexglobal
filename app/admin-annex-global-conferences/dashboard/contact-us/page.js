import React from 'react'
import { cookies } from 'next/headers';

import ContactUs from '@/components/Admin/ContactUs/ContactUs'
export default async function page() {
   const cookieStore = await cookies(); // ✅ await is required here
        const userData = cookieStore.get('userContext');
        const parsed = userData ? JSON.parse(userData.value) : null;
  return (
    <ContactUs userData={parsed}/>
  )
}
