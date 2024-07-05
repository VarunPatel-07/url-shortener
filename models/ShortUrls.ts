import mongoose from "mongoose";
const { Schema } = mongoose;
const ShortUrlSchema = new Schema({
  Auther: {
    type: String,
    required: true,
   
  },
  shortID: {
    type: String,
    unique: true,
    required: true,
  },
  RedirectUrl: {
    type: String,
    required: true,
  },
  Analytics: [
    {
      timestamp : Date
    }
  ]
});


const  ShortUrl = mongoose.model("ShortUrl", ShortUrlSchema);
export default ShortUrl