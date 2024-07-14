"use client"
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
  const queryClient = new QueryClient()
  // <ReactQueryDevtools initialIsOpen={false}/>
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
  export const ReactQueryProvider=({children})=>{
    return(
    <QueryClientProvider client={queryClient}>
    
              {children}
         
        </QueryClientProvider>
    )
  }
  