class Api{
    constructor(){
        this.url="mc.womadao.top"
        this.mc=require("minecraft-protocol")
    }
    getstatus(){
        return new Promise((resolve, reject) =>{
            this.mc.ping({"host":this.url,"port":25565},(err,data) =>{
                if(err){
                    reject(err)
                    return ;
                }
                resolve(data)
            })
        })
    }
    
}
module.exports=new Api()