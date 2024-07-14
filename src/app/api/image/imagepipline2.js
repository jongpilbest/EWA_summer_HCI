


import * as faceapi from 'face-api.js';
//search bar 로부터 text 임베딩하느코드 

import KeyModel from '../../../../model/Keymodel';
const pipe_line2= async function(progress_callback){   
   const new_progress= Object.values(progress_callback['image']['result'])

   const queue=[];
   const pageParam= progress_callback['pageParam2']
   const data= await KeyModel.find();
   ///console.log(data[0]['imageembeding'].length, new_progress.length)
   // // 열리는거 확인 이제 비교해서 cos높은거만 push 으로 모아놓기 
   for(var i=pageParam; i<61; i++){
     const similarity= await faceapi.euclideanDistance(data[i]['imageembeding'],new_progress);
    // console.log(similarity,'비슷한거')
    if(queue.length>15){
        break;
    }
     if(similarity>=0.83){
       queue.push(data[i]['iamge_ral_src']);
     }
   }


    return ([queue,i+1])


   
}

export default pipe_line2
