/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
const { addNewPhoto } = require("../lib");
const { getRawData } = require("../../raw-data/lib");
const { updateData } = require("../../raw-data/tark/updateRawData");


exports.addPhoto = function(request, response) {
    const photo = request.body.data;
    const imageUrl = photo.imageUrl;
    const date = photo.date;

    let status = 200;

    getRawData().then((doc) => {
        const uid = "G" + (doc[0].NumberOfGalleryPics + 1);
        addNewPhoto(uid, date, imageUrl).then(() => {
            const result = { data: "Photo Addded Successfully" };
            console.log("Photo Addded Successfully");
            updateData("gallery").then(() => console.log("Photo Raw Data Updated"));
            return response.status(status).send(result);
        }).catch((error) => {
            status=500;
            const result = { data: error };
            console.error("Error adding Photo", error);
            return response.status(status).send(result);
        });
    });
};