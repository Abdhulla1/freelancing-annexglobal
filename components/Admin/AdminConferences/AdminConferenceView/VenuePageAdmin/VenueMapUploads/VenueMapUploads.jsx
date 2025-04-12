import FileUpload from '@/components/Reusable/Admin/FileUpload/FileUpload'
import React from 'react'

export default function VenueMapUploads() {
  return (
    <div className='mt-1'>
        <FileUpload title='Upload Google Maps Screenshot (Image Upload)'/>
        <div className="mt-4">
        <label htmlFor="title" className="form-label">
        Google Maps Embed Link 
         </label>
         <div className='input-group border rounded p-1'>
         <span className="btn rounded-2 text-white me-1" id="basic-addon1" style={{backgroundColor:"#111880"}}><i className='bx bx-link-alt'></i></span>
         <input
          type="link"
          name="mapLink"
          className={`form-control border border-0`}
          id="link"
          placeholder="Enter Map Link"
          required
          autoComplete="off"
        />
         </div>
        
      </div>
    </div>
  )
}
