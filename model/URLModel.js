const mongoose = require("mongoose");


const  URLSchema = new  mongoose.Schema({
    longUrl:{
        type:String,
        required:[true,"URL is required"]
    },
    shortUrl:{
        type:String,
        required:[true,"Short Url is required"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})


 



module.exports = mongoose.model("Url",URLSchema)
