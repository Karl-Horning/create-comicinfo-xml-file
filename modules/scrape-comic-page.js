const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

// 95737
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

    scrapedComicInfo.summary = summaryTextArr[0].trim();

    return scrapedComicInfo;
}


// Get the Cover Artist:
// Get the length of the creator list
// const creatorListLen = document.getElementsByClassName('creatorList')[0].children.length - 1
// Get the only element (ul) with the name 'creatorList' (0)
// Using 'children', go to the last li
// Replace the unneeded text and whitespace to leave only the name
// const coverArtist = document.getElementsByClassName('creatorList')[0].children[creatorListLen].innerText.replace("Cover Artist:\n", "").trim()
// const coverArtist = document.getElementsByClassName('creatorList')[0].children[2].innerText.replace("Cover Artist:\n", "").trim()

module.exports = scrapePage;
