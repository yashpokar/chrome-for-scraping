const puppeteer = require('puppeteer');
const app = require('express')();

let browser = null;
let page = null;

const launchBrowser = async () => {
    if (! browser) {
        browser = await puppeteer.launch({ headless: false });
    }

    if (! page) {
        page = await browser.newPage();
    }

    return page;
};

const getContent = async (url) => {
    const page = await launchBrowser();
    await page.goto(url);
    await page.setCacheEnabled(false);

    return await page.content();
};


app.get('/', async (req, res) => {
    const url = req.query.url;

    if (! url) {
        res.send('You need to provide url to fetch.');
    }

    const response = await getContent(url);

    res.send(response);
});

app.listen(3000);
