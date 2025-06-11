
import React from 'react'
import ResetPassword from '@/components/Admin/ResetPassword/ResetPassword'

export default async function page({ params }) {
  const { slug } = await params;

  
  return (
    <ResetPassword securityKey={slug}/>
  )
}
