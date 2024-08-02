const execSync = require('child_process').exec;

const encoder=(p)=>{
    //console.log(data)
    return new Promise((success) =>{


        execSync('python3 coder.py '+String(p),(err,output) => {
            if(err){
                success(null)
            }else{
                success(output)
            }
        })
    })
    


}

exports.encode=encoder