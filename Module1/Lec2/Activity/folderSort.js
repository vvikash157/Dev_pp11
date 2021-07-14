let fs=require("fs");

let extensionMapping=require("./util.js");
let testFolderPath="./Downloads";

let allFiles=fs.readdirSync(testFolderPath);
for(let i=0;i<allFiles.length;i++)
{
    sortFile(allFiles[i]);
}
//console.log(allFiles);
function getExtension(files)
{
    files = files.split(".");
    return files[1];
}

// sortFile(files){
// let extension=getExtension(files);

// }
// getExtension(files)
// {
//     file=file.split(".");
//     return file[1];
//     console.log(extension);
// }
function checkExtensionFolder()
{   let extensionFolderName=testFolderPath;
     for(let key in extensionMapping)
    {   let extension=extensionMapping[key];
        if(extension.includes(extension))
        {
            extensionFolderName=extensionFolderName+"/"+key;
            break;
        }
    }
    
    let isfolderExist= fs.existsSync(extensionFolderName);
    if(!isfolderExist)
    {
        fs.mkdirSync(extensionFolderName);
    }
    return extensionFolderName;
}


function moveFile(files,extensionFolderName)
{   let sourcePath=testFolderPath+"/"+files;
    let destinationPath=+extensionFolderName+"/";
    fs.copyFileSync(sourcePath,destinationPath);
    //fs.unlinkSync(sourcePath);

}

function sortFile(files)
{
    let extension=getExtension(files);
   let extensionFolderName=checkExtensionFolder(extension);
    moveFile(files,extensionFolderName);
    
}