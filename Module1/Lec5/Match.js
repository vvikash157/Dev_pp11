
    const cheerio=require("cheerio");
    const fs=require("fs");
    const request=require("request");

    function getMatchDetails(matchLink)
    {
        request(matchLink , function(error , response , data){
            processData(data);
        })
    }

    function processData(html)
    {
        let myDocument=cheerio.load(html);
        let bothInning=myDocument(".card.content-block.match-scorecard-table .Collapsible");
        for (let i=0 ; i<bothInning.length ; i++)
        {
            let oneInning=myDocument(bothInning[i]);

            let teamName=oneInning.find("h5").text();

            teamName=teamName.split("INNINGS")[0].trim();
            console.log(teamName);

            let allTrs=oneInning.find(".table.batsman tbody tr");

            for(let j=0; j<allTrs.length-1; j++)
            {
                let allTds=myDocument(allTrs[j]).find("td");
               if(allTds.length > 1)
               {
                    let batsmanName=myDocument(allTds[0]).text().trim();
                    let runs=myDocument(allTds[2]).text().trim();
                    let balls=myDocument(allTds[3]).text().trim();
                    let fours=myDocument(allTds[5]).text().trim();
                    let sixes=myDocument(allTds[6]).text().trim();
                    let strikeRate=myDocument(allTds[7]).text().trim();
                    
                    processDetails(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
                }    


            }

        }
        console.log("****###################################################****");

    }

   
    function checkTeamFolder(teamName)
    {
        let teamfolderPath=`./IPL/${teamName}`;  
        return fs.existsSync(teamfolderPath); 
    }

    function checkBatsmanFolder(teamName , batsmanName)
    {
        let batsmanFolderPath =`./IPL/${teamName}/${batsmanName}.json`;
        return fs.existsSync(batsmanFolderPath);
    }

    function updateBatsmanFile(teamName, batsmanName,runs,balls,fours,sixes,strikeRate)
    {
        let batsmanFilePath=`./IPL/${teamName}/${batsmanName}.json`;
        let batsmanFile=JSON.parse(fs.readFileSync(batsmanFilePath));
        let Inning={
            Runs : runs,
            Balls : balls,
            Fours : fours,
            Sixes : sixes,
            StrikeRate : strikeRate
        }
        batsmanFile.push(Inning);
        fs.writeFileSync(batsmanFilePath ,JSON.stringify(batsmanFile));
    }

    function createBatsmanFolder(teamName ,batsmanName,runs,balls,fours,sixes,strikeRate)
    {
        let batsmanFilepath=`./IPL/${teamName}/${batsmanName}.json`;
        let batsmanFile=[];
       let Innings={
            Runs : runs,
            Balls : balls,
            Fours : fours,
            Sixes : sixes,
            StrikeRate : strikeRate
        }
        batsmanFile.push(Innings);
        fs.writeFileSync(batsmanFilepath ,JSON.stringify(batsmanFile));
    }
   
    function createTeamFolder(teamName)
    {
        let teamFolderpath=`./IPL/${teamName}`;
        fs.mkdirSync(teamFolderpath);
    }

    function processDetails(teamName , batsmanName , runs , balls , fours , sixes , strikeRate)
    {   
        let isTeamFolder=checkTeamFolder(teamName);
        if(isTeamFolder)
        {
            let isBatsmanFolder=checkBatsmanFolder(teamName ,batsmanName);
            if(isBatsmanFolder)
            {
                updateBatsmanFile(teamName, batsmanName,runs,balls,fours,sixes,strikeRate);
            }
            else
            {
                createBatsmanFolder(teamName ,batsmanName,runs,balls,fours,sixes,strikeRate);
            }
        }
        else
        {
            createTeamFolder(teamName);
            createBatsmanFolder(teamName ,batsmanName,runs,balls,fours,sixes,strikeRate);
           
        }

    }

            module.exports=getMatchDetails;