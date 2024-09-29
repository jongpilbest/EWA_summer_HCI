"use client"



import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect,useState } from "react"
import { useInView } from 'react-intersection-observer';
import Bounderi from '../components/Borderi';

import { useSearchParams } from 'next/navigation'
import Image from 'next/image';
import Loading_Spinner from '../components/loading';
export default function Page_deatil({params}){
     const { ref, inView } = useInView();
     const searchParams = useSearchParams()
     const search = searchParams.get('id')

     const [isImageLoading, setImageLoading] = useState(true)
    const PostSearch= async function(params){
          
         
          const res= await fetch('http://localhost:3000/api/image',{
            method:'POST',
            body:JSON.stringify({
              pageParam:search,
              nextParam:params
            }),
            headers:{
              'Content-Type':'application/json'
            },
         
          })
           const newres=await res.json();
           return ({
            data:newres['image'],
            nextPage:newres['nextPage']
          })
       }
    const { data, isLoading, fetchNextPage, isFetchingNextPage ,refetch} =
    useInfiniteQuery({
      queryKey: ['search',search],
      queryFn: ({pageParam=0}) => PostSearch(pageParam),
      getNextPageParam:(lastPage) =>lastPage.nextPage!=-1?lastPage.nextPage:null,
    });
 
    useEffect(() => {
      // 검색어가 변경될 때 refetch 호출
      if (search) {
        refetch();
      }
    }, [search,refetch]);

  // re-fetch 안되게 막기 여기확인해봐서

  useEffect(() => {
  
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, isFetchingNextPage]);

    const content=data&&data.pages.map((el)=>
      el['data'].map((ev,index)=>{
         return     <div
         key={index}
         className='
          my-1
     
     
          w-[100%]
          h-25v
         '>
  
    <Image 
           	quality={80}
           className=" w-[100%] rounded-md"
           width={200}  // 이미지 너비
           height={200}  // 이미지 높이
        alt="image_for_main"
   
        src={`${ev.iamge_ral_src}`} 
       >
       </Image>
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
         h-50
         '
         ref={ref}>{isFetchingNextPage &&<Loading_Spinner></Loading_Spinner>}
         </div>
       
   
       
        </div>
       
       
         </Bounderi>
        
)
}

