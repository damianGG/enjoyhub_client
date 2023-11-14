'use client'

//import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { SessionProvider } from "next-auth/react";


export default function Providers({ children }: { children: React.ReactNode }) {
  //const [queryClient] = React.useState(() => new QueryClient())
  return (
    <SessionProvider>
      {children}
      {/* <QueryClientProvider client={queryClient}>{children}</QueryClientProvider> */}
    </SessionProvider>
  )
}