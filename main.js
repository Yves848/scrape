const puppeteer = require('puppeteer');


 open = async  (link) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(link);
    

}

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.zone-telechargement.video/?p=serie&id=1292-kaamelott-saison1');

    let urls = await page.evaluate(() => {
        let results = [];
        let items = document.querySelectorAll('a');
        items.forEach((item) => {
            if (item.rel == "external nofollow") {
                results.push({
                    url: item.getAttribute('href')
                });
            }
        });
        return results;
    });
    urls.forEach(link => {
         open(link.url);
    })
    console.log(urls);
    await browser.close();
})();