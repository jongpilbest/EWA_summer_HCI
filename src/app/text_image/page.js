"use client"
import Image from 'next/image';
import Bounderi from '../components/Borderi';
import Loading_Spinner from '../components/loading';
import { useInfiniteQuery,useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from "react"
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'next/navigation'
import { useSelector } from 'react-redux';
import { text_embed } from '../GlobalRedux/Features/counter/counterSlice';



export default function Page_deatil({}){
    const { ref, inView } = useInView();
    const searchParams = useSearchParams()
    const search = searchParams.getAll('id')

    const texxt_embed= useSelector(state=>state.embed.textemb)
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
              lable:texxt_embed,
              image:image_embed,
              pageParam1:pageParam1[0],
              pageParam2:pageParam1[1],
              percent:search[2],
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
      queryKey: ['text_image',search[0],search[2]],
      queryFn: ({ pageParam = [ (search[2]=='option1'?0:61), (search[2]=='option1'?0:61)] }) => PostSearch(pageParam),
      getNextPageParam:(lastPage) => JSON.stringify(lastPage.nextPage)!=JSON.stringify([(search[2]=='option1'?61:120),(search[2]=='option1'?61:120)])?lastPage.nextPage:null,
    });


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
            h-50
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

