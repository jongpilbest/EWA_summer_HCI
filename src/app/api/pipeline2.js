

import { pipeline, cos_sim } from '@xenova/transformers';
//search bar 로부터 text 임베딩하느코드 

import Ppline from '../../../_action/Ppeline_';
import KeyModel from '../../../model/Keymodel';
const pipe_line= async function(progress_callback){   
   const new_progress= progress_callback['lable']
   const queue=[];
   
   const search_text_embeding= await Ppline(new_progress);
   const data= await KeyModel.find();
    // 열리는거 확인 이제 비교해서 cos높은거만 push 으로 모아놓기 
    for(var i=0; i<data.length; i++){
      const similarity= await cos_sim(data[i]['keyembeding'][0],search_text_embeding);
   
      
      if(similarity>=0.66){
   
        queue.push(data[i]['iamge_ral_src']);
    
      }
    }
  
    
    return (queue)

  
   
   // 여기 열리는지 확인하고 데이터 불러오기 + 연산하기 

   
  
 // return score
   
}

export default pipe_line
