
import { NextResponse } from 'next/server'
import pipe_line from './pipeline2';
import KeyModel from '../../../model/Keymodel';
export async function POST(request) {
  
    const text= await request.json();
 
   const classifier = await  pipe_line(text);
  return NextResponse.json({image:classifier})
}

