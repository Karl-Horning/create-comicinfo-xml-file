const getDateMetadata = require("./date.helper");
const getCreators = require("./metadata.helper");
const encodeForXml = require("./xml.helper");
const isValidComicId = require("./comic.helper");

module.exports = { encodeForXml, getDateMetadata, getCreators, isValidComicId };
