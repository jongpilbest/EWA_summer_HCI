

import { pipeline, cos_sim } from '@xenova/transformers';
//search bar 로부터 text 임베딩하느코드 
import * as faceapi from 'face-api.js';
import Ppline from '../../../_action/Ppeline_';
import KeyModel from '../../../model/Keymodel';
const pipe_line= async function(progress_callback){   
   const new_progress= progress_callback['lable']
    const pageParam= progress_callback['pageParam1']
   // const search_text_embeding= await Ppline(new_progress);


  const percent=progress_callback['percent'];
const queue=[];
   const data= await KeyModel.find();
   
    const emd=percent=='option1'?61:118
    // 열리는거 확인 이제 비교해서 cos높은거만 push 으로 모아놓기 
    for(var i=pageParam; i<emd; i++){
      const similarity= await cos_sim(data[i]['keyembeding'][0],new_progress);
  
     if(queue.length>20){
         break;
     }
     if(similarity>0.60){
       queue.push([similarity,data[i]['iamge_ral_src']]);
     }
       
    }
    // object 형식으로 한다음에 .. 그다음  sort 해서
     
    queue.sort((a,b)=>{
      return  b[0]-a[0]
    })
    var final=[];

    queue.map((el)=>{
     final.push(el[1]);
    })
    


    return ([final,i+1])

  
   
   // 여기 열리는지 확인하고 데이터 불러오기 + 연산하기 

   
  
 // return score
   
}

export default pipe_line
