const decode=require("./decoder.js")
const fs = require("fs")
fs.readFile("./yux/0.jpg.key",(err, data) =>
{
    if(err){
        console.log(err)
    }else{
        console.log(decode(data))
    }
})