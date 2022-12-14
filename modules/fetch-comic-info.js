require("dotenv").config();
// Modules
const axios = require("axios");
const cryptoJs = require("crypto-js");
const { getDateMetadata, getCreators } = require("./helper-functions");
const addScrapedComicInfo = require("./scrape-comic-page");

// Base URL
const marvelApiUrl = "https://gateway.marvel.com:443/v1/public/";

// ENV
const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PUBLIC_KEY = process.env.PUBLIC_KEY;

// Get comic info from Marvel API
async function getComicInfo(comicId) {
    // API GET requirements
    const ts = Number(new Date());
    const hash = cryptoJs.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
    const url = `${marvelApiUrl}comics/${comicId}?apikey=${API_KEY}&ts=${ts}&hash=${hash}`;

    try {
        const response = await axios.get(url);

        if (response.data.data.total > 0) {
            const results = response.data.data.results;
            return results[0];
        } else {
            console.warn(`No results for ${comicId}`);
        }
    } catch (error) {
        console.error(`${error.response.data.code}: ${error.response.data.status} (${comicId})`);
    }
}

// Create the comic object used to populate the XML file
async function createComicObject(comicId) {
    const comicInfo = await getComicInfo(comicId);

    if (comicInfo) {
        const comicInfoUrl = comicInfo.urls[0].url.split("?");
        const comicDate = getDateMetadata(comicInfo.dates);
        const creators = getCreators(comicInfo.creators);

        const comicObj = {
            id: comicInfo.id,
            title: comicInfo.title,
            summary: comicInfo.description || "",
            number: comicInfo.issueNumber,
            web: comicInfoUrl[0],
            series: comicInfo.series.name,
            volume: comicDate.year,
            ageRating: "",
            publisher: "Marvel",
            genre: "Comics",
            languageISO: "en",
            count: comicInfo.pageCount,
            seriesGroup: comicInfo.series.name,
            year: comicDate.year,
            month: comicDate.month,
            day: comicDate.day,
            writer: creators.writer,
            penciler: creators.penciler,
            inker: creators.inker,
            colorist: creators.colorist,
            letterer: creators.letterer,
            coverArtist: "",
            editor: creators.editor,
        };

        if (!comicObj.summary || comicObj.coverArtist) {
            const scrapedComicInfo = await addScrapedComicInfo(comicObj);
            comicObj.summary = scrapedComicInfo.summary;
            comicObj.coverArtist = scrapedComicInfo.coverArtist;
        }

        return comicObj;
    }
}

module.exports = createComicObject;
