    
    let matchLink ="https://www.espncricinfo.com/series/ipl-2021-1249214/rajasthan-royals-vs-sunrisers-hyderabad-28th-match-1254085/full-scorecard";
    
    const request=require("request");
    const cheerio=require("cheerio");
    const fs=require("fs");
    request(matchLink ,fn);
    function fn(error ,response ,data)
    {
        getHighestSixes(data);
    }

function getHighestSixes(data)
{

    let highestSixHitterName;
    let NoOfSixes;
    let strikeRate;
    let myDocuments=cheerio.load(data);
    let BothBattingTable=myDocuments(".table.batsman");
    for(let i=0;i<BothBattingTable.length;i++)
    {
        let Allbatsman=myDocuments(BothBattingTable[i]);
        let allTrs=Allbatsman.find("tbody tr");
        for(let j=0;j<allTrs.length;j++)
        {   
            let allTds=myDocuments(allTrs[j]).find("td");
            if(allTds.length >1)
            {
                if(i==0 && j==0)
                {
                    highestSixHitterName=myDocuments(allTds[0]).text();
                    NoOfSixes=myDocuments(allTds[6]).text();
                    strikeRate=myDocuments(allTds[7]).text();
                }
                else
                {
                    let currentSixes=myDocuments(allTds[6]).text();
                    let currentStrikeRate=myDocuments(allTds[7]).text();
                    if((currentSixes>NoOfSixes)||(currentSixes==NoOfSixes && currentStrikeRate> strikeRate))
                    {   highestSixHitterName=myDocuments(allTds[0]).text();
                        NoOfSixes=currentSixes;
                        strikeRate=myDocuments(allTds[7]).text();
                    }

                }
            }
           
        }
    }
            console.log("batsmanName="+highestSixHitterName);
            console.log("highestNoOfSixes="+NoOfSixes);
            console.log("StrikeRate="+strikeRate);
}


