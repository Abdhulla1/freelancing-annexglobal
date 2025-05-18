'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // default style or custom

NProgress.configure({ showSpinner: false }); // optional config

export default function GlobalClientProvider({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    handleStart();

    const timer = setTimeout(() => {
      handleStop();
    }, 500); // delay for smoother animation

    return () => clearTimeout(timer);
  }, [pathname]);

  return <>{children}</>;
}
