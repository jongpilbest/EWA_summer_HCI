
/// input으로 이미지를 받아서 faceapi 으로 인코딩해서 결과를 나오게 함 
import Image_base64 from "./Image_base64";
//
import { getKey } from "./KeyAction";
const ImageEnbedding = async function(e,excel){
    
       var reader= new FileReader();
       reader.onload= async function(){
        var result= reader.result;
       
         Image_base64(result,excel)
       

       }

     reader.readAsDataURL(e)

}

export default ImageEnbedding