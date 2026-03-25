'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SplashScreen from '@/components/SplashScreen';

export default function Page() {
  const [showSplash, setShowSplash] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const hasSeenSplash = localStorage.getItem('has-seen-splash');
    if (hasSeenSplash) {
      setShowSplash(false);
      router.replace('/login');
    } else {
      setShowSplash(true);
    }
  }, [router]);

  const handleSplashFinish = () => {
    localStorage.setItem('has-seen-splash', 'true');
    setShowSplash(false);
    router.replace('/login');
  };

  if (showSplash === null) return null;
  if (showSplash) return <SplashScreen onFinish={handleSplashFinish} />;
  return null;
}
