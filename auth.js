const coder=require('./coder');
const decode=require('./decoder');

const auth=(req,res)=>{
    if(req.headers["warmabirthday"]==undefined || req.headers["warmabirthday"]==null){
        coder.encode().then(resp=>{
            res.setHeader("token",Buffer.from(resp).toString('base64'))
            res.sendStatus(403)
        })
        
        
    }else{
        if(req.headers["warmabirthday"]){
            try{
                var dr=decode(new Buffer.from(req.headers["warmabirthday"], "base64").toString())
                console.log(dr=="1026")
                if(dr=="1026"){
                    next(req,res)

                    
                }else{
                    
                    coder.encode().then(resp=>{
                        res.setHeader("token",Buffer.from(resp).toString('base64'))
                        res.sendStatus(403)
                    })
                }
            }catch(e){
                console.log(e)
                console.log("onerror")
                coder.encode().then(resp=>{
                    res.setHeader("token",Buffer.from(resp).toString('base64'))
                    res.sendStatus(403)
                })
            }
        }else{
            coder.encode().then(resp=>{
                res.setHeader("token",Buffer.from(resp).toString('base64'))
                res.sendStatus(403)
            })
            
        }
    }
    
}
module.exports=auth