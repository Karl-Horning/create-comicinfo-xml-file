/**
 * Searches the date array for the published date.
 * @param {Array<object>} dateArr - An array of date objects.
 * @returns {string} The published date.
 */
const getPublishedDate = (dateArr) => {
    let pubDate = "";

    // Check if dateArr is an array
    if (!Array.isArray(dateArr)) {
        console.error("Invalid input: dateArr must be an array.");
        return pubDate;
    }

    // Iterate through the date array to find the published date
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

/**
 * Gets the creators from the objects inside the creator array.
 * @param {Array<object>} creatorArr - An array of creator objects.
 * @returns {object} An object containing information about creators.
 */
const getCreators = (creatorArr) => {
    let creators = {
        colorist: "",
        coverArtist: "",
        editor: "",
        inker: "",
        letterer: "",
        penciler: "",
        writer: "",
    };

    // Check if creatorArr is an array
    if (!Array.isArray(creatorArr)) {
        console.error("Invalid input: creatorArr must be an array.");
        return creators;
    }

    // Iterate through the creator array to extract information about creators
    creatorArr.items.forEach((creator) => {
        switch (true) {
            case creator.role === "colorist":
            case creators.colorist === "" &&
                creator.role === "colorist (cover)":
                creators.colorist = creator.name;
                break;
            case creator.role === "cover artist":
                creators.coverArtist = creator.name;
                break;
            case creator.role === "editor":
                creators.editor = creator.name;
                break;
            case creator.role === "inker":
            case creators.inker === "" && creator.role === "inker (cover)":
                creators.inker = creator.name;
                break;
            case creator.role === "letterer":
                creators.letterer = creator.name;
                break;
            case creator.role === "penciler":
            case creators.penciler === "" &&
                creator.role === "penciler (cover)":
            case creator.role === "penciller":
            case creators.penciler === "" &&
                creator.role === "penciller (cover)":
                creators.penciler = creator.name;
                break;
            case creator.role === "writer":
                creators.writer = creator.name;
                break;
            default:
                break;
        }
    });

    return creators;
};

/**
 * Encodes XML text to ensure it is properly formatted for XML documents.
 * @param {object} xmlText - The XML text to encode.
 */
const encodeForXml = (xmlText) => {
    for (const key in xmlText) {
        if (xmlText[key]) {
            const newVal = xmlText[key].toString().replace(/&/g, "&amp;");
            xmlText[key] = newVal;
        }
    }
};

module.exports = { getDateMetadata, getCreators, encodeForXml };
