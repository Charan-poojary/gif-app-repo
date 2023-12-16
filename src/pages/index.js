import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../lib/firebase';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/dashboard');
      } else {
        router.push('/auth/login');
      }
    });

    return () => unsubscribe();
  }, []);

  return <div>Loading...</div>;
}
