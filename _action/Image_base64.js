
import * as faceapi from 'face-api.js';

import { getKey } from './KeyAction';
const  imagebase64 = async function(base64String){

        // loading the models
        await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
        await faceapi.nets.faceExpressionNet.loadFromUri('/models');
        const base64Response = await fetch(base64String);
        const blob = await base64Response.blob();
        const img = await faceapi.bufferToImage(blob);
       
        // detect a single face from the ID card image
       const idCardFacedetection = await faceapi.detectSingleFace(img,
          new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks().withFaceDescriptor();

          return (idCardFacedetection.descriptor)
          //getKey(idCardFacedetection.descriptor,excel)
              
          //return (idCardFacedetection.descriptor)
      //
      
      // const selfieFacedetection = await faceapi.detectSingleFace(selfieRef.current,
      //   new faceapi.TinyFaceDetectorOptions())
      //   .withFaceLandmarks().withFaceDescriptor();
    //co nsole.log(idCardFacedetection.descriptor,'?')
     
        
        /**
         * Do face comparison only when faces were detected
        
        if(idCardFacedetection && selfieFacedetection){
          // Using Euclidean distance to comapare face descriptions
          const distance = faceapi.euclideanDistance(idCardFacedetection.descriptor, selfieFacedetection.descriptor);
          console.log(distance);
        }
    */
 
}
export default imagebase64