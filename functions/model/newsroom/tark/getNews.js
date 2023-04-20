/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const { getAllNews } = require("../lib");

exports.getNews = function(request, response) {
    let status = 200;

    getAllNews().then((newsData) => {
        if (newsData) {
            const result = { data: { status: "OK", data: newsData } };
            return response.status(status).send(result);
        }
    }).catch((err) => {
        status = 500;
        console.error(err);
        return response.status(status).send(err);
    });
};