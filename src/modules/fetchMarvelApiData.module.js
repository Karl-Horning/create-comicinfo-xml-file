require("dotenv").config();

// Modules
const axios = require("axios");
const cryptoJs = require("crypto-js");
const { isValidComicId } = require("../helpers");

// Base URL
const marvelApiUrl = "https://gateway.marvel.com:443/v1/public/";

// ENV
const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PUBLIC_KEY = process.env.PUBLIC_KEY;

// Check if required environment variables are present and not empty
if (
    !process.env.API_KEY ||
    !process.env.PRIVATE_KEY ||
    !process.env.PUBLIC_KEY
) {
    console.error(
        "Missing required environment variables. Please make sure API_KEY, PRIVATE_KEY, and PUBLIC_KEY are set."
    );
    process.exit(1); // Exit the process with a non-zero status code to indicate failure
}

/**
 * Retrieves comic information from the Marvel API.
 * @param {number} comicId - The ID of the comic to retrieve information for.
 * @returns {Promise<object>} A promise that resolves with the comic information.
 */
const getComicInfo = async (comicId) => {
    if (!isValidComicId(comicId)) {
        console.error("Incorrect comic ID. Please make sure comic ID is set.");
        process.exit(1);
    }

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
        console.error(
            `${error.response.data.code}: ${error.response.data.status} (${comicId})`
        );
    }
};

module.exports = { getComicInfo };
