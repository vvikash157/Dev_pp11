const fsKaObject=require("fs");
//nodeconsole.log(fsKaObject);
let f1KaData=fsKaObject.readFileSync("./f1.txt","utf-8");
console.log(f1KaData);
fsKaObject.writeFileSync("../Activity/index.pdf","Hello world!!!!!!");