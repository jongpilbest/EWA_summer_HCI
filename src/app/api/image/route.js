
import { NextResponse } from 'next/server'
import pipe_line2 from './imagepipline2';

export async function POST(request) {
  
    const text= await request.json();
 
    const classifier = await pipe_line2(text);
  
  return NextResponse.json({image:classifier});
}

