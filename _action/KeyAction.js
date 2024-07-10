'use server'

import { pipeline, cos_sim } from '@xenova/transformers';
import KeyModel from "../model/Keymodel";
import Ppline from './Ppeline_';
export  async function getKey(e,excel){
  try {
    // 여기는 데이터 베이스 채우는 함수( save ) 매개변수 2개 받아야됨 
    // 하나는 모델 keyword 랑 하나는 모델 이미지 


      const newTodo = await KeyModel.create({
          keyembeding:  await Ppline(excel[1]),
          imageembeding: e,
          iamge_ral_src:excel[0]
        });

    newTodo.save()

  
   console.log('이거 저장된거 마니?')
  } catch (error) {
    return { errMsg: error.message }
  }
}