
import { NextResponse } from 'next/server'

import KeyModel from '../../../../model/Keymodel';
export async function POST(request) {
  
    const params= await request.json();
    const data= await KeyModel.find();
   
    // 배열으로 서칭 하고 object id 모아서 확인하는걸로 함 
    const limit = 10; // 한 번에 가져올 문서 수
    const page = 1; // 
  var image_list=[];
    const page_param=params['pageParam']
   console.log(page_param,'매개변수')

    const image_=  await KeyModel.find({
          tag:{  $all: page_param},// 이미 가져온 이미지 제외
          _id: { $nin: image_list }
     }).exec()
  console.log('find', image_)
image_.forEach((el)=>{
  image_list.push(el._id)
})


  return NextResponse.json({image: []});
}

