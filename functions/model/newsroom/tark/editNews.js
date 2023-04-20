/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const { editNewsById } = require("../lib");

exports.editNews = function(request, response) {
    const uid = request.body.data.Uid;
    const name = request.body.data.Name;
    const imageUrl = request.body.data.ImageUrl;
    const link = request.body.data.Link;

    let result;
    editNewsById(uid, imageUrl, name, link).then(() => {
        result = { data: "News Updated successfully" };
        return response.status(200).send(result);
    }).catch((error) => {
        result = { data: error };
        console.error("Error", error);
        return response.status(500).send(result);
    });
};