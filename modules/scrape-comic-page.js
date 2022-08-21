const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

async function scrapePage(url) {
    try {
        // Use Puppeteer to get the HTML
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        const html = await page.content();
        await browser.close();
        return html;
    } catch (error) {
        console.warn(error);
    }
}

function getComicSummary(html) {
    // Load the HTML in Cheerio
    const $ = cheerio.load(html);

    // User Cheerio to sift through the HTML for the summary and return it
    const summarySection = $(".featured-item-desc");
    // The summary section is repeated, so return only the first section
    const doubleSummaryText = summarySection.text().toString().trim();
    const summaryTextArr = doubleSummaryText.split("\n");
    const summaryText = summaryTextArr[0].trim();

    return summaryText;
}

function getCoverArtist(html) {
    // Load the HTML in Cheerio
    const $ = cheerio.load(html);

    // Use the classes and children tags to get cover artist
    const creatorList = $(".creatorList > li:last > div:last > a").html();
    // Replace the whitespace with a single space
    const coverArtist = creatorList.replaceAll(/\s+/g, " ");

    return coverArtist;
}

async function addScrapedComicInfo(comicObj) {
    // Use the URL to scrape the comic page
    const url = comicObj.web;
    // Return object
    const scrapedComicInfo = {
        summary: "",
        coverArtist: "",
    };

    // Scrape the webpage
    const html = await scrapePage(url);

    if (html) {
        scrapedComicInfo.coverArtist = getCoverArtist(html);
        scrapedComicInfo.summary = getComicSummary(html);
    }

    return scrapedComicInfo;
}

module.exports = addScrapedComicInfo;
