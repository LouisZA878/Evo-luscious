'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

const Wrappers = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            gcTime: 10 * (60 * 1000),
            refetchInterval: 5 * (60 * 1000),
            // refetchInterval: false,
            refetchOnWindowFocus: false,
            retry: 3
          },
        },
      })
  )
  return <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
}

export default Wrappers