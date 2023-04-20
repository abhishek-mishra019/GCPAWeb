/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */

const { deleteTestimonial } = require("../lib");

exports.deleteTestimonial = function(request, response) {
    const uid = request.body.data.Uid;
    let result;
    deleteTestimonial(uid).then(() => {
        result = { data: "Testimonial Deleted successfully" };
        return response.status(200).send(result);
    }).catch((error) => {
        result = { data: error };
        console.error("Error", error);
        return response.status(500).send(result);
    });
};