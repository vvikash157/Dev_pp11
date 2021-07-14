
    let nseLink="https://www.moneycontrol.com/";

    // const cheerio=require("cheerio");
    // const request=require("request");
    const puppeteer=require("puppeteer");
    async function goToMoneyControl(e) {
        let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"]
    })
    let pages=await browser.pages();
    let tab=await pages[0];
        await tab.goto(nseLink);
        tab.waitForTimeout(7000);
        await tab.waitForSelector('.menu_l1.sub_nav',{visible:true});
        await (await tab.$('.menu_l1.sub_nav')).click();
        await tab.waitForSelector('ul>li.menu_l2',{visible:true});
        let indIndicies = await tab.$$('ul>li.menu_l2');
        let IndIndc=await indIndicies[1];
        await tab.click(IndIndc);

};
goToMoneyControl();

    // request(nseLink, function(error,response, data){
    //     processData(data);
    // })

    // function processData(data)
    // {
    //     let Document=cheerio.load(data);
    //     let marketdata=Document(".menu_l1.sub_nav");
    //     console.log(marketdata[0]);
    // }