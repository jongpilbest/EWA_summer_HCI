import { NextResponse } from 'next/server'

import KeyModel from '../../../../model/Keymodel';
var image_list=[];
export async function POST(request) {
  
    const params= await (request.json())
    //const data= await KeyModel.find();
   
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
  

  return NextResponse.json({image:image_});
}

