const { getComicApiInfo } = require("./src/modules/fetchMarvelApiData.module");
const { getScrapedComicInfo } = require("./src/modules/scrapeComicData.module");
const { createComicObject } = require("./src/modules/createComicObject.module");
const { createXmlFile } = require("./src/modules/createComicXmlFile.module");

const init = async (comicId) => {
    // Get the comic from the API by its ID
    const comicApiInfo = await getComicApiInfo(comicId);

    if (comicApiInfo) {
        // Log the comic info for testing
        console.log("comicApiInfo:", comicApiInfo);

        // Get the URL of the page for the comic (where the additional info can be scraped from)
        const comicInfoUrl = comicApiInfo.urls[0].url.split("?")[0];
        const scrapedComicInfo = await getScrapedComicInfo(comicInfoUrl);

        // Log the scraped comic info for testing
        console.log("scrapedComicInfo:", scrapedComicInfo);

        // Create the comic object with the API data, scraped data, and URL of the page for the comic
        const comicObject = createComicObject(
            comicApiInfo,
            scrapedComicInfo,
            comicInfoUrl
        );

        // Log the created comic object for testing
        console.log("comicObject:", comicObject);

        // Create the XML file
        createXmlFile(comicObject);
    }
};

init("98721");
