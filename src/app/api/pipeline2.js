

import { pipeline, cos_sim } from '@xenova/transformers';
//search bar 로부터 text 임베딩하느코드 
import * as faceapi from 'face-api.js';

import KeyModel from '../../../model/Keymodel';
const pipe_line= async function(progress_callback){   
   const new_progress= progress_callback['lable']
    const pageParam= progress_callback['pageParam1'];
    //nextpage 로 갱신하는거
   // const search_text_embeding= await Ppline(new_progress);
  const percent=progress_callback['percent'];
  //여기로 for 문 마지막 



   const queue=[];
   const data= await KeyModel.find();
   
    // 열리는거 확인 이제 비교해서 cos높은거만 push 으로 모아놓기 
    for(var i=pageParam; i<percent; i++){
      const similarity= await cos_sim(data[i]['keyembeding'],new_progress);
     
     if(queue.length>=4){
         break;
     }
     if(similarity>0.67){
       queue.push([similarity,data[i]['iamge_ral_src']]);
     }
       
    }
    // object 형식으로 한다음에 .. 그다음  sort 해서
     // similarty 높은순서대로 가겠다는 그말이네 

    queue.sort((a,b)=>{
      return  b[0]-a[0]
    })
    var final=[];

    queue.map((el)=>{
     final.push(el[1]);
    })
    

    return ([final,i+1])
   
   
}

export default pipe_line
