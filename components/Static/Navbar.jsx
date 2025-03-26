"use client";
import { useState, useRef, useEffect,useMemo  } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NavbarStyles from "./Navbar.module.css";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
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
      items: [
        { label: "UPCOMING EVENTS", url: "#" },
        { label: "PAST EVENTS", url: "#" },
      ],
    },
    { label: "GALLERY", url: "#" },
    { label: "CONTACT US", url: "/contact-us" },
    {
      label: "MORE",
      items: [
        { label: "UPCOMING EVENTS", url: "#" },
        { label: "PAST EVENTS", url: "#" },
      ],
    },
  ];  
  const idMatch = pathname.match(/^\/conference\/([^/]+)/);
  const conferenceId = idMatch ? idMatch[1] : null;  // Menu items for the /conference route
  const conferenceMenuItems = [
    { label: "HOME", url: "/" },
    { label: "WEBINAR", url: conferenceId ? `/conference/${conferenceId}/webinar` : "#" },
    { label: "TOPICS", url: conferenceId ? `/conference/${conferenceId}/topics` : "#" },
    { label: "OCM", url: conferenceId ? `/conference/${conferenceId}/organizing-committee-members` : "#" },
    { label: "SPEAKERS", url: conferenceId ? `/conference/${conferenceId}/speakers` : "#" },
    { label: "REGISTRATION", url: conferenceId ? `/conference/${conferenceId}/registration` : "#" },
    {
      label: "MORE",
      items: [
        { label: "SUBMIT ABSTRACT", url: conferenceId ? `/conference/${conferenceId}/submit-abstract` : "#" },
        { label: "Scientific Program", url: "#" },
      ],
    },
  ];

  // Determine which menu to display
  const Menuitems  = useMemo(() => {
    return pathname.startsWith("/conference/") ? conferenceMenuItems : homePageItems ;
  }, [pathname]);

  return (
    <nav
      className={`${NavbarStyles.navbar} navbar navbar-expand-md navbar-light bg-white shadow animate__animated ${
        isFixed ? "fixed-top animate__fadeInDown" : ""
      }`}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center w-100">
        <div className={`d-flex align-items-center ${NavbarStyles.logo}`}>
          <img src="/icons/annex_logo.png" alt="Logo" className="img-fluid mb-2" />
          <div className="mt-2">
            <span className={NavbarStyles["main-title"]}>
              ANNEX GLOBAL CONFERENCE
            </span>
            <p className={NavbarStyles["sub-title"]}>
              Advancing Healthcare, Inspiring Minds
            </p>
          </div>
        </div>

        <button
          className={`navbar-toggler border-0 ${NavbarStyles["navbar-noShadow"]} ms-auto`}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          ref={menuRef}
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
        >
          <ul className="navbar-nav mx-auto gap-5">
            {Menuitems.map((item, index) => {
              const isActive = activeItem === item.label;
              return (
                <li
                  key={index}
                  className={`nav-item ${item.items ? "dropdown" : ""}`}
                  onClick={() => setActiveItem(item.label)}
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
                            <Link href={subItem.url} className="dropdown-item">
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
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="d-none d-md-block">
          <button className={NavbarStyles["buy-ticket"]}>
            <Link
              href={"#"}
              className="d-flex align-items-center mb-0 text-decoration-none h5 fw-normal"
            >
              Buy Tickets
            </Link>
          </button>
        </div>
      </div>

      {isOpen && (
        <button className={`w-100 ${NavbarStyles["buy-ticket"]}`}>
          <Link href={"#"} className="mb-0 text-decoration-none h5 fw-normal w-100">
            Buy Tickets
          </Link>
        </button>
      )}
    </nav>
  );
}

