const createFileText = require("./create-file-text");
const fs = require("fs");
const os = require("os");
const userHomeDir = os.homedir();
const fileName = `${userHomeDir}/Downloads/ComicInfo.xml`;

async function createXmlFile(comicId) {
    const fileText = await createFileText(comicId);

    if (fileText) {
        const successMessage = `The XML file for ${comicId} has been created successfully!`;

        fs.writeFile(fileName, fileText, (err) => {
            if (err) throw err;
            console.log(successMessage);
        });
    }
}

module.exports = createXmlFile;
