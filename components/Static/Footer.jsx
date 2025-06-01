"use client";
import React from "react";
import footerStyle from "./Footer.module.css";
import { useState, useRef, useEffect, useMemo } from "react";
import { useWeather } from '@/hooks/useWeather';
import { useSocialLinks } from "@/hooks/useWeather";

import Link from "next/link";
const Footer = () => {
  const { mutate: mutateSocialLinks, data: socialLinksData } = useSocialLinks();

    const { mutate, data, isPending, isError } = useWeather();

      useEffect(() => {
    mutate();
  }, [mutate]);

    const facebook = socialLinksData?.detail?.find(
    (item) => item.name.toLowerCase() === "facebook"
  );
  const instagram = socialLinksData?.detail?.find(
    (item) => item.name.toLowerCase() === "instagram"
  );
  const linkedin = socialLinksData?.detail?.find(
    (item) => item.name.toLowerCase() === "linkedin"
  );
  const twitter = socialLinksData?.detail?.find(
    (item) => item.name.toLowerCase() === "twitter"
  );
  const youtube = socialLinksData?.detail?.find(
    (item) => item.name.toLowerCase() === "youtube"
  );
  const whatsapp = socialLinksData?.detail?.find(
    (item) => item.name.toLowerCase() === "whatsapp"
  );

  return (
    <footer className={footerStyle["footer"]}>
      <div className="container">
        <div className={footerStyle["footer-logo"]}>
          <img src="/icons/annex_logo.png" alt="Logo" />
          <small className="ms-3 text-white">
            {" "}
            {data?.detail?.location} • {data?.detail?.dates}
          </small>
        </div>
        <div className="mt-4 col">
          <small className="ms-3 text-white ">
            {" "}
            # Annex Global conference{" "}
          </small>
          <div className="d-inline-flex justify-content-center gap-3">
            {/*Facebook*/}
           {facebook?.status && (
           <Link
              href={facebook?.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 23 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 2H14C12.6739 2 11.4021 2.52678 10.4645 3.46447C9.52678 4.40215 9 5.67392 9 7V10H6V14H9V22H13V14H16L17 10H13V7C13 6.73478 13.1054 6.48043 13.2929 6.29289C13.4804 6.10536 13.7348 6 14 6H17V2Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
           )} 
            {/*Instagram*/}
           {instagram?.status && (
            <Link
              href={instagram?.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 2H7.5C4.73858 2 2.5 4.23858 2.5 7V17C2.5 19.7614 4.73858 22 7.5 22H17.5C20.2614 22 22.5 19.7614 22.5 17V7C22.5 4.23858 20.2614 2 17.5 2Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.5036 11.3664C16.627 12.1986 16.4849 13.0486 16.0974 13.7954C15.7099 14.5422 15.0968 15.1478 14.3452 15.5261C13.5937 15.9043 12.7421 16.036 11.9114 15.9023C11.0807 15.7687 10.3134 15.3765 9.71845 14.7816C9.12353 14.1866 8.73135 13.4193 8.59768 12.5886C8.46402 11.7579 8.59568 10.9063 8.97394 10.1548C9.3522 9.40325 9.9578 8.79014 10.7046 8.40264C11.4514 8.01514 12.3014 7.87298 13.1336 7.9964C13.9825 8.12228 14.7685 8.51786 15.3753 9.1247C15.9822 9.73154 16.3777 10.5175 16.5036 11.3664Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 6.5H18.01"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
           )}
            {/*Linkedin*/}
           {linkedin?.status && (
            <Link
              href={linkedin?.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.5 8C18.0913 8 19.6174 8.63214 20.7426 9.75736C21.8679 10.8826 22.5 12.4087 22.5 14V21H18.5V14C18.5 13.4696 18.2893 12.9609 17.9142 12.5858C17.5391 12.2107 17.0304 12 16.5 12C15.9696 12 15.4609 12.2107 15.0858 12.5858C14.7107 12.9609 14.5 13.4696 14.5 14V21H10.5V14C10.5 12.4087 11.1321 10.8826 12.2574 9.75736C13.3826 8.63214 14.9087 8 16.5 8Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.5 9H2.5V21H6.5V9Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.5 6C5.60457 6 6.5 5.10457 6.5 4C6.5 2.89543 5.60457 2 4.5 2C3.39543 2 2.5 2.89543 2.5 4C2.5 5.10457 3.39543 6 4.5 6Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
             
           )}
            {/*Whatsapp*/}
            {whatsapp?.status && (
            <Link
              href={whatsapp?.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_4429_3934)">
                  <path
                    d="M21.02 3.44943C13.331 -3.98357 0.606 1.40743 0.601 11.8934C0.601 13.9894 1.15 16.0334 2.196 17.8384L0.5 24.0004L6.835 22.3484C14.74 26.6184 24.496 20.9484 24.5 11.8994C24.5 8.72343 23.26 5.73443 21.005 3.48843L21.02 3.44943ZM22.502 11.8664C22.496 19.4994 14.117 24.2664 7.49 20.3704L7.13 20.1564L3.38 21.1314L4.385 17.4864L4.146 17.1114C0.0219998 10.5464 4.76 1.96643 12.572 1.96643C15.226 1.96643 17.717 3.00143 19.593 4.87643C21.468 6.73543 22.502 9.22643 22.502 11.8664Z"
                    fill="white"
                  />
                  <path
                    d="M18.0071 14.3062L17.9981 14.3812C15.7991 13.2852 15.5691 13.1392 15.2851 13.5652C15.0881 13.8602 14.5141 14.5292 14.3411 14.7272C14.1661 14.9222 13.9921 14.9372 13.6951 14.8022C13.3951 14.6522 12.4321 14.3372 11.2921 13.3172C10.4041 12.5222 9.80814 11.5472 9.63214 11.2472C9.33914 10.7412 9.95214 10.6692 10.5101 9.61319C10.6101 9.40319 10.5591 9.23819 10.4851 9.08919C10.4101 8.93919 9.81314 7.46919 9.56314 6.88319C9.32314 6.29919 9.07614 6.37319 8.89114 6.37319C8.31514 6.32319 7.89414 6.33119 7.52314 6.71719C5.90914 8.49119 6.31614 10.3212 7.69714 12.2672C10.4111 15.8192 11.8571 16.4732 14.5011 17.3812C15.2151 17.6082 15.8661 17.5762 16.3811 17.5022C16.9551 17.4112 18.1481 16.7812 18.3971 16.0762C18.6521 15.3712 18.6521 14.7862 18.5771 14.6512C18.5031 14.5162 18.3071 14.4412 18.0071 14.3062Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_4429_3934">
                    <rect
                      width="24"
                      height="24.0004"
                      fill="white"
                      transform="translate(0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </Link>
            )}
            {/*Twitter*/}
            {twitter?.status && (

            <Link
              href={twitter?.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.7833 10.5858L23.7178 0H21.6006L13.8427 9.1915L7.64656 0H0.5L9.86984 13.8992L0.5 25H2.61732L10.8098 15.2935L17.3534 25H24.5L14.7827 10.5858H14.7833ZM11.8833 14.0216L10.9339 12.6376L3.38022 1.62459H6.6323L12.7282 10.5124L13.6776 11.8965L21.6016 23.4493H18.3495L11.8833 14.0222V14.0216Z"
                  fill="white"
                />
              </svg>
            </Link>
            )}
            {/*Youtube*/}
            {youtube?.status && (

            <Link
              href={youtube?.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_4429_3919)">
                  <path
                    d="M23.0406 6.42C22.9218 5.94541 22.6799 5.51057 22.3392 5.15941C21.9986 4.80824 21.5713 4.55318 21.1006 4.42C19.3806 4 12.5006 4 12.5006 4C12.5006 4 5.62057 4 3.90057 4.46C3.42982 4.59318 3.00255 4.84824 2.66192 5.19941C2.32129 5.55057 2.07936 5.98541 1.96057 6.46C1.64579 8.20556 1.49181 9.97631 1.50057 11.75C1.48935 13.537 1.64334 15.3213 1.96057 17.08C2.09153 17.5398 2.33888 17.9581 2.67872 18.2945C3.01855 18.6308 3.43939 18.8738 3.90057 19C5.62057 19.46 12.5006 19.46 12.5006 19.46C12.5006 19.46 19.3806 19.46 21.1006 19C21.5713 18.8668 21.9986 18.6118 22.3392 18.2606C22.6799 17.9094 22.9218 17.4746 23.0406 17C23.3529 15.2676 23.5069 13.5103 23.5006 11.75C23.5118 9.96295 23.3578 8.1787 23.0406 6.42Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.25 14.6858L16 11.4894L10.25 8.29297V14.6858Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_4429_3919">
                    <rect
                      width="24"
                      height="23.46"
                      fill="white"
                      transform="translate(0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </Link>
            )}
            <Link
              href={"#"}
              className="text-decoration-none text-warning ms-3 text-center"
            >
              Back to top <i className="pi text-warning pi-angle-double-up"></i>
            </Link>{" "}
          </div>
        </div>
        <hr
          className="bg-white"
          style={{
            height: "2px",
            border: "none",
            color: "#FFFFFF4D",
            backdropFilter: "blur(4px)",
          }}
        />
        <div className={footerStyle["footer-links"]}>
          <div className="col-xl-8 col-md-12 mx-auto">
            <div className="d-flex justify-content-center flex-wrap text-white">
              <Link href={"/contact-us"}>Contact Us</Link> •
              <Link href={"/privacy-policy"}> Privacy Policy</Link> •
              <Link href={"/terms-and-conditions"}>Terms & Conditions</Link>
            </div>
          </div>
        </div>

        <div className={footerStyle["footer-bottom"]}>
          <p className="text-white opacity-75 text-center ">
            2 Frederick Street, Kings Cross, London, WC1X 0ND, United Kingdom
          </p>
          © {new Date().getFullYear()} AG Medical Conference. All Rights
          Reserved • Contact us at:{" "}
          <a
            href="mailto:gynecology@annexglobalconferences.com"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            gynecology@annexglobalconferences.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
