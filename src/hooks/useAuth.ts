"use client"

import { useQuery } from '@tanstack/react-query'
import router, { useRouter } from 'next/navigation';
import { useEffect } from 'react';


const useAuth = () => {
 const router = useRouter();
  
 
  const { data, error } = useQuery({
    queryKey:['auth'],
    queryFn: async () => {
    const response = await fetch('http://localhost:3000/verify-token', {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`,
      }
    });

    if (!response.ok) throw new Error('Not authorized');
    const responseJson = await response.json();
    console.log(responseJson);
    return responseJson;
  }})
  
  useEffect(() => {
    if (error) {
      router.push('/login');
    }
  }, [error, router]);

  return { data, error };
};

export default useAuth;
