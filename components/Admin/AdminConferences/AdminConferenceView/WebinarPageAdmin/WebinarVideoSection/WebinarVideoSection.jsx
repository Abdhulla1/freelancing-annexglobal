import React from 'react'
import FileUploadVideo from '@/components/Reusable/Admin/FileUpload/FileUploadVideo'
import RichTextEditor from '../../ConferencePageAdmin/LandingPage/RichTextEditor'

export default function WebinarVideoSection() {
  return (
    <div>
       <FileUploadVideo/>
       <div className="mb-4 mt-4">
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
