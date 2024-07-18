


import * as faceapi from 'face-api.js';
//search bar 로부터 text 임베딩하느코드 

import KeyModel from '../../../../model/Keymodel';
const pipe_line2= async function(progress_callback){   
   const new_progress= Object.values(progress_callback['image']['result'])
   const pageParam= progress_callback['pageParam2']
   const percent=progress_callback['percent'];
   const emd=percent=='option1'?61:118
      const queue=[];
   const data= await KeyModel.find();




   // // 열리는거 확인 이제 비교해서 cos높은거만 push 으로 모아놓기 
   for(var i=pageParam; i<emd; i++){
     const similarity= await faceapi.euclideanDistance(data[i]['imageembeding'],new_progress);
     if(queue.length>20){
      break;
      }
      if(similarity>0.70){
         queue.push([similarity,data[i]['iamge_ral_src']]);
      }
   }


   queue.sort((a,b)=>{
    return  b[0]-a[0]
  })
  var final=[];

  queue.map((el)=>{
   final.push(el[1]);
  })
  
    return ([final,i+1])

}

export default pipe_line2
