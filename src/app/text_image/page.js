"use client"

import Bounderi from '../components/Borderi';
import Loading_Spinner from '../components/loading';
import { useInfiniteQuery,useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from "react"
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'next/navigation'
import { useSelector } from 'react-redux';
export default function Page_deatil({}){
    const { ref, inView } = useInView();
    const searchParams = useSearchParams()
    const search = searchParams.getAll('id')



    const image_embed= useSelector(state=>state.embed.imageemb)
    useEffect(()=>{
      queryClient.invalidateQueries(['text_image']);
      refetch()
   
     },[search[0],search[1]])
   const queryClient= useQueryClient()   
    useEffect(() => {
   
        if (inView) {
         
           fetchNextPage()
          
        }
      }, [inView]);
    

    const PostSearch= async function(pageParam1){
    
          const res= await fetch('http://localhost:3000/api/image_text',{
            method:'POST',
            body:JSON.stringify({
              lable:search[0],
              image:image_embed,
              pageParam1:pageParam1[0],
              pageParam2:pageParam1[1],
            }),
            headers:{
              'Content-Type':'application/json'
            },
         
          })
           const newres=await res.json();
           return ({
            data:newres['image'],
            nextPage:[newres['index'][0],newres['index'][1]]
          })
       }
    const { data, isLoading, refetch, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['text_image',search[0]+search[1]],
      queryFn: ({ pageParam = [0,0] }) => PostSearch(pageParam),
      getNextPageParam:(lastPage) => lastPage.nextPage
    });


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

return (
<Bounderi>
{
        isLoading&&<Loading_Spinner></Loading_Spinner>
      }
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
         ref={ref}>{isFetchingNextPage &&<Loading_Spinner></Loading_Spinner>}
         </div>
   
   </Bounderi>
)
}

