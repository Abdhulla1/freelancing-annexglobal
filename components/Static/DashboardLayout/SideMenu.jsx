"use client"; 

import styles from './SideMenu.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const SideMenu = () => {
    const pathname = usePathname();
  const menuItems = [
    { label: 'Dashboard', icon: 'bi bi-grid', path: '/' },
    { label: 'Controlled Access', icon: 'bi bi-lock', path: '/access' },
    { label: 'Conference', icon: 'bi bi-house-door', path: '/conference' },
    { label: 'OCM', icon: 'bi bi-person', path: '/ocm' },
    { label: 'Speakers', icon: 'bi bi-people', path: '/speakers' },
    { label: 'PDF Uploads', icon: 'bi bi-calendar', path: '/uploads' },
    { label: 'Testimonial', icon: 'bi bi-calendar', path: '/testimonial' },
    { label: 'Registration', icon: 'bi bi-gear', path: '/registration' },
    { label: 'Footer', icon: 'bi bi-window', path: '/footer' },
  ];

  return (
    <div className={styles.sidebar}>
      {menuItems.map(({ label, icon, path }) => (
        <Link href={path} key={label} passHref legacyBehavior>
          <a className={`${styles.menuItem} ${pathname === path ? styles.active : ''}`}>
            <i className={`${icon} me-2`}></i>
            <span>{label}</span>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default SideMenu;
