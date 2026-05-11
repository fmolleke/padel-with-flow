'use client';

import { useEffect, useState } from 'react';
import { Navigation } from './Navigation';

export function NavigationWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <Navigation />;
}
