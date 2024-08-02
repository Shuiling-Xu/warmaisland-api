//const mcapi= require('./mcapi');

var express = require('express');
//var http = require('http');
//var WebSocket = require('ws');
const axios = require('axios')
const decode = require('./decoder')

const setHeader = require('./setheader.js')
var app = express();

var fs=require('fs');

const coder=require("./coder")
const  dbapi=require('./dbapi')
const mcapi= require("./mcapi")

/*var server = http.createServer(app);
var wss = new WebSocket.Server({server});
var senddatalist=[]
var senddataclientpath=['/sendstatus']
const clientboardcast=(clientlist,data)=>{
    clientlist.forEach(client=>{
        if(senddatalist.indexOf(client)==-1){
            client.send(data)
        }
    })
}*/
//var clientrechache=null;
/*wss.on('connection', (ws,req)=>{
    console.log('链接成功！');
    if(senddataclientpath.indexOf(req.url.match('/').input)!=-1){
        senddatalist.push(ws)
    }
    ws.on('message', (data)=>{
        if(req.url.match('/').input=="/sendstatus"){ 
            if(data != 'heartbeat'){
                if(clientrechache==null){
                    ws.send(JSON.stringify(J))
                }
                    var datac={}
                    coder.encode(data).then((cdata)=>{
                        datac['mcstatus']=cdata
                        clientboardcast(wss.clients,JSON.stringify(datac))
                        ws.send(JSON.stringify({refresh_timestamp:(new Date()).valueOf()+5000}))
                    })
            }else{
                ws.send('alive')
            }
        }
        
        //console.log(data)
        
    });
    
    setInterval(()=>{
        var datac={}
        mcapi.mcapi().then((data)=>{
            //console.log(data)
            
                coder.encode(data).then((cdata)=>{
                    datac['mcstatus']=cdata
                    clientboardcast(wss.clients,JSON.stringify(datac))
                })
            
        })
        
    },1999)

})*/
app.all('*', (req, res, next) => {
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header('Access-Control-Expose-Headers', 'token,data,region');
    setHeader(res,"region","ali-ecs-hongkong")
    next();
  });

app.get('/getbilibilivideoinfo',(req,res)=>{
    axios({
        method: 'GET',
        url:"https://api.bilibili.com/x/web-interface/view?bvid="+String(req.query.bvid)
    }).then((response)=>{
        //console.log('success')
        //console.log(JSON.stringify(response.data))
        res.send(response.data)
    }).catch((err)=>{
        //console.log(err)
        res.send(err)
    })
})
app.get('/getbilibiliuidinfo',(req,res)=>{
    axios({
        method: 'GET',
        url:"https://api.bilibili.com/x/space/acc/info?mid="+String(req.query.uid)
    }).then((response)=>{
        //console.log('success')
        //console.log(JSON.stringify(response.data))
        res.send(response.data)
    }).catch((err)=>{
        //console.log(err)
        res.send(err)
    })
})
/*server.listen(8000, function listening() {
    console.log('服务器启动成功！');
});*/
app.get('/getbanlist',(req,res)=>{
    
    dbapi.getmcban().then((resd)=>{
        res.send(JSON.stringify({"code":"0","data":resd}))
    }).catch((err)=>{
        res.send(JSON.stringify({"code":"-500"}))
    })
})
app.get('/auth',(req,res)=>{
   
    axios.post("https://skin.warma.ren/oauth/token",{
            "grant_type":"authorization_code",
            "client_id":"1",
            "client_secret":"OORnAMG10VZqbg5Q1VpbsAkT69ljkx333pSEXd9Q",
            "redirect_uri":"https://ocerotes.cool-js.cool/auth",
            "code":String(req.query.code)
        }
    ).then((ress)=>{
        res.send(ress.data)
    }).catch((err)=>{
        res.send(err)
    })
    
})
app.get("/ping",(req, res)=>{
    mcapi.getstatus().then((status)=>{
        res.send(JSON.stringify({"code":"0","data":status}))
    }).catch((error)=>{
        res.send(JSON.stringify({"code":"500"}))
    })
})
app.get("/refresh",(req, res)=>{
    if(req.headers["data"]){
        setHeader(res,"data",decode(new Buffer.from(req.headers["data"], "base64").toString()))
        res.sendStatus(404)
    }else{
        res.sendStatus(404)
    }
    
})
app.get("/code",(req, res)=>{
    coder.encode(req.headers["data"]).then((resp)=>{
        setHeader(res,"token",resp)
        res.sendStatus(404)
    })

})
app.get("/getip",(req, res)=>{
    console.log(req.headers)
    res.send(req.headers["x-forwarded-for"])
})
app.get("/",(req,res)=>{
	res.send("ali-ecs-hongkong")
})
app.listen(8080,"0.0.0.0",function listening() {
    console.log('http://0.0.0.0:8081')
})
