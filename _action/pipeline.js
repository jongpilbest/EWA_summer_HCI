'use server'
import { pipeline, cos_sim } from '@xenova/transformers';

const PipelineSingleton= async function(){

    const e='man	strong	assertive	mature	bright big almond gray blue eyes	thin straight nose	thick wide lips'
    const extractor = await pipeline('feature-extraction', 'Xenova/bge-m3');
    const data_em= await extractor(e, { pooling: 'cls', normalize: true });

    return Object.values(data_em)[2]
}
export default PipelineSingleton;


