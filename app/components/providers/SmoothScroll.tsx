'use client'

import Lenis from 'lenis'
import { useEffect } from 'react'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      autoRaf: true,
    });

    // Stop/start Lenis when modals toggle body overflow
    const observer = new MutationObserver(() => {
      const isLocked = document.body.style.overflow === 'hidden';
      if (isLocked) {
        lenis.stop();
      } else {
        lenis.start();
      }
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style'],
    });

    return () => {
      observer.disconnect();
      lenis.destroy();
    }
  }, [])

  return <>{children}</>
}
