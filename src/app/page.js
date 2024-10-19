
"use client"
import "./globals.css";

import { useInfiniteQuery  } from '@tanstack/react-query';
import { useEffect,useState } from "react"
import { useInView } from 'react-intersection-observer';
import Bounderi from './components/Borderi';
import Image from 'next/image';

import Loading_Spinner from './components/loading';
 function Page() {
  const [isImageLoading, setImageLoading] = useState(true)
  const { ref, inView } = useInView();
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
    //const content=data&&data.pages.map((el)=>
    //  el['data'].map((ev,index)=>{
    //     return     <div
    //     key={index}
    //     className='
    //      my-1
    //      
    //       h-[100%]
    //      w-[100%]
    //      h-25v
    //     '>
    //      {
    //        isImageLoading && <Loading_Spinner></Loading_Spinner>
    //      }
    //<Image 
    //       
    //       quality={80}
    //       className=" w-[100%] rounded-md
    //       "
    // width={200}  // 이미지 너비
    // height={200} // 이미지 높이
    //    alt="image_for_main"
    //    onLoad={() => setImageLoading(false)}
    //    src={`${ev.iamge_ral_src}`} 
    //   >
    //   </Image>
    //      </div>
    //  })
   //)//
//

//<div className='
//bg-white
//  rounded-xl
//  p-4
//    grid grid-cols-4 gap-4
//w-[100%]'>
//
//{/*content*/}
//
//
//
//
//<div 
//className='
//w-[100%]
//'
//ref={ref}>{isFetchingNextPage &&<Loading_Spinner></Loading_Spinner>}
//</div>
//</div>
//



return (
    <Bounderi>
   
       
       
         </Bounderi>
        
)


}

export default Page
