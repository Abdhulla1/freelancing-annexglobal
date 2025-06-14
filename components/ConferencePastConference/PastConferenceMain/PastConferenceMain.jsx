import React, { useState } from "react";
import Styles from "./PastConfernceMain.module.css";
import Link from "next/link";
import moment from "moment";
import { useConferenceLandingPage } from "@/hooks/useWeather";
export default function PastConferenceMain({ conference }) {
  const [selectedId, setSelectedId] = useState(conference._id);
  const { data: conferenceData } = useConferenceLandingPage();
  const conferenceDatesWithIds = (conferenceData?.detail || []).map((conf) => {
    const formattedDate = moment(conf?.conference?.landingPage?.startDate).format(
      "MMMM YYYY"
    );
    return {
      id: conf?._id,
      date: formattedDate,
    };
  });
console.log(conferenceData?.detail);
  const handleSelectChange = (e) => {
    const selectedDate = e.target.value;
    const selectedConference = conferenceDatesWithIds.find(
      (item) => item.date === selectedDate
    );
    if (selectedConference) {
      setSelectedId(selectedConference.id);
    }
  };


  return (
    <div className={` py-5 ${Styles["wrapper-container"]}`}>
      <div className="d-flex justify-content-center align-item-center p-5">
        <div className="row justify-content-center">
          <div className="d-flex gap-2 align-items-center mb-4">
            <div>
              <h2 className="ms-3 mb-4 text-start ">Past Conference</h2>
            </div>
            {/* <div className="mb-4 d-flex justify-content-start">
              <select
                className={`form-select w-auto ${Styles["dropdown"]}`}
                onChange={handleSelectChange}
              >
                <option>Select Conference</option>
                {conferenceDatesWithIds.map((item, index) => (
                  <option key={index} value={item.date}>
                    {item.date}
                  </option>
                ))}
              </select>
            </div> */}
          </div>
          {/*Past Conference Report */}
          <Link
            href={`/conference/${selectedId}/past-conferences/conference-report`}
            className={`col-12 col-md-4 col-lg-3 col-xxl-2 mt-2 mt-md-0 text-decoration-none text-black  pt-4 pb-2 px-3 text-center bg-white border-none rounded-lg  d-flex flex-column justify-content-between ${Styles["card"]}`}
            style={{ zIndex: "4" }}
          >
            <div
              className="p-3 rounded-circle d-flex justify-content-center align-items-center mb-5 shadow-sm mx-auto"
              style={{ height: "100px", width: "100px" }}
            >
              <svg
                width="50"
                height="50"
                viewBox="0 0 62 62"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_4482_1190)">
                  <path
                    d="M10.334 23.25C14.6142 23.25 18.084 19.7802 18.084 15.5C18.084 11.2198 14.6142 7.75 10.334 7.75C6.05378 7.75 2.58398 11.2198 2.58398 15.5C2.58398 19.7802 6.05378 23.25 10.334 23.25Z"
                    fill="#F4A300"
                  />
                  <path
                    d="M18.8325 28.5962C16.2324 30.2187 14.0879 32.4762 12.601 35.1562C11.1142 37.8362 10.3338 40.8505 10.3333 43.9154H5.16667C3.79764 43.9113 2.48585 43.3656 1.5178 42.3976C0.549745 41.4295 0.00408871 40.1177 0 38.7487L0 33.582C0.00613307 31.5285 0.824618 29.5608 2.2767 28.1087C3.72878 26.6566 5.69646 25.8382 7.75 25.832H12.9167C14.0445 25.8346 15.1581 26.0832 16.1799 26.5607C17.2017 27.0381 18.1069 27.7328 18.8325 28.5962Z"
                    fill="#F4A300"
                  />
                  <path
                    d="M51.666 23.25C55.9462 23.25 59.416 19.7802 59.416 15.5C59.416 11.2198 55.9462 7.75 51.666 7.75C47.3858 7.75 43.916 11.2198 43.916 15.5C43.916 19.7802 47.3858 23.25 51.666 23.25Z"
                    fill="#F4A300"
                  />
                  <path
                    d="M62.0005 33.582V38.7487C61.9964 40.1177 61.4507 41.4295 60.4827 42.3976C59.5146 43.3656 58.2028 43.9113 56.8338 43.9154H51.6671C51.6667 40.8505 50.8863 37.8362 49.3994 35.1562C47.9125 32.4762 45.7681 30.2187 43.168 28.5962C43.8935 27.7328 44.7988 27.0381 45.8206 26.5607C46.8423 26.0832 47.956 25.8346 49.0838 25.832H54.2505C56.304 25.8382 58.2717 26.6566 59.7238 28.1087C61.1759 29.5608 61.9943 31.5285 62.0005 33.582Z"
                    fill="#F4A300"
                  />
                  <path
                    d="M30.9993 28.4167C36.7063 28.4167 41.3327 23.7903 41.3327 18.0833C41.3327 12.3764 36.7063 7.75 30.9993 7.75C25.2924 7.75 20.666 12.3764 20.666 18.0833C20.666 23.7903 25.2924 28.4167 30.9993 28.4167Z"
                    fill="#F4A300"
                  />
                  <path
                    d="M46.5 43.9167V46.5C46.4939 48.5535 45.6754 50.5212 44.2233 51.9733C42.7712 53.4254 40.8035 54.2439 38.75 54.25H23.25C21.1965 54.2439 19.2288 53.4254 17.7767 51.9733C16.3246 50.5212 15.5061 48.5535 15.5 46.5V43.9167C15.5 40.491 16.8609 37.2055 19.2832 34.7832C21.7055 32.3609 24.991 31 28.4167 31H33.5833C37.009 31 40.2945 32.3609 42.7168 34.7832C45.1391 37.2055 46.5 40.491 46.5 43.9167Z"
                    fill="#F4A300"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_4482_1190">
                    <rect width="62" height="62" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div>
              <h5>Past Conference Report</h5>
              <p>Lessons of the past and planning the way forward</p>
            </div>
            <div
              className={`col-10 mx-auto mt-auto ${Styles["bottombar"]}`}
            ></div>
          </Link>
          {/* Past Attendees */}
          <Link
            href={`/conference/${selectedId}/past-conferences/conference-attendees`}
            className={`col-12 col-md-4 col-lg-3 col-xxl-2   mt-2 mt-md-0 pt-4 pb-2 px-3 text-decoration-none text-black text-center bg-white border-none rounded-lg  d-flex flex-column justify-content-between ${Styles["card"]}`}
            style={{ zIndex: "3" }}
          >
            <div
              className="p-3 rounded-circle d-flex justify-content-center align-items-center mb-5 shadow-sm mx-auto"
              style={{ height: "100px", width: "100px" }}
            >
              <svg
                width={50}
                height={50}
                viewBox="0 0 40 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.9984 0C13.1292 0 7.56055 5.56864 7.56055 12.4379C7.56055 19.3071 13.1292 24.8758 19.9984 24.8758C26.8676 24.8758 32.4363 19.3071 32.4363 12.4379C32.4363 5.56864 26.8676 0 19.9984 0Z"
                  fill="#F4A300"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.5373 27.3633C8.40106 27.3633 4.42337 29.2501 2.09231 32.0907C0.909222 33.5325 0.077526 35.3163 0.00511258 37.2934C-0.0688431 39.3126 0.659992 41.2833 2.16304 43.0029C5.82614 47.1933 11.6748 49.7515 20 49.7515C28.3252 49.7515 34.174 47.1933 37.8369 43.0029C39.3402 41.2833 40.0688 39.3126 39.9949 37.2934C39.9225 35.3163 39.0909 33.5325 37.9078 32.0907C35.5767 29.2501 31.5991 27.3633 27.4627 27.3633H12.5373Z"
                  fill="#F4A300"
                />
              </svg>
            </div>
            <div className="mb-3">
              <h5>Past Attendees</h5>
              <p>Want to connect with someone from the past conference</p>
            </div>
            <div
              className={`col-10 mx-auto mt-auto ${Styles["bottombar"]}`}
            ></div>
          </Link>
          {/* Gallery */}
          <Link
            href={`/conference/${selectedId}/past-conferences/gallery`}
            className={`col-12 col-md-4 col-lg-3 col-xxl-2  mt-2 mt-md-0  pt-4 pb-2 px-3 text-decoration-none text-black text-center bg-white border-none rounded-lg  d-flex flex-column justify-content-between ${Styles["card"]}`}
            style={{ zIndex: "2" }}
          >
            <div
              className="p-3 rounded-circle d-flex justify-content-center align-items-center mb-5 shadow-sm mx-auto"
              style={{ height: "100px", width: "100px" }}
            >
              <svg
                width={50}
                height={50}
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_4487_1301)">
                  <path
                    d="M13.0216 40.626C9.68614 40.626 6.71947 38.4906 5.64239 35.3115L5.56948 35.0719C5.31531 34.2302 5.20906 33.5219 5.20906 32.8135V18.6094L0.154893 35.4802C-0.495106 37.9615 0.986143 40.5344 3.47156 41.2198L35.6861 49.8469C36.0882 49.951 36.4903 50.001 36.8861 50.001C38.9611 50.001 40.857 48.624 41.3882 46.5948L43.2653 40.626H13.0216Z"
                    fill="#F4A300"
                  />
                  <path
                    d="M18.7506 18.7513C21.0486 18.7513 22.9173 16.8826 22.9173 14.5846C22.9173 12.2867 21.0486 10.418 18.7506 10.418C16.4527 10.418 14.584 12.2867 14.584 14.5846C14.584 16.8826 16.4527 18.7513 18.7506 18.7513Z"
                    fill="#F4A300"
                  />
                  <path
                    d="M44.7923 4.16797H13.5423C10.6715 4.16797 8.33398 6.50547 8.33398 9.3763V32.293C8.33398 35.1638 10.6715 37.5013 13.5423 37.5013H44.7923C47.6632 37.5013 50.0007 35.1638 50.0007 32.293V9.3763C50.0007 6.50547 47.6632 4.16797 44.7923 4.16797ZM13.5423 8.33463H44.7923C45.3673 8.33463 45.834 8.8013 45.834 9.3763V24.1659L39.2527 16.4867C38.5548 15.668 37.5444 15.2305 36.459 15.2055C35.3798 15.2117 34.3673 15.6909 33.6757 16.52L25.9382 25.8075L23.4173 23.293C21.9923 21.868 19.6736 21.868 18.2507 23.293L12.5007 29.0409V9.3763C12.5007 8.8013 12.9673 8.33463 13.5423 8.33463Z"
                    fill="#F4A300"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_4487_1301">
                    <rect width="50" height="50" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="mb-3">
              <h5>Gallery</h5>
              <p>Sharing special moments from our conference</p>
            </div>
            <div
              className={`col-10 mx-auto mt-auto ${Styles["bottombar"]}`}
            ></div>
          </Link>
          {/* Testimonials */}
          <Link
            href={`/conference/${selectedId}/past-conferences/testimonials`}
            className={`col-12 col-md-4 col-lg-3 col-xxl-2  mt-2 mt-md-0 pt-4 pb-2 px-3  text-decoration-none text-black text-center bg-white border-none rounded-lg  d-flex flex-column justify-content-between ${Styles["card"]}`}
            style={{ zIndex: "1" }}
          >
            <div
              className="p-3 rounded-circle d-flex justify-content-center align-items-center mb-5 shadow-sm mx-auto"
              style={{ height: "100px", width: "100px" }}
            >
              <svg
                width="50"
                height="50"
                viewBox="0 0 72 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M40.6164 31.2482L38.6364 27.2477C38.6308 27.2365 38.633 27.2241 38.6285 27.2129L37.2121 24.3385C36.9826 23.8739 36.5281 23.5938 35.9983 23.5938C35.4684 23.5938 35.0139 23.8739 34.7821 24.343L33.368 27.2129C33.3624 27.2241 33.3658 27.2365 33.3601 27.2477L31.3824 31.2437C30.8548 32.3001 29.8423 33.0359 28.6711 33.2159L21.0403 34.3296C20.5171 34.4027 20.1099 34.7425 19.9468 35.2364C19.7803 35.7392 19.9074 36.2635 20.2876 36.6381L25.8024 42.0089C26.6506 42.856 27.0286 44.0102 26.852 45.187L25.5504 52.7897C25.4604 53.3084 25.6606 53.8011 26.0859 54.1116C26.51 54.4221 27.0421 54.4626 27.5068 54.2196L34.3231 50.6365C34.844 50.3541 35.4189 50.2112 35.9949 50.2112C36.5765 50.2112 37.1593 50.3552 37.6903 50.6444L44.4943 54.2207C44.9566 54.4626 45.4876 54.421 45.9129 54.1116C46.3381 53.8022 46.5384 53.3084 46.4484 52.7931L45.1513 45.2106C44.9701 44.0114 45.3481 42.8571 46.1851 42.0201L51.7168 36.6336C52.0914 36.2635 52.2185 35.7404 52.052 35.2364C51.8889 34.7425 51.4816 34.4027 50.9641 34.3296L43.3366 33.217C42.1565 33.0347 41.144 32.299 40.6186 31.2471L40.6164 31.2482Z"
                  fill="#F4A300"
                />
                <path
                  d="M67.082 30.6621C67.6265 30.1401 67.5107 29.5337 67.4353 29.2975C67.2744 28.7878 66.8638 28.4368 66.3373 28.3558L58.7233 27.2455C57.5803 27.0992 56.5588 26.3736 56.0109 25.3071L52.6033 18.367C52.3727 17.9001 51.9182 17.6211 51.3883 17.6211C50.8584 17.6211 50.4039 17.9012 50.1722 18.3703L46.7522 25.2913C46.2403 26.3466 45.1963 27.0981 44.0342 27.2477L41.3477 27.6392L42.6324 30.2481C42.8338 30.6508 43.2118 30.9242 43.6697 30.9951L51.2837 32.1055C52.6427 32.2978 53.7575 33.2293 54.1884 34.5343C54.6227 35.8483 54.2784 37.2692 53.2907 38.2435L47.7714 43.6187C47.5295 43.8628 47.3867 44.1767 47.3597 44.5131C47.3507 44.6256 47.3552 44.7403 47.372 44.8551L47.5363 45.8158L49.7075 44.6672C50.2374 44.395 50.8145 44.2588 51.3917 44.2588C51.9643 44.2588 52.5358 44.3927 53.0555 44.6605L59.8832 48.2503C60.3478 48.4978 60.872 48.4641 61.2939 48.1603C61.7237 47.851 61.9262 47.3492 61.835 46.8193L60.5368 39.2391C60.3275 38.0736 60.7179 36.8732 61.5842 36.0373L67.0809 30.6632L67.082 30.6621Z"
                  fill="#F4A300"
                />
                <path
                  d="M25.244 25.2835L21.8274 18.3692C21.5956 17.9001 21.1411 17.6211 20.6112 17.6211C20.0814 17.6211 19.6269 17.9012 19.3951 18.3703L15.9976 25.2891C15.4396 26.3736 14.4181 27.0992 13.2549 27.2477L5.65325 28.3581C5.13463 28.4368 4.724 28.789 4.56313 29.2975C4.48888 29.5337 4.37188 30.1412 4.9085 30.6542L10.4165 36.0396C11.2783 36.871 11.6686 38.0713 11.4594 39.247L10.1623 46.8193C10.0723 47.3492 10.2748 47.851 10.7034 48.1603C11.1241 48.463 11.6484 48.499 12.1085 48.2537L18.9316 44.6661C19.9857 44.125 21.2334 44.125 22.2785 44.6616L24.461 45.817L24.6297 44.8337C24.6961 44.3938 24.5487 43.9416 24.2225 43.6153L18.7134 38.2491C17.72 37.2703 17.3769 35.8495 17.81 34.5355C18.2409 33.2305 19.3558 32.299 20.7204 32.1066L28.3377 30.9951C28.7866 30.9265 29.1646 30.6531 29.3682 30.2458L30.6507 27.6415L27.9451 27.2477C26.801 27.1003 25.7581 26.3477 25.2429 25.2868L25.244 25.2835Z"
                  fill="#F4A300"
                />
              </svg>
            </div>
            <div className="mb-3">
              <h5>Testimonials</h5>
              <p>
                Read what our conference attendees have to say about conference
              </p>
            </div>
            <div
              className={`col-10 mx-auto mt-auto ${Styles["bottombar"]}`}
            ></div>
          </Link>
          {/* Scientific Program */}
          <Link
            href={`/conference/${selectedId}/scientific-program`}
            className={`text-decoration-none text-black col-12 col-md-4 col-lg-3 col-xxl-2  mt-2 mt-md-0 pt-4 pb-2 px-3 text-center bg-white border-none rounded-lg  d-flex flex-column justify-content-between ${Styles["card"]}`}
          >
            <div
              className="p-3 rounded-circle d-flex justify-content-center align-items-center mb-5 shadow-sm mx-auto"
              style={{ height: "100px", width: "100px" }}
            >
              <svg
                width="40"
                height="45"
                viewBox="0 0 40 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M35.0511 0H12.8521C11.5909 0.00138503 10.3818 0.503005 9.48997 1.3948C8.59817 2.2866 8.09655 3.49574 8.09517 4.75693V33.3778C8.09655 34.639 8.59817 35.8481 9.48997 36.7399C10.3818 37.6317 11.5909 38.1333 12.8521 38.1347H35.0511C36.3123 38.1333 37.5214 37.6317 38.4132 36.7399C39.305 35.8481 39.8066 34.639 39.808 33.3778V4.75693C39.8066 3.49574 39.305 2.2866 38.4132 1.3948C37.5214 0.503005 36.3123 0.00138503 35.0511 0ZM31.8798 30.1272H16.0234C15.6028 30.1272 15.1995 29.9602 14.9022 29.6628C14.6048 29.3654 14.4377 28.9621 14.4377 28.5416C14.4377 28.121 14.6048 27.7177 14.9022 27.4204C15.1995 27.123 15.6028 26.9559 16.0234 26.9559H31.8798C32.3004 26.9559 32.7037 27.123 33.001 27.4204C33.2984 27.7177 33.4655 28.121 33.4655 28.5416C33.4655 28.9621 33.2984 29.3654 33.001 29.6628C32.7037 29.9602 32.3004 30.1272 31.8798 30.1272ZM31.8798 23.7847H16.0234C15.6028 23.7847 15.1995 23.6176 14.9022 23.3202C14.6048 23.0229 14.4377 22.6195 14.4377 22.199C14.4377 21.7785 14.6048 21.3752 14.9022 21.0778C15.1995 20.7804 15.6028 20.6134 16.0234 20.6134H31.8798C32.3004 20.6134 32.7037 20.7804 33.001 21.0778C33.2984 21.3752 33.4655 21.7785 33.4655 22.199C33.4655 22.6195 33.2984 23.0229 33.001 23.3202C32.7037 23.6176 32.3004 23.7847 31.8798 23.7847ZM31.8798 17.4421H16.0234C15.6028 17.4421 15.1995 17.275 14.9022 16.9777C14.6048 16.6803 14.4377 16.277 14.4377 15.8564C14.4377 15.4359 14.6048 15.0326 14.9022 14.7352C15.1995 14.4378 15.6028 14.2708 16.0234 14.2708H31.8798C32.3004 14.2708 32.7037 14.4378 33.001 14.7352C33.2984 15.0326 33.4655 15.4359 33.4655 15.8564C33.4655 16.277 33.2984 16.6803 33.001 16.9777C32.7037 17.275 32.3004 17.4421 31.8798 17.4421ZM31.8798 11.0995H16.0234C15.6028 11.0995 15.1995 10.9324 14.9022 10.6351C14.6048 10.3377 14.4377 9.9344 14.4377 9.51386C14.4377 9.09332 14.6048 8.69001 14.9022 8.39264C15.1995 8.09528 15.6028 7.92822 16.0234 7.92822H31.8798C32.3004 7.92822 32.7037 8.09528 33.001 8.39264C33.2984 8.69001 33.4655 9.09332 33.4655 9.51386C33.4655 9.9344 33.2984 10.3377 33.001 10.6351C32.7037 10.9324 32.3004 11.0995 31.8798 11.0995ZM31.8307 41.306C30.3811 41.74 10.3541 44.1001 9.07383 44.3581C7.82448 44.5123 6.56463 44.1686 5.56667 43.4013C4.56871 42.634 3.91283 41.5048 3.74083 40.2577L0.0315358 11.8776C-0.0469206 11.1906 0.0214182 10.4948 0.232029 9.83626C0.44264 9.17769 0.790721 8.57136 1.25323 8.0574C1.71574 7.54345 2.28214 7.13358 2.91493 6.85493C3.54772 6.57628 4.23248 6.43521 4.92388 6.44104V33.3778C4.92636 35.4797 5.76244 37.4949 7.24874 38.9812C8.73503 40.4674 10.7502 41.3035 12.8521 41.306H31.8307Z"
                  fill="#F4A300"
                />
              </svg>
            </div>
            <div className="mb-3">
              <h5>Scientific Program</h5>
              <p>
                A clear structure of the conference program will be available
                here
              </p>
            </div>
            <div
              className={`col-10 mx-auto mt-auto ${Styles["bottombar"]}`}
            ></div>
          </Link>
        </div>
      </div>
    </div>
  );
}
