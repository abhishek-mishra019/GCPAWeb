/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const { deleteNewsById } = require("../lib");

exports.deleteNews = function(request, response) {
    const uid = request.body.data.Uid;
    let result;
    deleteNewsById(uid).then(() => {
        result = { data: "News Deleted successfully" };
        return response.status(200).send(result);
    }).catch((error) => {
        result = { data: error };
        console.error("Error", error);
        return response.status(500).send(result);
    });
};