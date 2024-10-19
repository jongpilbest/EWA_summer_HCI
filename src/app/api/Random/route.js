import { NextResponse } from 'next/server'

import fs from 'fs';
import path from 'path';

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

 // const filePath = path.join(process.cwd(), 'DataBAse', 'first_json.json');
 // const jsonData = fs.readFileSync(filePath, 'utf-8');
 // console.log(JSON.parse(jsonData),'데이터 속도좀')
  //const data= await KeyModel.find()
  //console.log(data.length,'데이터')
 

 // const image_=  await KeyModel.aggregate([
 //   { $sample: { size: 10 } }, // 10개의 랜덤한 이미지를 가져옴
 //   { $match: { _id: { $nin: image_list } } } // 이미 가져온 이미지 제외
 // 
 // ]).exec()

  

  //image_.forEach((el)=>{
  //  image_list.push(el._id)
  //}) 
  //

  return NextResponse.json({image:[,1]});
}

