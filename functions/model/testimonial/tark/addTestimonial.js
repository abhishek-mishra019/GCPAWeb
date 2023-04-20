/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
const { addNewTestimonial } = require("../lib");
const { getRawData } = require("../../raw-data/lib");
const { updateData } = require("../../raw-data/tark/updateRawData");


exports.addTestimonial = function(request, response) {
    const testimonialdata = request.body.data;
    const testimonial = testimonialdata.testimonial;
    const imageUrl = testimonialdata.imageUrl;
    const name = testimonialdata.name;
    const achievement = testimonialdata.achievement;

    let status = 200;

    getRawData().then((doc) => {
        const uid = "T" + (doc[0].NumberOfTestimonials + 1);
        addNewTestimonial(uid, name, testimonial, imageUrl, achievement).then(() => {
            const result = { data: "Testimonial Addded Successfully" };
            console.log("Testimonial Addded Successfully");

            updateData("testimonial").then(() => console.log("Testimonial Raw Data Updated"));
            return response.status(status).send(result);
        }).catch((error) => {
           status=500;
            const result = { data: error };
            console.error("Error adding Testimonial", error);
            return response.status(status).send(result);
        });
    });
};