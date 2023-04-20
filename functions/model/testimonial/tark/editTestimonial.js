/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const { editTestimonial } = require("../lib");

exports.editTestimonial = function(request, response) {
    const uid = request.body.data.Uid;
    const achievement = request.body.data.Achievement;
    const imageUrl = request.body.data.ImageUrl;
    const name = request.body.data.Name;
    const testimonial = request.body.data.Testimonial;

    let result;
    editTestimonial(uid, achievement, imageUrl, name, testimonial).then(() => {
        result = { data: "Testimonial Updated successfully" };
        return response.status(200).send(result);
    }).catch((error) => {
        result = { data: error };
        console.error("Error", error);
        return response.status(500).send(result);
    });
};