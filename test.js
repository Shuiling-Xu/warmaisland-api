const axios = require('axios');
axios.get('http://93b0ebee43234837a5c15a1b486f874e-cn-hongkong.alicloudapi.com/getbilibilivideoinfo',{
    headers: {
        "Authorization":"APPCODE "+"ce9622e920444a93817583e1f489c881"
    }
}).then((res)=>{
    console.log(res.data);
}).catch((err)=>{
    console.log(err)
})