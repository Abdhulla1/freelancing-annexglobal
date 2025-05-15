"use client";

import styles from './SideMenu.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const SideMenu = () => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };
  const menuItems = [
  { label: 'Dashboard', icon: 'bx bxs-dashboard', path: '/admin-annex-global-conferences/dashboard' },
  { label: 'Controlled Access', icon: 'bx bxs-lock', path: '/admin-annex-global-conferences/dashboard/controlled-access' },
  { label: 'Main Page', icon: 'bx bxs-home', path: '/admin-annex-global-conferences/dashboard/main-page' },
  { label: 'Conference', icon: 'bx bxs-home-alt-2', path: '/admin-annex-global-conferences/dashboard/conference/' },
  { label: 'OCM', icon: 'bx bxs-user-circle', path: '/admin-annex-global-conferences/dashboard/organizing-committee-members' },
  { label: 'Speakers', icon: 'pi pi-users', path: '/admin-annex-global-conferences/dashboard/admin-speakers' },
  { label: 'Contact Us', icon: 'bx bx-envelope', path: '/admin-annex-global-conferences/dashboard/contact-us' },
  { label: 'News Letter', icon: 'bx  bxs-news', path: '/admin-annex-global-conferences/dashboard/news-letter' },
  { label: 'PDF Uploads', icon: 'pi pi-file-pdf', path: '/admin-annex-global-conferences/dashboard/pdf-uploads' },
  { label: 'Testimonial', icon: 'pi pi-calendar', path: '/admin-annex-global-conferences/dashboard/testimonial' },
  {
    label: 'Registration', icon: 'pi pi-cog', path: '/admin-annex-global-conferences/dashboard/registration' 
  },
  { label: 'Footer', icon: 'bx bxs-inbox' ,path: '/admin-annex-global-conferences/dashboard/footer'},
  // { label: 'Footer', icon: 'bx bxs-inbox' ,children: [
  //     { label: 'Attendee', path: '/admin-annex-global-conferences/dashboard/registration/attendee' },
  //     { label: 'Delegate', path: '/admin-annex-global-conferences/dashboard/registration/delegate' },
  
  //   ]},
];


const renderMenuItem = (item) => {
  const isActive = () => {
    if (item.children) {
      return item.children.some(child => pathname.startsWith(child.path));
    }

    // Match all routes under Conference
    if (item.label === 'Conference') {
      return pathname.startsWith('/admin-annex-global-conferences/dashboard/conference');
    }

    // Exact match for others
    return pathname === item.path;
  };

  if (item.children) {
    return (
      <div key={item.label}>
        <div
          className={`${styles.menuItem} ${isActive() ? styles.active : ''}`}
          onClick={() => toggleDropdown(item.label)}
        >
          <i className={`${item.icon} me-2`}></i>
          <span>{item.label}</span>
          <i className="bx bx-chevron-down ms-auto"></i>
        </div>
        {(openDropdown === item.label || isActive()) && (
          <div className={styles.dropdownMenu}>
            {item.children.map(subItem => (
              <Link
                href={subItem.path}
                key={subItem.label}
                className={`${styles.subMenuItem} ${pathname.startsWith(subItem.path) ? styles.active : ''}`}
              >
                {subItem.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <Link
        href={item.path}
        key={item.label}
        className={`${styles.menuItem} ${isActive() ? styles.active : ''}`}
      >
        <i className={`${item.icon} me-2`}></i>
        <span>{item.label}</span>
      </Link>
    );
  }
};


  return <div className={styles.sidebar}>{menuItems.map(renderMenuItem)}</div>;
};

export default SideMenu;
