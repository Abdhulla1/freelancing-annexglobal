import React from 'react'

export default function EventTimings() {
  return (
    <div className='mt-5 '>
      <div className="row">
       <div className="mb-4 col-6 ">
        <label htmlFor="title" className="form-label">
        Event Date 
         </label>
        <input
          type="email"
          name="eventDate"
          className={`form-control `}
          id="eventDate"
          placeholder="March 10-11, 2025"
          required
          autoComplete="off"
        />
      </div>
             <div className="col-6 mb-4">
        <label htmlFor="title" className="form-label">
        Event Time 
         </label>
        <input
          type="email"
          name="eventTime"
          className={`form-control `}
          id="eventTime"
          placeholder="09:00 AM - 06:00 PM"
          required
          autoComplete="off"
        />
      </div>
      </div>
      
   <div className="mb-4">
        <label htmlFor="title" className="form-label">
        Hotel Address
         </label>
        <input
          type="email"
          name="hotelAddress"
          className={`form-control `}
          id="hotelAddress"
          placeholder="City Seasons hotel, Deira 2 27th st-port saeed - Dubai - UAE "
          required
          autoComplete="off"
        />
      </div>
    </div>
  )
}
