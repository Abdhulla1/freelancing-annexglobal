"use client";

import { Sidebar } from "primereact/sidebar";
import { useWeather } from "@/hooks/useWeather";
import { useState, useRef, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useMainPage } from "@/hooks/useWeather";
import NavbarStyles from "./Navbar.module.css";
import useSessionStorageState from "use-local-storage-state"; // Using session storage hook
export default function Navbar() {
  const {
    data: Mdata,
    isPending: MisPending,
    isError: MisError,
  } = useMainPage();

  const { mutate, data, isPending, isError } = useWeather();
  const [isOpen, setIsOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);

  //   useEffect(() => {
  //   mutate();
  // }, [mutate]);

  const toggleExpand = (label) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  const [activeItem, setActiveItem] = useSessionStorageState("activeNavItem", {
    initialValue: "HOME",
  });

  const menuRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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
  useEffect(() => {
    if (conferenceId) {
      mutate({conferencId: conferenceId
      });
    }
  }, [conferenceId, mutate]);
  
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
      label: "ABSTRACT",
      url: conferenceId ? `/conference/${conferenceId}/submit-abstract` : "#",
    },
    {
      label: "REGISTER",
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
        {
          label: "FAQ",
          url: conferenceId ? `/conference/${conferenceId}/faq` : "#",
        },
      ],
    },
  ];

  // console.log(pathname.startsWith('/conference'), "pathname");

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
    <div className={`sticky-top`}>
      <div
        className={` d-none d-md-flex fw-bold justify-content-center p-2 align-items-center w-100 ${NavbarStyles.announcementBar}`}
      >
        <span>{Mdata?.detail?.landingPage?.heading} </span>
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
            {pathname.startsWith("/conference") && (
              <div className="mt-2">
                {/* Location/Weather*/}
                <p
                  className={`d-none  d-xxl-block ${NavbarStyles["sub-title"]}`}
                >
                  {data?.detail?.location} &nbsp;•&nbsp;{data?.detail?.dates}
                  &nbsp;•&nbsp;
                  <i className="bx bxs-sun text-warning" />{" "}
                  {data?.detail?.weather}
                </p>
              </div>
            )}
          </div>

          <button
            className={`navbar-toggler border-0 ${NavbarStyles["navbar-noShadow"]} ms-auto`}
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            style={{ outline: "none", boxShadow: "none" }}
          >
            <span className="navbar-toggler-icon"> </span>
          </button>

          <div
            ref={menuRef}
            className={`d-none d-xxl-flex justify-content-center collapse navbar-collapse ${
              isOpen ? "show" : ""
            }`}
          >
            <ul
              // style={{ marginRight: "240px" }}
              className={`navbar-nav d-flex justify-content-center w-100 ms-5 ${
                isOpen ? " gap-3 " : " gap-5 "
              }`}
            >
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
                          className={`fw-bold ${NavbarStyles["nav-link"]} dropdown-toggle `}
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
                        className={`fw-bold ${NavbarStyles["nav-link"]} ${
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

          {pathname.startsWith("/conference") && (
            <div className="d-none d-xxl-flex gap-2 ms-3 ">
              <Link
                href={
                  conferenceId
                    ? `/conference/${conferenceId}/scientific-program`
                    : "#"
                }
                className={`text-center text-uppercase mb-0 fw-bold text-decoration-none  ${NavbarStyles["sponsor"]}`}
              >
                Program
              </Link>

              <Link
                href={`/conference/${conferenceId}/download-brochure`}
                className={`text-uppercase text-center fw-bold mb-0 text-decoration-none ${NavbarStyles["buy-ticket"]}`}
              >
                Brochure
              </Link>
            </div>
          )}
        </div>
      </nav>
      {/* PrimeReact Sidebar for Mobile */}
      <Sidebar
        visible={isOpen}
        onHide={() => setIsOpen(false)}
        position="right"
        className="p-sidebar"
        blockScroll 
        style={{
          zIndex: 1050,
          borderTopLeftRadius: "15px",
          borderBottomLeftRadius: "15px",
          overflow: "hidden",
            background: `linear-gradient(135deg, #f1efe8 0%, #ffffff 100%)`

        }}
        ref={menuRef}
      >
        <div className="container p-4">
          <ul className="list-unstyled ps-0">
            {Menuitems.map((item, idx) => {
              const isActive = expandedItem === item.label;
              return (
                <li key={idx} className="mb-2">
                  {item.items ? (
                    <div>
                      <span
                        className="fw-bold fs-5"
                        style={{ cursor: "pointer" }}
                        onClick={() => toggleExpand(item.label)}
                      >
                        {item.label}
                        <i
                          className={`${
                            isActive ? "pi pi-angle-up" : "pi pi-angle-down"
                          }`}
                          style={{ marginLeft: 8 }}
                        ></i>
                      </span>
                      <hr />
                      {isActive && (
                        <ul className="list-unstyled ps-3 fs-5 mt-1">
                          {item.items.map((sub, i) => {
                            const isSubActive = false; // or implement your own active logic for subitems
                            return (
                              <li key={i}>
                                <Link
                                  href={sub.url}
                                  className={`d-block py-1 text-decoration-none ${
                                    isSubActive
                                      ? "fw-bold text-primary"
                                      : "text-dark"
                                  }`}
                                  onClick={() => setIsOpen(false)}
                                >
                                  {sub.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <>
                      <Link
                        href={item.url}
                        className={`d-block py-1 fs-4 text-decoration-none ${
                          isActive ? "fw-bold text-primary" : "text-dark"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                      <hr />
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </Sidebar>
    </div>
  );
}
