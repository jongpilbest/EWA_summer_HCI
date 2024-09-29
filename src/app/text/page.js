"use client"
import Image from 'next/image';
import Bounderi from '../components/Borderi';
import Loading_Spinner from '../components/loading';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from "react"
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'next/navigation'
import { shallowEqual } from 'react-redux';
export default function Page_deatil({params}){
    const { ref, inView } = useInView();
    const searchParams = useSearchParams()
    const queryClient= useQueryClient()
    const image_embed= useSelector(state=>state.embed.textemb,shallowEqual)
      const search = searchParams.getAll('id')
      const search_split_arr= search[1].split(',')
      const [isImageLoading, setImageLoading] = useState(true)

      const PostSearch= async function(pageParam){
   
          const res= await fetch('http://localhost:3000/api',{
            method:'POST',
            body:JSON.stringify({
              // search 에서 입력한 데이터를 지우지 말고 저장햇다가 쓰는 그런 용도로 redux 에 저장한거 
            lable: await image_embed,
            pageParam1:pageParam,
            percent: parseInt(search_split_arr[1]),
            }),
            headers:{
              'Content-Type':'application/json'
            },
         
          })
           const newres=await res.json();
            //여기서 nextpage 의 숫자 (그니까 인덱스 번호 i 을 받아서 > 그걸 nextpage 에다가 넣음)
           return ({
            data:newres['image'][0],
            nextPage:parseInt(newres['image'][1])
          })
       }
    const { data, isLoading, refetch, fetchNextPage, isFetchingNextPage } = 
    useInfiniteQuery({
      queryKey: ['text',search[0]],
      queryFn: ({ pageParam =search_split_arr[0]  }) => PostSearch(pageParam),
      // 여기서 기존 쿼리가 (woman일때는) 한계 인덱스번호가 61보다 작으면 더 query 실행하라는 의미고  
      
      getNextPageParam:(lastPage) =>{
     
       return lastPage.nextPage<parseInt(search_split_arr[1]) ?lastPage.nextPage:null}

    });

    useEffect(() => {
      if (search[0]) {
        refetch();
      }
    }, [search[0]]);
  


    useEffect(() => {
      if (inView ) {
        fetchNextPage();
      }
    }, [inView, isFetchingNextPage]);
     // search "text"와 인덱스가 달라지는 경우 기존 query 삭제후 다시 refech 하라는거 같은데 
//     

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
          height={200} // 이미지 높이
        alt="image_for_main"
     
        src={`${ev.toString()}`} 
       >
       </Image>

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
      
          { data && data.pages[0].data.length==0 && <p> 검색 결과가 없습니다</p>}

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

