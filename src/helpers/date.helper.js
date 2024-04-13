/**
 * Searches the date array for the published date.
 * @param {Array<object>} dateArr - An array of date objects.
 * @returns {string} The published date.
 */
const getPublishedDate = (dateArr) => {
    let pubDate = "";

    dateArr.forEach((d) => {
        if (d.type === "focDate") {
            pubDate = d.date;
        }
    });

    return pubDate;
};

/**
 * Splits the date timestamp so that it can be used in the XML file.
 * @param {Array<object>} dateArr - An array of date objects.
 * @returns {object} An object containing year, month, and day.
 */
const getDateMetadata = (dateArr) => {
    const publishedDateTs = getPublishedDate(dateArr);
    const pubDateArr = publishedDateTs.toString().split("-");
    const pubDateDay = pubDateArr[2].split("T");

    const retDate = {
        year: pubDateArr[0],
        month: pubDateArr[1],
        day: pubDateDay[0],
    };

    return retDate;
};

module.exports = getDateMetadata;
