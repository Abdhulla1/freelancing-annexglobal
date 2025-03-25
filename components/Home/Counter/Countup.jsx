'use client'

import CountUp from 'react-countup';
import React from 'react'

const Countup = ({value}) => {
  return (
    <CountUp end={value} />
  )
}

export default Countup