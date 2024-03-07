"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

  const useAuth = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_ADDRESS}/verify-token`, {
          headers: {
            'Authorization': `${localStorage.getItem('token')}`,
          }
        });

        if (!response.ok) {
          throw new Error('Not authorized');
        }

        const responseJson = await response.json();
        console.log(responseJson);
        setData(responseJson);
      } catch (error) {
        console.error(error);
       // setError(error);
      }
    };

    verifyToken();
  }, []);

  useEffect(() => {
    if (error) {
      router.push('/login');
    }
  }, [error, router]);

  return { data, error };
};

export default useAuth;