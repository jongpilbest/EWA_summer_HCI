"use client"
import React from "react"
import { useState,useRef } from "react";
import Loading_Spinner from "./loading";

import { image_embed,text_embed } from "../GlobalRedux/Features/counter/counterSlice";
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from "react-redux"
import Ppline_text from "./P_text";
const Searchbar= function(){
  const dispatch= useDispatch();
    const router = useRouter();
   
    //이미지 최적화를 하는게 날듯 
   
    const[loading,setloading]=useState(false);
    const [text,setText]= useState('');
  
    const onChange= (e)=>{
      setText(e.target.value)
    }

    const nmae=[
      'TEST 1',
      'TEST 2',
      'TEST 3',
     
    ]
    const [activeButtons, setActiveButtons] = useState({
      button1: false,
      button2: false,
      button3: false,
    
    });
    const handleClick = (buttonKey) => {
      setActiveButtons((prevState) => ({
        ...prevState,
        [buttonKey]: !prevState[buttonKey], // 해당 키의 상태를 토글
      }));
    };


    const ref=useRef(null);
      const handleSubmit = async() => {
      var code_number=-1;

      const true_button= Object.values(activeButtons).map((el,index)=>{
       if(el){
        code_number=index;
        return;
       }
      })

     console.log(code_number,'버튼 지금 뭐 눌렸나느')

     
   


  // text 으로 페이지가는거 
     if(text){
       ref.current.style.visibility = 'visible';
       const  name_embed= await Ppline_text(text);  
       ref.current.style.visibility = 'hidden';
       dispatch(text_embed(name_embed))
    
       if(text.includes('female')){
         router.push(`/text?id=${text}&id=0,299&id=${code_number}`);
         return;
       }
       if(text.includes('male')){
         router.push(`/text?id=${text}&id=300,600&id=${code_number}`);
         return;
       }
       else{
         router.push(`/text?id=${text}&id=0,600&id=${code_number}`);
       }
     
     }
     // 카테고리로 가는거 

     //else{
     //  var new_include='';
     //  array_object.forEach((el,index)=>{
     //    if(el){
     //      new_include+=`,${nmae[index]}`
     //    }
     //  })
     //  router.push(`/image?id=${new_include}`);
     //}
//

        //
        /*
          // 넘어가는 페이지  다른페이지로 이동하지만 content 부분만 업데이트 되고 있음 
        if(text.length>0 && image_data.length>0){
          //3번째 페이지로 이동
          const  name_embed= await Ppline_text(text);
          dispatch(text_embed(name_embed))
          ref.current.style.visibility = 'hidden';
          router.push(`/text_image?id=${text}&id=${image_data}&id=${selectedOption}`)
          
        }
         if ( text.length>0){
              const  name_embed= await Ppline_text(text);
             dispatch(text_embed(name_embed))
             ref.current.style.visibility = 'hidden';
             router.push(`/text?id=${text}&id=${selectedOption}`)
                  
        }
        else{
          ref.current.style.visibility = 'hidden';
          router.push(`/image?id=${image_data}&id=${selectedOption}`)
              
        }
      
        //postSearch(search_data)
     
        //mutation.mutate({ text:search_data,pageParam:1 });
      */

        };
      
 
    return (
        <div
        className=" 
       bg-neutral-800
         w-[100%] relative flex justify-center items-center py-12 ">
           <div className='    w-[60%]    h-[70%]       flex    flex-col    items-center'>
            
               <a onClick={()=>router.push('./')} className=' text-white text-7xl text-center font-extrabold p-14 font-inter'> Virtual Human</a>
            
               <div className="flex  justify-between my-4 w-[60%]"> 
               <div>
               
       
              
               </div>
               </div>
          <div className='    w-[60%]  my-1      rounded-xl bg-neutral-700 items-center flex flex-row justify-between
          '>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-white m-3  size-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
  {
    loading&&(     <div role="status">
      <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
      <span className="sr-only">Loading...</span>
  </div>)
  }


          <input
           onChange={onChange}
           value={text}
            type="text"
             placeholder="Search for image" 
            className=' w-[100%] bg-transparent text-white 
            '
            >
  
  
            </input>  
          
  
          </div>
          <div className="flex justify-center py-4 w-[80%]">
            {/* 버튼 여기 고쳐야됨 !!!! 버튼을 3개로 바꾸고 test1, test2, test3 으로 바꾸고 클릭하는게 따라 결과물 다르게 주는거 즉 db 어떻게 접근해야되는지 거기에 대한 코드 작성 */}
          {Object.keys(activeButtons).map((buttonKey,index) => (
        
        <button
          key={buttonKey}
          onClick={() => handleClick(buttonKey)}
          className={` bg-indigo-800  w-[15%] px-8
            py-1
            mx-2 

  text-white  flex  justify-center items-center rounded-xl 

            ${
              activeButtons[buttonKey] ? 'bg-sky-200' : 'bg-indigo-800'
            }

          }`}
        >
         {
          nmae[index]
         }
        </button>
      ))}
            </div>
            <div className='p-4'></div>
          
          <button 
          onClick={()=>handleSubmit()
          }
  
          className='
          bg-indigo-800  w-[20%] px-8
            py-1
            mx-2 

  text-white  flex  justify-center items-center rounded-xl 

          '>
        Search
            </button>
         
  


             <div ref={ref} style={{
            visibility:'hidden'
               }}>
               <Loading_Spinner></Loading_Spinner>
          </div>
          </div>
        
        
        </div>

    )
}

export default Searchbar