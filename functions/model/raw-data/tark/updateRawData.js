/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
const { updateRawData, getRawData } = require("../lib");


exports.updateData = function(updateType) {
    let status = 200;
    let result;
    const promise = getRawData().then((doc) => {
        if (doc == undefined) {
            result = { data: { status: "Raw data doesn't exist" } };
            console.log(status, " || ", result);
        } else {
            if (updateType == "user") {
                const numberOfUsers = doc[0].NumberOfUsers + 1;
                const inputJson = {
                    NumberOfUsers: numberOfUsers,
                };
                updateRawData(inputJson);
            } else if (updateType == "registration") {
                const numberOfRegistrations = doc[0].NumberOfRegistrations + 1;
                const inputJson = {
                    NumberOfRegistrations: numberOfRegistrations,
                };
                updateRawData(inputJson);
            } else if (updateType == "gallery") {
                const numberOfGalleryPics = doc[0].NumberOfGalleryPics + 1;
                const inputJson = {
                    NumberOfGalleryPics: numberOfGalleryPics,
                };
                updateRawData(inputJson);
            } else if (updateType == "newsroom") {
                const numberOfNews = doc[0].NumberOfNews + 1;
                const inputJson = {
                    NumberOfNews: numberOfNews,
                };
                updateRawData(inputJson);
            } else if (updateType == "partner") {
                const numberOfPartners = doc[0].NumberOfPartners + 1;
                const inputJson = {
                    NumberOfPartners: numberOfPartners,
                };
                updateRawData(inputJson);
            } else if (updateType == "testimonial") {
                const numberOfTestimonials = doc[0].NumberOfTestimonials + 1;
                const inputJson = {
                    NumberOfTestimonials: numberOfTestimonials,
                };
                updateRawData(inputJson);
            } else if (updateType == "support") {
                const numberOfSupport = doc[0].NumberOfSupport + 1;
                const inputJson = {
                    NumberOfSupport: numberOfSupport,
                };
                updateRawData(inputJson);
            } else if (updateType == "product") {
                const numberOfProducts = doc[0].NumberOfProducts + 1;
                const inputJson = {
                    NumberOfProducts: numberOfProducts,
                };
                updateRawData(inputJson);
            } else if (updateType == "order") {
                const numberOfOrders = doc[0].NumberOfOrders + 1;
                const inputJson = {
                    NumberOfOrders: numberOfOrders,
                };
                updateRawData(inputJson);
            } else {
                status = 500;
                console.error("updateType not specified");
            }
        }
    });

    return Promise.resolve(promise);
};