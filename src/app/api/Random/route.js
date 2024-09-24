import { NextResponse } from 'next/server'

import KeyModel from '../../../../model/Keymodel';
var image_list=[];
export async function POST(request) {
  
    const params= await (request.json())
    const data= await KeyModel.find();
   
  // 여기서 index 번호 추가하는거 
  const page_param=params['pageParam'];
  if(page_param==1){
    image_list=[];

  }

  const image_=  await KeyModel.aggregate([
    { $sample: { size: 10 } }, // 10개의 랜덤한 이미지를 가져옴
    { $match: { _id: { $nin: image_list } } } // 이미 가져온 이미지 제외
  ]).exec()

  image_.forEach((el)=>{
    image_list.push(el._id)
  }) 
  
  

   const remain_array=[];
     //으로 으로 만약 다시 새로고침했을때 1인거 같음 우선 이렇게 코드를 짜보자 그리고 이미 가져온 이미지 id 목록은 변수로 저장해놔도 되는가?????
    

  return NextResponse.json({image:image_});
}

