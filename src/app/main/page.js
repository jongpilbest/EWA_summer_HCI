"use client"



import { useInfiniteQuery  } from '@tanstack/react-query';
import { useEffect } from "react"
import { useInView } from 'react-intersection-observer';
import Bounderi from '../components/Borderi';
import Image from 'next/image';

import Loading_Spinner from '../components/loading';
export default function Main_page({params}){
     const { ref, inView } = useInView();
  //   const searchParams = useSearchParams()
   


    const PostSearch= async function(pageParam){
          
          const res= await fetch('http://localhost:3000/api/Random',{
            method:'POST',
            body:JSON.stringify({
              pageParam:pageParam
            }),
            headers:{
              'Content-Type':'application/json'
            },
         
          })
           const newres=await res.json();
           return ({
            data:newres['image'],
            nextPage:pageParam+1
          })
       }
    const { data, isLoading, fetchNextPage, isFetchingNextPage ,refetch} =
    useInfiniteQuery({
      queryKey: ['image'],
      queryFn: ({ pageParam = 1  }) => PostSearch(pageParam),
      getNextPageParam:(lastPage) => lastPage.nextPage<120?lastPage.nextPage:null,
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
    <Image 
     width={500}  // 이미지 너비
     height={300} // 이미지 높이
        alt="image_for_main"
    src={`https://drive.google.com/thumbnail?id=${ev.iamge_ral_src}&sz=w1000`} className="
       rounded-md 
       w-[100%]
            h-[100%]
       ">
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
       
       {/*content*/}

       <Image 
     width={500}  // 이미지 너비
     height={300} // 이미지 높이
        alt="image_for_main"
    src={`https://github.com/dltpals16/human_figure_dataset/blob/master/young_girl/South%20Asian/01.png?raw=true`} className="
       rounded-md 
       w-[100%]
            h-[100%]
       ">
       </Image>

    
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

