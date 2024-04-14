const readline = require("readline");
const { getComicApiInfo } = require("./src/modules/fetchMarvelApiData.module");
const { getScrapedComicInfo } = require("./src/modules/scrapeComicData.module");
const { createComicObject } = require("./src/modules/createComicObject.module");
const { createXmlFile } = require("./src/modules/createComicXmlFile.module");

/**
 * Prompts the user to enter the comic ID from the terminal.
 * @returns {Promise<string>} A promise that resolves with the entered comic ID.
 */
const getComicIdFromUser = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question("Enter the comic ID: ", (comicId) => {
            rl.close();
            resolve(comicId.trim());
        });
    });
};

/**
 * Initializes the process of fetching comic data, scraping additional info, creating a comic object, and generating an XML file.
 * @param {string} comicId - The ID of the comic to initialize the process for.
 */
const init = async (comicId) => {
    try {
        // Get the comic from the API by its ID
        console.log(`Getting comic data for ${comicId}`);
        const comicApiInfo = await getComicApiInfo(comicId);

        if (!comicApiInfo) {
            console.error(`No comic data found for ${comicId}`);
            return;
        }

        // Get the URL of the page for the comic (where the additional info can be scraped from)
        console.log(`Scraping comic data for ${comicId}`);
        const comicInfoUrl = comicApiInfo.urls[0].url.split("?")[0];
        const scrapedComicInfo = await getScrapedComicInfo(comicInfoUrl);

        // Create the comic object with the API data, scraped data, and URL of the page for the comic
        console.log(`Creating comic object for ${comicId}`);
        const comicObject = createComicObject(
            comicApiInfo,
            scrapedComicInfo,
            comicInfoUrl
        );

        // Create the XML file
        console.log(`Creating the XML file for ${comicId}`);
        createXmlFile(comicObject);
    } catch (error) {
        console.error("An error occurred:", error);
    }
};

// Entry point
(async () => {
    const comicId = await getComicIdFromUser();
    init(comicId);
})();
