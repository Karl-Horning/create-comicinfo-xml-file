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
}

module.exports = encodeForXml;
