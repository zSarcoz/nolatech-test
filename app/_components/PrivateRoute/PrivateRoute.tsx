"use client"
import { useAuthStore } from '@/app/(pages)/(store)/authStore';
import { useRouter } from 'next/navigation';
import { memo, useEffect, useState } from 'react';

const PrivateRoute = ({ children }) => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !currentUser) {
      router.push('/login');
    }
  }, [isClient, currentUser, router]);

  if (!isClient || !currentUser) {
    return null;
  }

  return children;
};

export default memo(PrivateRoute);