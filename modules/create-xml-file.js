const createFileText = require("./create-file-text");
const fs = require("fs");
const fileName = "./output/ComicInfo.xml";

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
