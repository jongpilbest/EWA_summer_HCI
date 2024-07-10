
"use client"
import imagebase64 from '../../_action/Image_base64';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery,useMutation, useQueryClient } from '@tanstack/react-query';
import readXlsxFile from 'read-excel-file'
import ImageEnbedding from '../../_action/ImageEnbedding';
 function Page() {
  const [exceldata, setexceldata] = useState([]);
  const [image_data,set_image_data]=useState([]);
 // const [count,setcount]=useState(51);
  ///db넣는 코드 지우면 안됨..(중요/ 아직 여자 db안채웠음)
  const handleFileUpload = (event) => {
   
    readXlsxFile(event.target.files[0]).then((rows) => {
      setexceldata(rows) })
    
  };
  const isFirstRender = useRef(true);
  //image 임베딩해서 base64으로 보내는거 지우면 안됨예
  //여기서 그림 하나씩 넣고 db돌아가는지 확인좀하자능...

  const onChange_image = async function(e){
    const output= await ImageEnbedding(e.target.files[0],exceldata[count]);
    setcount((el)=>el+1);
 
  }


  const queryClient= useQueryClient()
  const [text,setText]= useState('');
  const onChange= (e)=>{
    setText(e.target.value)
  }
  const mutation = useMutation({
    mutationFn:(pageParam,text)=>searchData(pageParam,text),
    onSuccess: () => {
      queryClient.invalidateQueries(['item']);
    },
  });
  const handleSubmit = (search_data) => {
    PostSearch(search_data)
    mutation.mutate({ text:search_data,pageParam:1 });
  };

 const PostSearch= async function(search_data){

  try{
    const res= await fetch('http://localhost:3000/api',{
      method:'POST',
      body:JSON.stringify({
        lable:search_data
      }),
      headers:{
        'Content-Type':'application/json'
      },
   
    })
     const newres=await res.json();
     set_image_data(newres['image'])
   // set_image_data(res)
  }
  catch(err){
    console.error('ERROR:',err)
  }
 }


  async function searchData(
   pageParam,text
   ){
    const json= await fetch(`https://pixabay.com/api/?key=44609195-a53f49c818e04f29d461dc4eb&q=${text}&image_type=photo&page=${pageParam}`).then((response) => response.json());
    return ({
      data:json,
      nextPage: pageParam +1
    })
  }
  const selectFile = useRef("");
  const { data, error, status, fetchNextPage, isFetchingNextPage } =
  useInfiniteQuery({
    queryKey: ['item'],
    queryFn: ({ pageParam = 1 }) => searchData(pageParam,text),
    getNextPageParam:(lastPage) => lastPage.nextPage,
  });
  const { ref, inView } = useInView();
  useEffect(() => {
   
    if (inView) {
     
    }
  }, [, inView]);



  return (
    <div className=" min-h-screen 
    w-full
    h-auto
    mx-auto
    flex-col
    flex
    items-center
z
  bg-neutral-800
    ">
        <div >
        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      </div>

     
      <div
      className="
      rounded-3xl
      w-[100%]
      relative
      flex
      justify-center
      items-center
      h-60v"
      
      >
         <div className='
        w-[60%]
        h-[70%]
       
        flex
        flex-col
        items-center

        '>
          
             <p className='
             text-white
             text-7xl
             text-center
             font-extrabold
             p-16
             font-inter
             '> Virtual Human</p>
             <button onClick={imagebase64}> click</button>
        <div className='
           w-[60%]
 h-[10%]
            rounded-xl
        bg-neutral-700
        items-center
        flex
        flex-row
        justify-between
        '>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="
text-white
m-5
size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>

        <input
         onChange={onChange}
         value={text}

          type="text"
           placeholder="Search for image"
          className='
          w-[100%]
          bg-transparent
          text-white
          '
          >


          </input>  
          <svg 
          onClick={() => selectFile.current.click()}
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="
          text-white
          m-5
          size-6">
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
          onClick={()=>handleSubmit(text)
          }
  
          className='
          bg-indigo-800
          h-[8%]
        px-10
         
          text-white

          flex
          justify-center
         items-center
            rounded-xl
            
          '>
        Search
            </button>
         
        </div>
      </div>
      <div  className="
    
      w-[97%]
      h-auto"
      >
        <div className='
         bg-white
           rounded-xl
           p-4
           columns-4  mx-auto space-y-4 gap-4
        w-[100%]'>
       {image_data&&image_data.map((page,index) => {
        return (
        
                <div
                key={index}
                className='
                 my-4

                '>
           <img src={page} className="
              rounded-md 
              ">
              </img>
                  </div>
                
        
        );
      })}
        

        </div>
       
        <div 
         className='
         w-[100%]
         h-50
         '
         ref={ref}>{isFetchingNextPage && <p className='
         text-white
         '>'Loading...'</p>}Loading</div>
      </div>
        
    </div>
  );
}

export default Page
