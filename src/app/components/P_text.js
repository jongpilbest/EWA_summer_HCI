'use server'
import { pipeline, cos_sim } from '@xenova/transformers';

const  Ppline_text= async function(e){

    const extractor = await pipeline('feature-extraction', 'Xenova/bge-m3');
    const data_em= await extractor(e, { pooling: 'cls', normalize: true });

    return Object.values(data_em)[2]
}
export default Ppline_text