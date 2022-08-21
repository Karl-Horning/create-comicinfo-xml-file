const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

// 95737
async function scrapePage(comicObj) {
    const url = comicObj.web;
    const scrapedComicInfo = {
        summary: "",
        coverArtist: "",
    };

    // Use Puppeteer to get HTML
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const html = await page.content();
    await browser.close();

    // Load HTML in Cheerio
    const $ = cheerio.load(html);

    // User Cheerio to sift through HTML for summary
    const summarySection = $(".featured-item-desc");
    const doubleSummaryText = summarySection.text().toString().trim();
    const summaryTextArr = doubleSummaryText.split("\n");
    
    scrapedComicInfo.summary = summaryTextArr[0].trim();

    return scrapedComicInfo;
}

// Use the URL to scrape the comic page
// comicObj.web
// http://marvel.com/comics/issue/95738/the_amazing_spider-man_2022_2

// Get the summary using 'data-blurb' and the comic ID:
// document.querySelector(`[data-blurb="${comicObj.id}"]`).innerText
// document.querySelector('[data-blurb="957383"]').innerText

// Get the Cover Artist:
// Get the length of the creator list
// const creatorListLen = document.getElementsByClassName('creatorList')[0].children.length - 1
// Get the only element (ul) with the name 'creatorList' (0)
// Using 'children', go to the last li
// Replace the unneeded text and whitespace to leave only the name
// const coverArtist = document.getElementsByClassName('creatorList')[0].children[creatorListLen].innerText.replace("Cover Artist:\n", "").trim()
// const coverArtist = document.getElementsByClassName('creatorList')[0].children[2].innerText.replace("Cover Artist:\n", "").trim()

module.exports = scrapePage;
