

import { pipeline, cos_sim } from '@xenova/transformers';
//search bar 로부터 text 임베딩하느코드 
import * as faceapi from 'face-api.js';

import KeyModel from '../../../model/Keymodel';
var store_here=[]
const pipe_line= async function(progress_callback){   
   const new_progress= progress_callback['lable']
    const pageParam= parseInt( progress_callback['pageParam1']);
  const percent= parseInt(progress_callback['percent']);
  //여기로 for 문 마지막 
  const name=progress_callback['embed_number']
  const sort_range=progress_callback['sort_range']

   const queue=[];
   const data= await KeyModel.find();
  
   //const plut_severage=sort_range[0]+sort_range[1];
   var main_start=0;
   if(sort_range=="0,299" ||
    sort_range=="300,600"||
    sort_range=="0,600"
   )
   {
    if(sort_range=="0,299"){
      main_start=0;
 
     }
     if(sort_range=="300,600"){
        main_start=300;
   
     }
     if(sort_range=="0,600"){
      main_start=0;
     }

    if(pageParam==0 ||pageParam==300){
     
     // console.log('여기 몇번?')
   
    for(var i=sort_range[0]; i<sort_range[1]; i++){
      const similarity= await cos_sim(data[i].toObject()[name],new_progress);
     queue.push([similarity,data[i]['iamge_ral_src']]);
    }
    // object 형식으로 한다음에 .. 그다음  sort 해서
     // similarty 높은순서대로 가겠다는 그말이네 
    await queue.sort((a,b)=>{
      return  b[0]-a[0]
    })
    store_here= queue;

  }
   }
   //console.log(data[1]['tag'],'')
   //console.log(data[1].toObject()['tag'])
   // 
  //  // 열리는거 확인 이제 비교해서 cos높은거만 push 으로 모아놓기 
    
    //female , male , none 이면 필터링 하는 기준이 다르니 . 그순으로 sort 해서 정렬하고 
    // 필터링 된거 순서대로 내보는식으로 하면될듯 
    // 처음 300개네 ..? 그니까 지금 4개씩 보내야되는거지
    //console.log('?2',pageParam-main_start,pageParam+8-main_start )
    const dat_final=store_here.slice(pageParam-main_start,pageParam+20-main_start);
    //const dat_final= await queue.map(innerArr => innerArr.slice(pageParam, pageParam+4));
    // console.log(dat_final,'여기 비어있나?')


   // for(var i=pageParam; i<percent; i++){
   //   const similarity= await cos_sim(data[i].toObject()[name],new_progress);
   //  if(queue.length>=8){
   //      break;
   //  }
   //  queue.push([similarity,data[i]['iamge_ral_src']]);
   //    
   // }
   // // object 형식으로 한다음에 .. 그다음  sort 해서
   //  // similarty 높은순서대로 가겠다는 그말이네 
//
   // queue.sort((a,b)=>{
   //   return  b[0]-a[0]
   // })
   // var final=[];
//
   // queue.map((el)=>{
   //  final.push(el[1]);
   // })
   // 
    //console.log(queue)
    
    //console.log(dat_final,'??????')
//    console.log(pageParam,'데이터',dat_final)
    return ([dat_final,pageParam+21])

  
}

export default pipe_line
