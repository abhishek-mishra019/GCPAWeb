/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const admin = require("firebase-admin");
if (admin.apps.length === 0) {
    admin.initializeApp();
}


const { users } = require("./model/user/user.js");
const { registrations } = require("./model/applicant-register/register");
const { readData } = require("./model/read-user-data/read-user-data");
const { rawDatas } = require("./model/raw-data/raw-data");
const { support } = require("./model/support/support");
const { partners } = require("./model/partner/partners");
const { testimonials } = require("./model/testimonial/testimonial");
const { newsroom } = require("./model/newsroom/newsroom");
const { gallery } = require("./model/gallery/gallery");
const { payment } = require("./model/payment/payment");
const { ecommerce } = require("./model/ecommerce/products");
const { onCreateRegistration } = require("./model/scheduler/scheduler");

exports.users = users;
exports.registrations = registrations;
exports.readData = readData;
exports.rawDatas = rawDatas;
exports.payment = payment;
exports.support = support;
exports.partners = partners;
exports.testimonials = testimonials;
exports.newsroom = newsroom;
exports.gallery = gallery;
exports.ecommerce = ecommerce;
exports.onCreateRegistration = onCreateRegistration;