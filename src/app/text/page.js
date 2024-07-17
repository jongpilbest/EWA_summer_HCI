"use client"

import Bounderi from '../components/Borderi';
import Loading_Spinner from '../components/loading';
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
      const search = searchParams.getAll('id')


    const PostSearch= async function(pageParam){
     
          const res= await fetch('http://localhost:3000/api',{
            method:'POST',
            body:JSON.stringify({
              lable:search[0],
              pageParam1:pageParam,
              percent:search[1],
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
    const { data, isLoading, refetch, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['text',search[0],search[1]],
      queryFn: ({ pageParam =  (search[1]=='option1'?0:61)  }) => PostSearch(pageParam),
      getNextPageParam:(lastPage) => lastPage.nextPage<(search[1]=='option1'?61:120)?lastPage.nextPage:null
    });
    useEffect(()=>{
      queryClient.invalidateQueries(['text']);
      refetch()
     },[search[0],search[1]])



 
   const content=data&&data.pages.map((el)=>
     el['data'].map((ev,index)=>{
        return     <div
        key={index}
        className='
         my-1
    
    
         w-[100%]
         h-25v
        '>
   <img src={ev} className="
      rounded-md 
      w-[100%]
           h-[100%]
      ">
      </img>
         </div>
     })
  )

 
return (
<Bounderi>
{
        isLoading&&<Loading_Spinner></Loading_Spinner>
      }
        <div className='
         bg-white
           rounded-xl
           p-4
          grid grid-cols-4 gap-4
        
        w-[100%]'>
   
       {content}
       
       <div 
         className='
         w-[100%]
         h-50
         '
         ref={ref}>{isFetchingNextPage &&<Loading_Spinner></Loading_Spinner>}
         </div>
        </div>
       
   
   </Bounderi>
)
}

