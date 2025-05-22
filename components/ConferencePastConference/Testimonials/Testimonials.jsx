"use client";
import React, { useState } from "react";
import { Paginator } from "primereact/paginator";
import "./PaginatorStyles.css";
import Image from "next/image";

const dummyTestimonials = Array.from({length:20},(_,i)=>  ({
    id: 1,
    publishedDate: "May 2023",
    content:
      "The Annex Global Conference Fosters Innovation And Collaboration Across Diverse Industries Worldwide. By Bringing Together Thought Leaders And Experts, We Address Global Challenges, Exchange Insights, And Drive Sustainable Progress. Our Platform Enables Knowledge Sharing, Inspiring New",
    name: "Madara S B Ralapanawe",
    university: "University Of Birmingham, UK",
    image: "/images/conferences/speakerCardImage.png",
  }))

const Testimonials = () => {
  const testimonialsPerPage = 9;
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(testimonialsPerPage);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <div className="container py-5" style={{  minHeight: '100vh'}}>
      <h3 className="text-white">Testimonials</h3>
      <div className="row mt-4">
        {dummyTestimonials.slice(first, first + rows).map((item, i) => (
          <div className="col-md-6 col-lg-4 mt-4 d-flex" key={i} >
            <div className="rounded p-2 w-100">
    <p className="text-black text-center  mb-2" style={{ fontSize: "0.9rem" }}>
                Published On: {item.publishedDate}
              </p>
              <div className="rounded shadow-sm p-4 border" style={{background:'#EEF2FE'}}>
              <p className="text-dark" style={{ fontSize: "0.95rem" }}>
                {item.content}
              </p>
              <hr />
              <div className="d-flex align-items-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={50}
                  height={50}
                  className="rounded-circle me-3"
                />
                <div>
                  <h6 className="mb-0">{item.name}</h6>
                  <small className="text-muted">{item.university}</small>
                </div>
              </div>
              </div>
          
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 d-flex justify-content-center">
        <Paginator
          first={first}
          rows={rows}
          template="PrevPageLink PageLinks NextPageLink"
          totalRecords={dummyTestimonials.length}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default Testimonials;
