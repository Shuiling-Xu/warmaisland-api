const decode=(key)=>{
    console.log(key)
    var dic='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ '
    var salt_list=[';', '<', '=', '>', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', '\\', ']', '^', '_', '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~', ' ', '"', '#', '$', '%', '&', "'", '(', ')', '*', ',']
    var tmp=[]
    for (var i in key) {
      console.log(key[i])
      console.log(salt_list.indexOf(key[i])==-1)
      if(salt_list.indexOf(key[i])==-1){
        tmp.push(key[i])
      }
      
    }
    console.log(tmp)
    tmp=tmp.join('')
    var keyitem=tmp.split('-')
    console.log(keyitem)
    var send_timestamp=keyitem[1].split('!')[0]
    var time_out=keyitem[1].split('!')[1].split('+')[0]
    var add_each_value=keyitem[1].split('!')[1].split('+')[1].split('.')[0]
    var right_first_num=keyitem[1].split('!')[1].split('+')[1].split('.')[1]
    var origindata=keyitem[0]
    var data=""
    for(var i=0,len=origindata.length;i<len;i++){
      data += origindata[i];
      if(i % 2 == 1 && i!=len-1) data += ',';
    }
    //console.log(data)
    data=data.split(',')
    //console.log(data)
    var temp=[]
    for(i=0,len=data.length;i<len;i++){
      if(data[i][0]=="0"){
        temp.push(eval(data[i][1]))
      }else{
        temp.push(eval(data[i]))
      }
    }
    //console.log(temp)
    data=temp
    temp=[]
    for(i=0,len=data.length;i<len;i++){
      temp.push(Math.abs(data[i]-add_each_value))
    }
    //console.log(temp)
    if(temp[0]!=eval(right_first_num)){
      throw new Error("Invalid data")
    }
    data=temp
    var result=[];
    for(i=0;i<data.length;i++){
      result.push(dic[data[i]])
    }
    result=result.join('')
    //console.log(result)
    var now=Date.now()
    console.log(now<eval(time_out)+eval(send_timestamp))
  
      //console.log('success')
      console.log(result)
      try{
        result=result.replace(/'/g,`"`)
        console.log(result)
        var d=JSON.parse(result)
        return String(d)
      }catch(e){
        /*this.$message({
          showClose: true,
          message: '当前数据包错误，我们正在为您拉取最新请求，请稍后',
          type: 'error',
          duration:1000,
        });
        this.getdata();
        console.log(e)*/
        throw new Error("Timeout")
        
      }


  }
  module.exports=decode