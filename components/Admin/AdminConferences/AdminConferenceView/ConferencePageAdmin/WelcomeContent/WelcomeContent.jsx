import React from 'react'
import RichTextEditor from '../LandingPage/RichTextEditor'

export default function WelcomeContent() {
  return (
    <div className='mt-5 '>
             <div className="mb-4">
        <label htmlFor="title" className="form-label">
        Title 
         </label>
        <input
          type="email"
          name="title"
          className={`form-control `}
          id="title"
          placeholder="Enter Title"
          required
          autoComplete="off"
        />
      </div>
      <RichTextEditor labelName={"Content"}/>
    </div>
  )
}
