// Searches the date array for the published date
function getPublishedDate(dateArr) {
    let pubDate = "";

    dateArr.forEach((d) => {
        if (d.type === "focDate") {
            pubDate = d.date;
        }
    });

    return pubDate;
}

// Spits the date timestamp so that it can be used in the XML file
function getDateMetadata(dateArr) {
    const publishedDateTs = getPublishedDate(dateArr);
    const pubDateArr = publishedDateTs.toString().split("-");
    const pubDateDay = pubDateArr[2].split("T");

    const retDate = {
        year: pubDateArr[0],
        month: pubDateArr[1],
        day: pubDateDay[0],
    };

    return retDate;
}

// Gets the creators from the objects inside the creator array
function getCreators(creatorArr) {
    let creators = {
        colorist: "",
        coverArtist: "",
        editor: "",
        inker: "",
        letterer: "",
        penciler: "",
        writer: "",
    };

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
}

module.exports = { getDateMetadata, getCreators };
