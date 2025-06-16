// components/FloatingButtons.jsx
import React from "react";
import styles from "./FloatingButtons.module.css";
import Link from "next/link";

export default function FloatingButtons() {
  return (
    <div className={styles.floatingContainer}>
      <Link href="https://wa.me/your-number" target="_blank" className={`text-decoration-none ${styles.whatsapp}`}>
        <i className="pi pi-whatsapp"></i>
      </Link>
      <Link href="/contact-us" className={`text-decoration-none ${styles.chat}`}>
        <i className="pi pi-comments"></i>
      </Link>
    </div>
  );
}
