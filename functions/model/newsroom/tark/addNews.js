/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const { addNewNews } = require("../lib");
const { getRawData } = require("../../raw-data/lib");
const { updateData } = require("../../raw-data/tark/updateRawData");


exports.addNews = function(request, response) {
    const news = request.body.data;
    const link = news.link;
    const imageUrl = news.imageUrl;
    const name = news.name;

    let status = 200;

    getRawData().then((doc) => {
        const uid = "N" + (doc[0].NumberOfNews + 1);
        addNewNews(uid, name, link, imageUrl).then(() => {
           const result = { data: "News Addded Successfully" };
            console.log("News Addded Successfully");
            updateData("newsroom").then(() => console.log("News Raw Data Updated"));
            return response.status(status).send(result);
        }).catch((error) => {
            status=500;
           const result = { data: error };
            console.error("Error adding News", error);
            return response.status(status).send(result);
        });
    });
};