require("dotenv").config();
// Modules
const axios = require("axios");
const cryptoJs = require("crypto-js");
// URL
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
        console.error(error);
    }
}

// Create the comic object used to populate the XML file
async function createComicObject(comicId) {
    const comicInfo = await getComicInfo(comicId);
    const comicInfoUrl = comicInfo.urls[0].url.split("?");

    const comicObj = {
        title: comicInfo.title,
        summary: comicInfo.description || "",
        number: comicInfo.issueNumber,
        web: comicInfoUrl[0],
        series: comicInfo.series.name,
        volume: "",
        ageRating: "",
        publisher: "Marvel",
        genre: "Comics",
        languageISO: "en",
        count: comicInfo.pageCount,
        seriesGroup: comicInfo.series.name,
        year: "",
        month: "",
        day: "",
        writer: "",
        penciler: "",
        inker: "",
        colorist: "",
        letterer: "",
        coverArtist: "",
        editor: "",
    };

    return comicObj;
}

module.exports = createComicObject;
