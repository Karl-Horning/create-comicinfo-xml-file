const createComicObject = require("./src/modules/fetch-comic-info");

// const prompt = require("prompt-sync")({ sigint: true });
// const comicId = prompt("Enter the comic ID: ");
// const createXmlFile = require('./modules/create-xml-file');

// createXmlFile(comicId);

// const { getSeriesByTitle, getComicById } = require("./src/get");

const init = async () => {
    // const series = await getSeriesByTitle("Captain Carter");
    // console.log(series);
    // const comic = await getComicById("98721");
    // console.log(comic);
    const comic = await createComicObject("98721");
    console.log(comic);
};

init();
