'use client';
import NProgress from 'nprogress';
import { useEffect } from 'react';

export default function Loading() {
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);

  return null; // or show a fallback like a spinner/skeleton
}
