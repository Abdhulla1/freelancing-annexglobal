import React from "react";
import Style from "./PastConferenceReport.module.css";
import Link from "next/link";
export default function PastConferenceReport({conference}) {
    const tabsData=[
        {
            tabName:"PAST ATTENDEES",
           href:`/conference/${conference.id}/past-conferences/conference-attendees`
        },
        {
            tabName:"GALLERY",
            href:`/conference/${conference.id}/past-conferences/gallery`
        },
        {
            tabName:"TESTIMONIALS",
            href:`/conference/primary-healthcare/past-conferences/testimonials`
        },
        {
            tabName:"SCIENTIFIC PROGRAM",
            href:`/conference/${conference.id}/scientific-program`
        },
        {
            tabName:"WEBINAR PROGRAM",
            href:`/conference/${conference.id}/webinar-program`
        },
    ]

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-8">
          <h3 className="mb-5">Past Conference Report 2023</h3>
          <p>
            Annex Conferences successfully completed the International
            Conference on Gynecology and Obstetrics, which took place at the
            City Seasons Dubai Hotel from May 22-23, 2023. The conference was
            based on the theme "Fostering the efforts to enhance Gynecology and
            Obstetrics care" with the attendance of young and brilliant
            researchers, business delegates and talented student communities
            representing diverse countries around the world.
          </p>
          <p>
            Annex Conferences successfully completed the International
            Conference on Gynecology and Obstetrics, which took place at the
            City Seasons Dubai Hotel from May 22-23, 2023. The conference was
            based on the theme "Fostering the efforts to enhance Gynecology and
            Obstetrics care" with the attendance of young and brilliant
            researchers, business delegates and talented student communities
            representing diverse countries around the world.
          </p>
          <p>
            Annex Conferences successfully completed the International
            Conference on Gynecology and Obstetrics, which took place at the
            City Seasons Dubai Hotel from May 22-23, 2023. The conference was
            based on the theme "Fostering the efforts to enhance Gynecology and
            Obstetrics care" with the attendance of young and brilliant
            researchers, business delegates and talented student communities
            representing diverse countries around the world.
          </p>
        </div>

        <div className={`col-md-4 rounded p-5 ${Style["topics"]}`}>
          <div
            className={`row d-flex align-items-center justify-content-center ${Style["topics-wraper"]}`}
          >
            {tabsData.map((element, i) => (
              <div className="col-12  mt-4 d-flex" key={i}>
                <Link href={element.href} className={`text-decoration-none ${Style["card"]}`}>
                  <span className={`text-truncate col-9 ${Style["text"]}`}>
                    {element.tabName}
                  </span>
                  <div className={Style["icon"]}>
                    <i className="pi-reply pi"></i>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
