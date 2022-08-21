const prompt = require("prompt-sync")({ sigint: true });
const comicId = prompt("Enter the comic ID: ");
const createXmlFile = require('./modules/create-xml-file');

createXmlFile(comicId);
