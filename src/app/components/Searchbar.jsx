"use client"
import React from "react"
import { useState,useRef } from "react";

import ImageEnbedding from "../../../_action/ImageEnbedding";
import { image_embed } from "../GlobalRedux/Features/counter/counterSlice";
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
const Searchbar= function(){
  const dispatch= useDispatch();
    const router = useRouter();
    const [text,setText]= useState('');
    const onChange= (e)=>{
      setText(e.target.value)
    }
    const selectFile = useRef("");
    const [image_data,set_image_data]=useState('');
    const onChange_image = async function(e){
        //console.log(e.target.files[0])
        const result=await ImageEnbedding(e.target.files[0]);
        set_image_data(e.target.files[0].name)
        dispatch(image_embed({result}))
      }

      const handleSubmit = () => {
      console.log('go')
        if(text.length>0 && image_data.length>0){
          //3번째 페이지로 이동
          router.push('/text_image?id={text}')
         
        }
        else if ( text.length>0){
          router.push(`/text?id=${text}`)
        }
        else{
          router.push(`/image?id=${image_data}`)
        }
    
        //postSearch(search_data)
     
        //mutation.mutate({ text:search_data,pageParam:1 });
      };


    return (
        <div
        className=" 
       bg-neutral-800
         w-[100%] relative flex justify-center items-center h-60v">
           <div className='    w-[60%]    h-[70%]       flex    flex-col    items-center'>
            
               <p className=' text-white text-7xl text-center font-extrabold p-16 font-inter'> Virtual Human</p>
            
               <div className=""> <p className=" text-white">{image_data}</p> <button  onClick={()=>set_image_data('')} className="bg-yellow-300"> X</button></div>
          <div className='    w-[60%]    h-[10%]     rounded-xl bg-neutral-700 items-center flex flex-row justify-between
          '>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-white m-5 size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
  
          <input
           onChange={onChange}
           value={text}
            type="text"
             placeholder="Search for image"
            className=' w-[100%] bg-transparent text-white
            '
            >
  
  
            </input>  
            <svg 
            onClick={() => selectFile.current.click()}
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className=" text-white m-5 size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
  </svg>
  <input
          type="file"
          style={{ display: "none" }}
          ref={selectFile} 
          onChange={onChange_image}
        />
  
          </div>
          <div className='p-4'></div>
          
            <button 
            onClick={()=>handleSubmit()
            }
    
            className='
            bg-indigo-800  h-[8%] px-10 
            
            text-white  flex  justify-center items-center    rounded-xl    
            '>
          Search
              </button>
           
          </div>
        </div>

    )
}

export default Searchbar