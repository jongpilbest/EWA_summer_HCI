

import { resolve } from "styled-jsx/css";
import Image_base64 from "./Image_base64";


const ImageEnbedding = async function(e){
    return new Promise((resolve,reject)=>{
      var reader=  new FileReader();
      reader.onload=  async function(){
       var result= reader.result;
      const result_base= await Image_base64(result);
         return resolve(result_base)
      }
      reader.readAsDataURL(e)
    
    })
      
   

}

export default ImageEnbedding