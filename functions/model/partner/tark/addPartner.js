/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
const { addNewPartner } = require("../lib");
const { getRawData } = require("../../raw-data/lib");
const { updateData } = require("../../raw-data/tark/updateRawData");


exports.addPartner = function(request, response) {
    const partner = request.body.data;
    const type = partner.type;
    const imageUrl = partner.imageUrl;
    const name = partner.name;
    let status = 200;

    getRawData().then((doc) => {
        const uid = "P" + (doc[0].NumberOfPartners + 1);
        addNewPartner(uid, name, type, imageUrl).then(() => {
            const result = { data: "Partner Addded Successfully" };
            console.log("Partner Addded Successfully");

            updateData("partner").then(() => console.log("Partner Raw Data Updated"));
            return response.status(status).send(result);
        }).catch((error) => {
            status=500;
            const result = { data: error };
            console.error("Error adding partner", error);
            return response.status(status).send(result);
        });
    });
};