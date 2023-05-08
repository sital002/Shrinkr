const express = require("express");
const ShortUniqueId = require("short-unique-id");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const app = express();


const URL = require("./model/URLModel")

const PORT = process.env.PORT || 8000;
dotenv.config();


app.use(express.json())
const uid = new ShortUniqueId({ length: 10 });




app.use(express.static("./public"))

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("Database connected")
}).catch((err)=>{
    console.log(err)
})



app.post("/create-url", async(req,res)=>{
    const {url} = req.body;
    if(!url) {
         console.log("Url is required");
    }
    else{
        const shortUrl = uid();
        try{

            await URL.create({
                longUrl:url,
                shortUrl,
            });
            res.status(201).json({
                success:true,
                shortUrl:`${req.get("host")}/${shortUrl}`
            })
            }
            catch(err){
                console.log(err);
                // res.status(400).json()
            }
    }
})


app.get("/:id",async(req,res)=>{
    const {id} = req.params;
    const url = await URL.findOne({shortUrl:id});
    if(url){
        res.redirect(url.longUrl);
    }
    else{
        console.log("URl not found");
        res.redirect("/")
    }
})

app.listen(PORT,()=>{
    console.log("Server is running at ",PORT);
})