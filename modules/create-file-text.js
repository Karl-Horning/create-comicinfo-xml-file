const createComicObject = require("./fetch-comic-info");
const { encodeForXml } = require("./helper-functions");

async function createFileText(comicId) {
    const comicInfo = await createComicObject(comicId);

    encodeForXml(comicInfo);

    if (comicInfo) {
        const xmlInfo = `<?xml version="1.0"?>
    <ComicInfo xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
        <Title>${comicInfo.title}</Title>
        <Summary>${comicInfo.summary.replace(/&/g, "&amp;")}</Summary>
        <Number>${comicInfo.number}</Number>
        <Web>${comicInfo.web}</Web>
        <!-- Series metadata -->
        <Series>${comicInfo.series}</Series>
        <Volume>${comicInfo.volume}</Volume>
        <AgeRating>Rated T</AgeRating>
        <Publisher>${comicInfo.publisher}</Publisher>
        <Genre>${comicInfo.genre}</Genre>
        <LanguageISO>${comicInfo.languageISO}</LanguageISO>
        <Count>${comicInfo.count}</Count>
        <!-- Collections -->
        <SeriesGroup></SeriesGroup>
        <!-- Read lists -->
        <AlternateSeries></AlternateSeries>
        <StoryArc></StoryArc>
        <AlternateNumber></AlternateNumber>
        <!-- Release Date -->
        <Year>${comicInfo.year}</Year>
        <Month>${comicInfo.month}</Month>
        <Day>${comicInfo.day}</Day>
        <!-- Authors -->
        <Writer>${comicInfo.writer}</Writer>
        <Penciler>${comicInfo.penciler}</Penciler>
        <Inker>${comicInfo.inker}</Inker>
        <Colorist>${comicInfo.colorist}</Colorist>
        <Letterer>${comicInfo.letterer}</Letterer>
        <CoverArtist>${comicInfo.coverArtist}</CoverArtist>
        <Editor>${comicInfo.editor}</Editor>
    </ComicInfo>`;

        return xmlInfo;
    }
}

module.exports = createFileText;
