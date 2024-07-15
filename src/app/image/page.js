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
     const search = searchParams.getAll('id')

     const image_embed= useSelector(state=>state.embed.imageemb)
     const queryClient= useQueryClient()
     useEffect(()=>{
      queryClient.invalidateQueries(['image']);
       refetch()
     },[search[0],search[1]])



    

    const PostSearch= async function(pageParam){
          
         
          const res= await fetch('http://localhost:3000/api/image',{
            method:'POST',
            body:JSON.stringify({
              image: image_embed,
              pageParam2:pageParam,
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
    const { data, isLoading, fetchNextPage, isFetchingNextPage ,refetch} =
    useInfiniteQuery({
      queryKey: ['image',search[0],search[1]],
      queryFn: ({ pageParam =  (search[1]=='option1'?0:61)    }) => PostSearch(pageParam),
      getNextPageParam:(lastPage) => lastPage.nextPage!=(search[1]=='option1'?61:120)?lastPage.nextPage:null,
    });

    useEffect(() => {
    
   
      if (inView) {
    
         fetchNextPage()
      }
    }, [fetchNextPage,inView]);
   const content=data&&data.pages.map((el)=>
     el['data'].map((ev,index)=>{
        return  (
   <img 
   key={index}
   src={ev} className="
      rounded-md 
      ">
      </img>
        )
       
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
           columns-4  mx-auto space-y-4 gap-4    my-4
        w-[100%]'>
            {content&&content[0].length==0 && <p > 검색 결과가 없습니다</p>}
       {content} 
       <div 
         className='
         w-[100%]
         h-80
         '
         ref={ref}>{isFetchingNextPage &&<Loading_Spinner></Loading_Spinner>}
         </div>
        </div>
       
       
         </Bounderi>
        
)
}

