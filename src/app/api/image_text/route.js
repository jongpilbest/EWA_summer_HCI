
import { NextResponse } from 'next/server'
import pipe_line from '../pipeline2';
import pipe_line2 from '../image/imagepipline2'


export async function POST(request) {
  
    const text= await request.json();
    // 여기서
    var total_image =new Set();
    const classifier1 = await pipe_line2(text);
    const classifier2 = await pipe_line(text);

    for(var i=0; i<classifier1[0].length; i++){
      if(classifier1[0][i]){
        total_image.add(classifier1[0][i])  
      }
      
  }
  for(var i=0; i<classifier2[0].length; i++){
    if(classifier2[0][i]){
      total_image.add(classifier2[0][i])  
    }
    
  }
  
  total_image=[...total_image]


    
    const total_start_index=[classifier1[1],classifier2[1]];
  
  return NextResponse.json({image:total_image, index:total_start_index});
}

