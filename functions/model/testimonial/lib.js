/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
const { db } = require("../application/lib");

exports.addNewTestimonial = function(uid, name, testimonial, imageurl, achievement) {
    const testimonialData = db.collection("Testimonials").doc(uid).set({
        Uid: uid,
        Name: name,
        Testimonial: testimonial,
        ImageUrl: imageurl,
        Achievement: achievement,
        Status: "Ok",

    });
    return Promise.resolve(testimonialData);
};


exports.getAllTestimonials = function() {
    let query = db.collection("Testimonials");
    query = query.where("Status", "==", "Ok");

    const promise = query.get().then((doc) => {
        const data = [];
        doc.forEach((element) => {
            if (element.exists) {
                data.push(element.data());
            }
        });
        return data;
    });

    return Promise.resolve(promise);
};

exports.editTestimonial = function(uid, achievement, imageUrl, name, testimonial) {
    const query = db.collection("Testimonials").doc(uid).update({
        Achievement: achievement,
        ImageUrl: imageUrl,
        Name: name,
        Status: "Ok",
        Testimonial: testimonial,
});
    return Promise.resolve(query);
};

exports.deleteTestimonial = function(uid) {
    const query = db.collection("Testimonials").doc(uid).delete();

    return Promise.resolve(query);
};