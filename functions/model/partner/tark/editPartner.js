/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const { editPartners } = require("../lib");

exports.editPartner = function(request, response) {
    const uid = request.body.data.Uid;
    const name = request.body.data.Name;
    const imageUrl = request.body.data.ImageUrl;
    const type = request.body.data.Type;

    let result;
    editPartners(uid, imageUrl, name, type).then(() => {
        result = { data: "Partners Updated successfully" };
        return response.status(200).send(result);
    }).catch((error) => {
        result = { data: error };
        console.error("Error", error);
        return response.status(500).send(result);
    });
};