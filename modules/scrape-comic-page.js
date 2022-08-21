const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

async function scrapePage(comicObj) {
    // Use the URL to scrape the comic page
    const url = comicObj.web;
    const scrapedComicInfo = {
        summary: "",
        coverArtist: "",
    };

    // Use Puppeteer to get the HTML
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const html = await page.content();
    await browser.close();

    // Load the HTML in Cheerio
    const $ = cheerio.load(html);

    // User Cheerio to sift through the HTML for the summary
    const summarySection = $(".featured-item-desc");
    const doubleSummaryText = summarySection.text().toString().trim();
    const summaryTextArr = doubleSummaryText.split("\n");

    // Use the classes and children tags to get cover artist
    const creatorList = $(".creatorList > li:last > div:last a").html();
    // Replace the whitespace with a single space
    const coverArtist = creatorList.replaceAll(/\s+/g, " ");
    // Assign the scraped info to the return object
    scrapedComicInfo.coverArtist = coverArtist;
    scrapedComicInfo.summary = summaryTextArr[0].trim();

    return scrapedComicInfo;
}

module.exports = scrapePage;
