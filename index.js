const { getComicInfo } = require("./src/modules/fetchMarvelApiData.module");
const { getScrapedComicInfo } = require("./src/modules/scrapeComicData.module");
const { createComicObject } = require("./src/modules/createComicObject.module");

const init = async () => {
    // Get the comic from the API by its ID
    const comicInfo = await getComicInfo("98721");

    if (comicInfo) {
        // Log the comic info for testing
        console.log("comicInfo:", comicInfo);

        // Get the URL of the page for the comic (where the additional info can be scraped from)
        const comicInfoUrl = comicInfo.urls[0].url.split("?")[0];
        const scrapedComicInfo = await getScrapedComicInfo(comicInfoUrl);

        // Log the scraped comic info for testing
        console.log("scrapedComicInfo:", scrapedComicInfo);

        // Create the comic object with the API data, scraped data, and URL of the page for the comic
        const comicObject = createComicObject(
            comicInfo,
            scrapedComicInfo,
            comicInfoUrl
        );

        // Log the created comic object for testing
        console.log("comicObject:", comicObject);
    }
};

init();
