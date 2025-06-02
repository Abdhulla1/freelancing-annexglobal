import React from 'react'
import NewsLetter from '@/components/Admin/NewsLetter/NewsLetter'
import { cookies } from 'next/headers';

export default async function page() {
      const cookieStore = await cookies(); // ✅ await is required here
      const userData = cookieStore.get('userContext');
      const parsed = userData ? JSON.parse(userData.value) : null;
  return (
    <NewsLetter userData={parsed}/>
  )
}
