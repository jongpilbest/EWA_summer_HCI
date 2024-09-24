import { Schema, model, models } from 'mongoose'

const postSchema = new Schema({
  keyembeding:Array,
  imageembeding:Array,
  iamge_ral_src:String,
  index:Number

}, { timestamps: true })


const KeyModel = models.key || model('key', postSchema)

export default KeyModel;