


import * as faceapi from 'face-api.js';
//search bar 로부터 text 임베딩하느코드 

import KeyModel from '../../../../model/Keymodel';
const pipe_line2= async function(progress_callback){   
   const new_progress= Object.values(progress_callback['image']['result'])

   const queue=[];
   const pageParam= progress_callback['pageParam2']
   const percent=progress_callback['percent'];
   const percent_2= 0.6;
   //percent=='option1'?0.75:0.66;
   const emd=percent=='option1'?61:118
   
   const data= await KeyModel.find();


   // // 열리는거 확인 이제 비교해서 cos높은거만 push 으로 모아놓기 
   for(var i=pageParam; i<emd; i++){
     const similarity= await faceapi.euclideanDistance(data[i]['imageembeding'],new_progress);
   
    if(queue.length>15){
        break;
    }
     if(similarity>=percent_2){
       queue.push(data[i]['iamge_ral_src']);
     }
   }

  //console.log(i,queue)
    return ([queue,i+1])

}

export default pipe_line2
