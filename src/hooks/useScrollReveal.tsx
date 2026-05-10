'use client';

import { useEffect, useState } from 'react';

export function useScrollReveal() {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-reveal-id');
          if (id) {
            setRevealed((prev) => new Set([...prev, id]));
            observer.unobserve(entry.target);
          }
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('[data-reveal-id]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return revealed;
}

export function RevealElement({
  id,
  children,
  delay = 0,
  className = '',
}: {
  id: string;
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const revealed = useScrollReveal();
  const isRevealed = revealed.has(id);

  return (
    <div
      data-reveal-id={id}
      className={`reveal ${isRevealed ? 'in' : ''} ${className}`.trim()}
      style={delay > 0 ? { transitionDelay: `${delay * 0.08}s` } : {}}
    >
      {children}
    </div>
  );
}
