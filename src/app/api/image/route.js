
import { NextResponse } from 'next/server'

import KeyModel from '../../../../model/Keymodel';

export async function POST(request) {
  
    const params= await request.json();

    // 배열으로 서칭 하고 object id 모아서 확인하는걸로 함 

    const page_param=params['pageParam']
    var next_param= params['nextParam']
  
   const page_param__=page_param.split(',').splice(1,5);
    const image_=  await KeyModel.find({
          tag:{ $eq: page_param__}, 
     })
     .skip(next_param)
     .limit(4)
     .exec()
     if(image_.length!=0
     ){
      next_param+=4
     }
     else{
      next_param=-1;

     }
    

  return NextResponse.json({image: image_,
    nextPage:next_param
  });
}

