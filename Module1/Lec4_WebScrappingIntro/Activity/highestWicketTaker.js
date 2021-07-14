 let matchLink ="https://www.espncricinfo.com/series/ipl-2021-1249214/rajasthan-royals-vs-sunrisers-hyderabad-28th-match-1254085/full-scorecard"
 const request=require("request");
const fs=require("fs");
// request(matchLink,cb);
const cheerio=require("cheerio");
const { html } = require("cheerio");
// function cb(error,response,data)
// {
//    // console.log(data);
//     fs.writeFileSync("./Match.html",data);

// }    
 let htmlKaData=fs.readFileSync("./match.html", "utf8");
  let myDocument=cheerio.load(htmlKaData);
  let bothBowlingTables=myDocument(".table.bowler");
//   console.log(bothBowlingTables)
  //fs.writeFileSync("./bowlingTable.html",matchInfo+"");
   //console.log(matchInfo);
//    console.log(htmlKaData)
   let highestWickestTaker;
   let highestWickestTaken;
   let economy;
   for(let i=0;i<bothBowlingTables.length;i++)
   {    
       let bowlingTable=myDocument(bothBowlingTables[i]);
       let allTableRow=bowlingTable.find("tbody tr");

       for(let j=0;j<allTableRow.length;j++)
       {    
           let allTds=myDocument(allTableRow[j]).find("td");
        //    console.log(myDocument(allTds[0]).find("a").text())
           if(i==0 && j==0)
           {    
               highestWickestTaker=myDocument(allTds[0]).find("a").text();
               highestWickestTaken=myDocument(allTds[4]).text();
               economy=myDocument(allTds[5]);

           }
           else
           {
               let currentWickets=myDocument(allTds[4]).text();
               let currentEconomy = myDocument(allTds[5]).text();
               
               if(currentWickets > highestWickestTaken  || (currentWickets == highestWickestTaken && currentEconomy < economy))
               {
                   highestWickestTaker== myDocument(allTds[0]).find("a").text();
                   highestWickestTaken=currentWickets;
                   economy=currentEconomy;
               }
            }
             

       }
       

   }
   console.log("Name Of Highest Wicket Taker = " + highestWickestTaker);
       console.log("Wickets Taken = " + highestWickestTaken);
       console.log("Economy = " + economy);