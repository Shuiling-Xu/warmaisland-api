const header=(res,name,data)=>{
    res.setHeader(String(name),Buffer.from(data).toString('base64'))
}
module.exports=header