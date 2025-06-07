import React from 'react'

export default function Ratings({rating}) {
    const stars=Array.from({length:rating},(_,i)=>(<img key={i} src='/icons/star.png' alt='star'  style={{ width: '20px', height: '18px', marginRight: '10px' }}/>))
  return (
    <div className="d-flex align-items-center px-2">
    {stars}
  </div>
  )
}
