const { getComicInfo } = require("./src/modules/fetchMarvelApiData.module");

const init = async () => {
    const comic = await getComicInfo("98721");
    console.log(comic);
};

init();
