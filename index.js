const { getComicInfo } = require("./src/modules/fetchMarvelApiData.module");
const { getScrapedComicInfo } = require("./src/modules/scrapeComicData.module");

const init = async () => {
    const comicInfo = await getComicInfo("98721");

    if (comicInfo) {
        console.log('comicInfo:', comicInfo);

        const comicInfoUrl = comicInfo.urls[0].url.split("?")[0];
        const scrapedComicInfo = await getScrapedComicInfo(comicInfoUrl);

        console.log('scrapedComicInfo:', scrapedComicInfo);
    }
};

init();
