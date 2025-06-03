import React from 'react'
import RegistrationFormHeader from './RegistrationFormHeader/RegistrationFormHeader'

export default function SpecialRegistration({conference}) {
  const specialRegistration = conference || {};
  return (
    <>
    <RegistrationFormHeader conference={specialRegistration}/>
    </>
    
  
  )
}
