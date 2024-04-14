// Modules
const fs = require("fs");
const os = require("os");
const { encodeForXml } = require("../helpers");

// Variables
const userHomeDir = os.homedir();
const fileName = `${userHomeDir}/Downloads/ComicInfo.xml`;

/**
 * Creates XML markup for a comic object.
 * @param {object} comicObject - The comic object containing metadata.
 * @returns {string} XML markup for the comic.
 */
const createXmlMarkup = (comicObject) => {
    encodeForXml(comicObject);

    if (!comicObject) return null;

    return `<?xml version="1.0"?>
<ComicInfo xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <Title>${comicObject.title}</Title>
    <Summary>${comicObject.summary.replace(/&/g, "&amp;")}</Summary>
    <Number>${comicObject.number}</Number>
    <Web>${comicObject.web}</Web>
    <!-- Series metadata -->
    <Series>${comicObject.series}</Series>
    <Volume>${comicObject.volume}</Volume>
    <AgeRating>Rated T</AgeRating>
    <Publisher>${comicObject.publisher}</Publisher>
    <Genre>${comicObject.genre}</Genre>
    <LanguageISO>${comicObject.languageISO}</LanguageISO>
    <Count>${comicObject.count}</Count>
    <!-- Collections -->
    <SeriesGroup></SeriesGroup>
    <!-- Read lists -->
    <AlternateSeries></AlternateSeries>
    <StoryArc></StoryArc>
    <AlternateNumber>${comicObject.id}</AlternateNumber>
    <!-- Release Date -->
    <Year>${comicObject.year}</Year>
    <Month>${comicObject.month}</Month>
    <Day>${comicObject.day}</Day>
    <!-- Authors -->
    <Writer>${comicObject.writer}</Writer>
    <Penciler>${comicObject.penciler}</Penciler>
    <Inker>${comicObject.inker}</Inker>
    <Colorist>${comicObject.colorist}</Colorist>
    <Letterer>${comicObject.letterer}</Letterer>
    <CoverArtist>${comicObject.coverArtist}</CoverArtist>
    <Editor>${comicObject.editor}</Editor>
</ComicInfo>`;
};

/**
 * Creates an XML file for the provided comic object.
 * @param {object} comicObject - The comic object containing metadata.
 */
const createXmlFile = (comicObject) => {
    if (!comicObject) {
        console.error("No comic object provided.");
        return;
    }

    const xmlMarkup = createXmlMarkup(comicObject);

    if (!xmlMarkup) {
        console.error("Failed to create XML markup.");
        return;
    }

    fs.writeFile(fileName, xmlMarkup, (err) => {
        if (err) {
            console.error("Error writing XML file:", err);
            return;
        }
        console.log(
            `The XML file for ${comicObject.id} has been created successfully!`
        );
    });
};

module.exports = { createXmlFile };
