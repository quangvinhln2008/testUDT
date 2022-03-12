const fs = require("fs");
fs.readFile("./back-end","utf8",(err, data)=>{
    if(err) throw err;

    console.log(data.toString());
})
