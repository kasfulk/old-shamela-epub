import download from 'download';
import axios from './libraries/axios.js';
import * as chherio from 'cheerio';
import fs from 'fs';

const main = async (bookId) => {
    try {
        const web = await axios.get('/index.php/book/' + bookId);
        const $ = chherio.load(web.data);
        const title = $("h3.contentTitle-h3").text().split("\n")[1]
                        .replace("    ","")
                        .replace("\t","");
        const fileDownload = $("a").has("image").children().prevObject.prevObject['16'].attribs.href;
        const fileName = fileDownload.split(".")[3];
        fs.writeFileSync(`./out/${title}.${fileName}`, await download(fileDownload));
        console.log(`successfully download ${bookId} - ${title}`);
    } catch (error) {
        console.error(`failed to get ${bookId}`)
        // console.log(error);
    }
}

main(process.argv[2]);