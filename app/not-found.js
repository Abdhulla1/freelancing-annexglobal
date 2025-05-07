import Image from 'next/image'
import React from 'react'
import Link from 'next/link';
export default function NotFound() {
  return (
    <div className='container vh-100 p-3 d-flex justify-content-center align-items-center '>
        <div className='row justify-content-center '>
        <Image src={'/icons/notFound.svg'} height={450} width={450} alt='Not Found Cat'/>
        <Link className='btn btn-warning text-white text-center col-4' href={'/'}>Go Back To Home</Link>
        </div>
  
    </div>
  )
}
