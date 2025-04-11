'use client';
import React, { useEffect, useRef, useState } from "react";
import 'boxicons/css/boxicons.min.css'; // make sure this is imported if not already

const ScrollableTabs = ({ tabs,activeTab,setActiveTab}) => {

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollRef = useRef(null);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (el) {
      setShowLeftArrow(el.scrollLeft > 0);
      setShowRightArrow(el.scrollLeft + el.clientWidth < el.scrollWidth);
    }
  };

  const scroll = (direction) => {
    const el = scrollRef.current;
    const scrollAmount = 120;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  return (
    <div className="mt-4">
      <div className="position-relative d-flex align-items-center border-bottom mb-3">
        {showLeftArrow && (
          <i
            className="bx bx-chevron-left fs-3 position-absolute start-0 px-2"
            style={{ zIndex: 10, cursor: "pointer", background: "white" }}
            onClick={() => scroll("left")}
          ></i>
        )}

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="d-flex overflow-auto flex-nowrap w-100 px-4"
          style={{
            scrollBehavior: "smooth",
            overflowX: "auto",
            overflowY: "hidden",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",           // Firefox
            msOverflowStyle: "none",           // IE & Edge
            WebkitScrollbar: { display: "none" },
          }}
        >
          <div
            style={{
              display: "flex",
              width: "max-content",
            }}
          >
            {Object.keys(tabs).map((key) => (
              <div
                key={key}
                className={`me-4 text-nowrap py-2 ${
                  activeTab === key
                    ? "text-warning border-bottom border-warning"
                    : "text-secondary"
                }`}
                style={{ fontSize: "15px", cursor: "pointer", whiteSpace: "nowrap",userSelect: "none"}}
                onClick={() => setActiveTab(key)}
              >
                {key}
              </div>
            ))}
          </div>
        </div>

        {showRightArrow && (
          <i
            className="bx bx-chevron-right fs-3 position-absolute end-0 px-2"
            style={{ zIndex: 10, cursor: "pointer", background: "white" }}
            onClick={() => scroll("right")}
          ></i>
        )}
      </div>
    </div>
  );
};

export default ScrollableTabs;
