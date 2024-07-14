
import { NextResponse } from 'next/server'
import pipe_line from './pipeline2';

export async function POST(request) {
  
    const text= await request.json();

    const classifier = await pipe_line(text);
    console.log('데이터 느려', classifier,text['lable'])
  return NextResponse.json({image:classifier});
}

