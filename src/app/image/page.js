"use client"


import { useRouter } from 'next/router'
import { useInfiniteQuery,useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from "react"
import { useInView } from 'react-intersection-observer';
import Bounderi from '../components/Borderi';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation'
import Loading_Spinner from '../components/loading';
export default function Page_deatil({params}){
     const { ref, inView } = useInView();
     const searchParams = useSearchParams()
     const [embed_id, setembed_id]=useState([]);
     const[image,setimage]=useState('')
     const search = searchParams.get('id')
     //const image_embed= useSelector(state=>state.embed.imageemb)
     const queryClient= useQueryClient()
     useEffect(()=>{
      queryClient.invalidateQueries(['image']);
       refetch()
     },[search])



    

    const PostSearch= async function(){
          
         
          const res= await fetch('http://localhost:3000/api/image',{
            method:'POST',
            body:JSON.stringify({
              pageParam:search.split(',').splice(1,5),
            }),
            headers:{
              'Content-Type':'application/json'
            },
         
          })
           const newres=await res.json();
           return ({
            data:newres['image']
          })
       }
    const { data, isLoading, fetchNextPage, isFetchingNextPage ,refetch} =
    useInfiniteQuery({
      queryKey: ['image',search[0],search[1]],
      queryFn: ({ pageParam =  1  }) => PostSearch(pageParam),
      getNextPageParam:(lastPage) =>lastPage.nextPage<120?lastPage.nextPage:null,
    });

    useEffect(() => {
    
   
      if (inView) {
    
         fetchNextPage()
      }
    }, [fetchNextPage,inView]);
 
    const content=data&&data.pages.map((el)=>
      el['data'].map((ev,index)=>{
         return     <div
         key={index}
         className='
          my-1
     
     
          w-[100%]
          h-25v
         '>
    <img src={ev.iamge_ral_src} className="
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
         '
         ref={ref}>{isFetchingNextPage &&<Loading_Spinner></Loading_Spinner>}
         </div>
        </div>
       
       
         </Bounderi>
        
)
}

