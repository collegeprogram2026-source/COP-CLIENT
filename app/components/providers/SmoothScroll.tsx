'use client'

import { useEffect } from 'react'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: { stop: () => void; start: () => void; destroy: () => void } | null = null;
    let observer: MutationObserver | null = null;
    let cancelled = false;

    const init = async () => {
      const { default: Lenis } = await import('lenis');
      if (cancelled) return;

      lenis = new Lenis({ autoRaf: true });

      observer = new MutationObserver(() => {
        const isLocked = document.body.style.overflow === 'hidden';
        if (isLocked) lenis?.stop();
        else lenis?.start();
      });
      observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });
    };

    const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
    if (typeof w.requestIdleCallback === 'function') {
      w.requestIdleCallback(init, { timeout: 2000 });
    } else {
      setTimeout(init, 1500);
    }

    return () => {
      cancelled = true;
      observer?.disconnect();
      lenis?.destroy();
    }
  }, [])

  return <>{children}</>
}
