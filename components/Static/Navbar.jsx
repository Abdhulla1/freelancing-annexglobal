"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NavbarStyles from "./Navbar.module.css";
import useSessionStorageState from "use-local-storage-state"; // Using session storage hook
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [activeItem, setActiveItem] = useSessionStorageState("activeNavItem", {
    initialValue: "HOME",
  });

  const menuRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleResize() {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 100) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const homePageItems = [
    { label: "HOME", url: "/" },
    {
      label: "CONFERENCE",
      url: "",
      items: [
        { label: "UPCOMING EVENTS", url: "/upcoming-conference" },
        { label: "PAST EVENTS", url: "/past-conference" },
      ],
    },
    { label: "GALLERY", url: "/gallery" },
    { label: "CONTACT US", url: "/contact-us" },
    {
      label: "MORE",
      url: "",
      items: [
        { label: "PRIVACY POLICY", url: "/privacy-policy" },
        {
          label: "TERMS & CONDITIONS",
          url: "/terms-and-conditions",
        },
      ],
    },
  ];

  const idMatch = pathname.match(/^\/conference\/([^/]+)/);
  const conferenceId = idMatch ? idMatch[1] : null;

  const conferenceMenuItems = [
    { label: "HOME", url: conferenceId ? `/conference/${conferenceId}` : "/" },
    {
      label: "WEBINAR",
      items: [
        {
          label: "ABOUT WEBINAR",
          url: conferenceId ? `/conference/${conferenceId}/webinar` : "#",
        },
         {
          label: "WEBINAR PROGRAM",
          url: conferenceId
            ? `/conference/${conferenceId}/webinar-program`
            : "#",
        },
         {
          label: "SUBMIT ABSTRACT",
          url: conferenceId
            ? `/conference/${conferenceId}/submit-abstract`
            : "#",
        },
        {
      label: "REGISTRATION",
      url: conferenceId ? `/conference/${conferenceId}/registration` : "#",
    },
        {
          label: "WEBINAR SPEAKERS",
          url: conferenceId ? `/conference/${conferenceId}/speakers` : "#",
        },
       
      
       
      ],
    },
    {
      label: "TOPICS",
      url: conferenceId ? `/conference/${conferenceId}/topics` : "#",
    },
    {
      label: "ATTENDEES",
      items: [
        {
          label: "OCM",
          url: conferenceId
            ? `/conference/${conferenceId}/organizing-committee-members`
            : "#",
        },
        {
          label: "SPEAKERS",
          url: conferenceId ? `/conference/${conferenceId}/speakers` : "#",
        },
      ],
    },
 {
          label: "SUBMIT ABSTRACT",
          url: conferenceId
            ? `/conference/${conferenceId}/submit-abstract`
            : "#",
        },
    {
      label: "REGISTRATION",
      url: conferenceId ? `/conference/${conferenceId}/registration` : "#",
    },
    {
      label: "MORE",
      items: [
      
        {
          label: "VENUE",
          url: conferenceId ? `/conference/${conferenceId}/venue` : "#",
        },
           {
          label: "SCIENTIFIC PROGRAM",
          url: conferenceId
            ? `/conference/${conferenceId}/scientific-program`
            : "#",
        },
         {
          label: "SPONSORS EXHIBITORS",
          url: conferenceId
            ? `/conference/${conferenceId}/sponsors-exhibitors`
            : "#",
        },
        { label: "CONTACT US", url: "/contact-us" },
      ],
    },
  ];

  const Menuitems = useMemo(() => {
    return pathname.startsWith("/conference/")
      ? conferenceMenuItems
      : homePageItems;
  }, [pathname]);

  // Set the active item based on the current pathname
  useEffect(() => {
    const findMatchedLabel = (items) => {
      for (const item of items) {
        if (item.url && pathname === item.url) {
          return item.label;
        }
        if (item.items) {
          for (const subItem of item.items) {
            if (
              subItem.url &&
              (pathname === subItem.url ||
                pathname.startsWith(subItem.url + "/"))
            ) {
              return item.label;
            }
          }
        }
      }
      return null;
    };

    const matchedLabel = findMatchedLabel(Menuitems);
    if (matchedLabel) {
      setActiveItem(matchedLabel);
    }
  }, [pathname, Menuitems, setActiveItem]);

  return (
    <div className={`${isFixed ? "fixed-top animate__fadeInDown" : ""}`}>
      <div
        className={` d-none d-md-flex  justify-content-center p-2 align-items-center w-100 ${NavbarStyles.announcementBar}`}
      >
        <span>
          Join more than 7,000 + Marketers in Budapest 4-5 September 2025{" "}
        </span>
        <span className="ps-2 pe-2 p-1 ms-2 rounded">
          Attend Annex Global conference world
        </span>
      </div>
      <nav
        className={`${NavbarStyles.navbar} navbar navbar-expand-xxl navbar-light bg-white shadow animate__animated p-0 `}
      >
        <div className="container-fluid d-flex justify-content-around align-items-center w-100">
          <div className={`d-flex align-items-center ${NavbarStyles.logo}`}>
            <Link href={"/"} className="text-decoration-none">
              <img src="/icons/annexWithText.png" alt="Logo" />
            </Link>
            <div className="mt-2">
              {/* Location/Weather*/}
              <p className={`d-none  d-xl-block ${NavbarStyles["sub-title"]}`}>
                Dubai, UAE &nbsp;•&nbsp;26-27 February 2025&nbsp;•&nbsp;
                <i className="bx bxs-sun text-warning" /> 36.1°C
              </p>
            </div>
          </div>

          <button
            className={`navbar-toggler border-0 ${NavbarStyles["navbar-noShadow"]} ms-auto`}
            type="button"
            onClick={() => setIsOpen(!isOpen)}style={{ outline: 'none', boxShadow: 'none' }}
          >
            <span className="navbar-toggler-icon"> </span>
          </button>

          <div
            ref={menuRef}
            className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          >
            <ul className={`navbar-nav ms-4 ${isOpen ? " gap-3 " : " gap-4 "}`}>
              {Menuitems.map((item, index) => {
                const isActive = activeItem === item.label;
                return (
                  <li
                    key={index}
                    className={`nav-item ${item.items ? "dropdown" : ""}`}
                  >
                    {item.items ? (
                      <>
                        <Link
                          href="#"
                          className={`${NavbarStyles["nav-link"]} dropdown-toggle `}
                          id={`dropdown${index}`}
                          role="button"
                        >
                          {item.label}
                        </Link>
                        <ul className="dropdown-menu">
                          {item.items.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                href={subItem.url}
                                className="dropdown-item"
                                onClick={() => setIsOpen(false)}
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <Link
                        href={item.url}
                        className={`${NavbarStyles["nav-link"]} ${
                          isActive ? NavbarStyles.active : ""
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="d-none d-xxl-flex gap-2">
            <button className={` ${NavbarStyles["sponsor"]}`}>
              <Link
                href={conferenceId ? `/conference/${conferenceId}/scientific-program` : "#"}
                className="text-center text-uppercase mb-0 text-decoration-none text-white fw-normal"
              >
                Program 
              </Link>
            </button>
            <button className={NavbarStyles["buy-ticket"]}>
              <Link
                href={"/conferences"}
                className="text-uppercase text-center mb-0 text-decoration-none  text-white fw-normal"
              >
                Get Brochure
              </Link>
            </button>
          </div>
        </div>
        {/* 
        {isOpen && (
          <>     <button className={NavbarStyles["sponsor"]}>
          <Link
            href={"/"}
            className="d-flex align-items-center mb-0 text-decoration-none h5 fw-normal"
          >
            SPONSOR
          </Link>
        </button>
        <button className={`w-100 text-center ${NavbarStyles["buy-ticket"]}`}>
            
            <Link
              href={"/#newsletter"}
              className="mb-0 text-decoration-none h6 fw-normal w-100"
            >
              Subscribe
            </Link>
          </button>
          </>
       
        )} */}
      </nav>
    </div>
  );
}
