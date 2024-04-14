const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

/**
 * Scrapes the HTML content of a web page.
 * @param {string} url - The URL of the web page to scrape.
 * @returns {Promise<string>} A promise that resolves with the HTML content of the web page.
 */
const scrapePage = async (url) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        const html = await page.content();
        await browser.close();
        return html;
    } catch (error) {
        console.error("Error while scraping page:", error);
        throw error;
    }
};

/**
 * Extracts information from HTML using a specified CSS selector.
 * @param {string} html - The HTML content to extract information from.
 * @param {string} selector - The CSS selector to use for extracting information.
 * @returns {string} The extracted information.
 */
const extractInfoFromHtml = (html, selector) => {
    try {
        const $ = cheerio.load(html);
        return $(selector).text().trim();
    } catch (error) {
        console.error(
            `Error while extracting info from HTML using selector '${selector}':`,
            error
        );
        return "";
    }
};

/**
 * Extracts the cover artist information from HTML.
 * @param {string} html - The HTML content to extract cover artist information from.
 * @returns {string} The cover artist information.
 */
const getCoverArtist = (html) => {
    return (
        extractInfoFromHtml(html, ".creatorList > li:last > div:last > a") || ""
    );
};

/**
 * Extracts the comic summary from HTML.
 * @param {string} html - The HTML content to extract the comic summary from.
 * @returns {string} The comic summary.
 */
const getComicSummary = (html) => {
    return extractInfoFromHtml(html, ".featured-item-desc") || "";
};

/**
 * Adds scraped comic information to a comic object.
 * @param {string} url - The URL of the comic page to scrape.
 * @returns {Promise<object>} A promise that resolves with the updated comic object containing scraped information.
 */
const getScrapedComicInfo = async (url) => {
    const scrapedComicInfo = {
        summary: "",
        coverArtist: "",
    };

    try {
        const html = await scrapePage(url);
        scrapedComicInfo.summary = getComicSummary(html);
        scrapedComicInfo.coverArtist = getCoverArtist(html);
    } catch (error) {
        console.error("Error while adding scraped comic info:", error);
    }

    return scrapedComicInfo;
};

module.exports = { getScrapedComicInfo };
