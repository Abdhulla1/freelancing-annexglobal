import React from 'react'
import RegistrationFormHeader from './RegistrationFormHeader/RegistrationFormHeader'
import RegistrationForm from './RegistrationForm/RegistrationForm'
import RegistrationInfo from './RegistrationInfo/RegistrationInfo'

export default function Registration({conference}) {  
  return (
    <>
    <RegistrationFormHeader conference={conference} />
    <RegistrationInfo conference={conference} />
    </>
    
  
  )
}
