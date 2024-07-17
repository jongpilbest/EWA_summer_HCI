"use client"
import React from "react"
import { useState,useRef } from "react";
import Loading_Spinner from "./loading";
import ImageEnbedding from "../../../_action/ImageEnbedding";
import { image_embed } from "../GlobalRedux/Features/counter/counterSlice";
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
const Searchbar= function(){
  const dispatch= useDispatch();
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    //이미지 최적화를 하는게 날듯 
   const [image_data,set_image_data]=useState('');
    const[loading,setloading]=useState(false);
    const [text,setText]= useState('');
  
    const onChange= (e)=>{
      setText(e.target.value)
    }
    




    const selectFile = useRef("");
   
    const onChange_image = async function(e){
        setloading(true);
        const result=await ImageEnbedding(e.target.files[0]);
        set_image_data(e.target.files[0].name)
        dispatch(image_embed({result}))
        setloading(false)
      }

      const handleSubmit = () => {
    
        if(text.length>0 && image_data.length>0){
          //3번째 페이지로 이동
          router.push(`/text_image?id=${text}&id=${image_data}&id=${selectedOption}`)
         
        }
        else if ( text.length>0){
          router.push(`/text?id=${text}&id=${selectedOption}`)
        }
        else{
          router.push(`/image?id=${image_data}&id=${selectedOption}`)
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
            
               <a  href="http://localhost:3000/"className=' text-white text-7xl text-center font-extrabold p-14 font-inter'> Virtual Human</a>
            
               <div className="flex  justify-between my-2 w-[60%]"> <p className=" text-white">{image_data}</p> 
               <div>
                <input
                    type="radio"
                    id="option1"
                    name="options"
                    value="option1"
                    checked={selectedOption === 'option1'}
                    onChange={handleOptionChange}
                    className="mr-2 "
                />
                <label className="text-white mx-3" htmlFor="option1">man</label>
         
        
                <input
                    type="radio"
                    id="option2"
                    name="options"
                    value="option2"
                    checked={selectedOption === 'option2'}
                    onChange={handleOptionChange}
                    className="mr-2 mx-1"
                />
                <label className="text-white mx-3" htmlFor="option2">woman</label>
       
               <button  onClick={()=>set_image_data('')} className="bg-indigo-800 h-20  rounded-lg py-1 w-10 text-white"> X</button>
               </div>
               </div>
          <div className='    w-[60%]    h-[10%]     rounded-xl bg-neutral-700 items-center flex flex-row justify-between
          '>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-white m-5 size-6">
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