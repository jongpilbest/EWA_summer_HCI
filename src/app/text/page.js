"use client"

import Bounderi from '../components/Borderi';

import { useInfiniteQuery,useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from "react"
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'next/navigation'
export default function Page_deatil({params}){
    const { ref, inView } = useInView();
    const searchParams = useSearchParams()
    const queryClient= useQueryClient()
    useEffect(() => {
   
        if (inView) {
    
           fetchNextPage()
        }
      }, [inView]);
      const search = searchParams.get('id')


    const PostSearch= async function(pageParam){
     
          const res= await fetch('http://localhost:3000/api',{
            method:'POST',
            body:JSON.stringify({
              lable:search,
              pageParam1:pageParam
            }),
            headers:{
              'Content-Type':'application/json'
            },
         
          })
           const newres=await res.json();
           return ({
            data:newres['image'][0],
            nextPage:newres['image'][1]
          })
       }
    const { data, error, refetch, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['text',search],
      queryFn: ({ pageParam = 0 }) => PostSearch(pageParam),
      getNextPageParam:(lastPage) => lastPage.nextPage!=62?lastPage.nextPage:null,
    });
    useEffect(()=>{
      queryClient.invalidateQueries(['text']);
      refetch()
     },[search])

  

   console.log(data,'콘텐츠')
   const content=data&&data.pages.map((el)=>
     el['data'].map((ev,index)=>{
        return     <div
        key={index}
        className='
         my-4
        '>
   <img src={ev} className="
      rounded-md 
      ">
      </img>
         </div>
     })
  )
  console.log(content)
return (
<Bounderi>
        <div className='
         bg-white
           rounded-xl
           p-4
           columns-4  mx-auto space-y-4 gap-4
        w-[100%]'>
       {content}
        </div>
        <div 
         className='
         w-[100%]
         h-50
         '
         ref={ref}>{isFetchingNextPage && <p className='
         text-white
         '>'Loading...'</p>}Loading</div>
   
   </Bounderi>
)
}

