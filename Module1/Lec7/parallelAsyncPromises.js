let files=["./f1.txt","./f2.txt","./f3.txt","./f4.txt"];
const fs=require("fs");

for(let i=0;i<files.length;i++)
{
    let promisesss=fs.promises.readFile(files[i]);
    letpromises.then(data+"");
    console.log(promises);
}

