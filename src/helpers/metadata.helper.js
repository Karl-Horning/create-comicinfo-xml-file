/**
 * Extracts creator information from an array of creator objects.
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

module.exports = getCreators;
